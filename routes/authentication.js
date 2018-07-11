const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

/* LOGIN ROUTE */

router.post('/', (req, res, next) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {

        console.log('from authenticate: ', err, user, info);

        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'something went wrong',
                user: user
            })
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                console.log('show me error: ', err);
                res.send(err);
            }
            /* generate signed web token */
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});

        });

    })(req, res);
})

module.exports = router;