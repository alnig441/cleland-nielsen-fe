const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';
const uuidv4 = require('uuid/v4')

/* LOGIN ROUTE */

router.post('/', (req, res, next) => {

    // console.log('authentication: ', req.body)

    passport.authenticate('local', {session: false}, (err, user, info) => {

        console.log('returned from passport: ', err, user, info);

        if (err || !user) {
            console.log('anything from passport? ', err);
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
                language: user.language,
                administrator: user.account_type === 'administrator' ? true : false
            }

            /* generate signed web token */
            const token = jwt.sign({
                sub: user.user_id,
                language: user.language,
                admin: user.account_type === 'administrator' ? true : false
            }, jwtSecret);
            return res.json({token, userParameters});

        });

    })(req, res);

})

module.exports = router;