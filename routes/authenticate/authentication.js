const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';

/* LOGIN ROUTE */

router.post('/', (req, res, next) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {

        // console.log('returned from passport: ', user);

        if (err || !user) {
            return res.status(400).json({
                message: err ? err.message : 'no error message returned',
                user: user
            })
        }

        req.login(user, {session: false}, (err) => {

            if (err) {
                console.log('show me error: ', err);
                res.send(err);
            }

            let userParameters = {
                user: user.user_id,
                type: user.account_name,
                language: user.language,
                administrator: user.account_name === 'administrator' ? true : false,
                permissions: user.account_permissions
            }

            /* generate signed web token */
            const token = jwt.sign({
                sub: user.user_id,
                language: user.language,
                admin: user.account_name === 'administrator' ? true : false
            }, jwtSecret, { expiresIn: 3600});
            return res.json({token, userParameters});

        });

    })(req, res);

})

module.exports = router;