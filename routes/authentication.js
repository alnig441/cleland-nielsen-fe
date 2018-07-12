const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

/* LOGIN ROUTE */

router.post('/', (req, res, next) => {

    let call = 0;

    passport.authenticate('local', {session: false}, (err, user, info) => {

        call ++;

        if (err || !user) {
            return res.status(400).json({
                message: err.message,
                // message: info ? info.message : 'something went wrong',
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