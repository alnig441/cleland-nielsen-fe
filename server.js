/* configuration of express server to run production environment */

const path = require('path');
const express = require('express');
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const app = express();



const _ = require('lodash'),
    bodyparser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    passportJWT = require('passport-jwt'),
    extractJWT = passportJWT.ExtractJwt,
    JwtStrategy = passportJWT.Strategy;

const cron = require('node-cron');

const mockUsers = [
    {
        id: 1,
        accountType: 'admin',
        userId: 'admin',
        password: 'admin'
    },
    {
        id: 2,
        accountType: 'user',
        userId: 'user',
        password: 'user'
    }
]

const jwtOptions = {};

jwtOptions.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

const strategy = new JwtStrategy(jwtOptions,
    (jwt_payload, next) => {
        console.log('payload received ', jwt_payload);

        //replace by database call
        let user = mockUsers[_.findIndex(mockUsers, {id: jwt_payload.id})];
        if(user) {
            return next(null, user)
        } else {
            return next(null, false)
        }
    });

passport.use(strategy);

app.use(passport.initialize());

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json());

app.post('/login', (req, res) => {
    let userId,
        password;

    if(req.body.userId && req.body.password ) {
        userId = req.body.userId;
        password = req.body.password;
    }
    //replace by database call
    let user = mockUsers[_.findIndex(mockUsers, {userId: userId})]
    if( !user ) {
        res.status(401).json({message: 'invalid user'});
    }

    if( user.password === req.body.password ) {
        //pass userId to token as
        let payload = {userId: user.userId};
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: 'ok', token: token});
    }
    else {
        res.status(401).json({message: 'wrong password'});
    }
})

app.get('/test', passport.authenticate('jwt', {
    session: false}),
    (req, res) => {
        res.json('no access without token!!');
    })

app.use(express.static(__dirname + '/dist'));

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(port, hostName, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://'+hostName+':%s/ in your browser.', port, port);
});

cron.schedule('* * * * *', () => {
    console.log('running task every minute');
})