const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';

/* LOGIN ROUTE */

router.post('/', (req, res, next) => {

    // console.log('authentication: ', req.body)

    passport.authenticate('local', {session: false}, (err, user, info) => {

        // console.log('returned from passport: ', err, user, info);

        if (err || !user) {
            return res.status(400).json({
                message: err ? err.message: 'nothing',
                // message: info ? info.message : 'something went wrong',
                user: user
            })
        }

        req.login(user, {session: false}, (err) => {

            if (err) {
                console.log('show me error: ', err);
                res.send(err);
            }

            // console.log('what user: ', user);

            let userParameters = {
                userId: user.userId,
                language: user.language ? user.language : 'english',
                administrator: user.accounttype === 'administrator' ? true : false
            }

            /* generate signed web token */
            const token = jwt.sign({
                administrator: user.accounttype === 'administrator' ? true: false,
                language: user.language ? user.language: 'english',
                userId: user.userId
            }, jwtSecret);
            return res.json({token, userParameters});

        });

    })(req, res);
})

module.exports = router;