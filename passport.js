const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    // passportJWT = require('passport-jwt'),
    // JWTStrategy = passportJWT.Strategy;
    // ExtractJWT = passportJWT.ExtractJwt;
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const pg = require('pg');
const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';

/* MOCK USER DATA */
const UserModel = [
    {
        userId: 1,
        username: 'user',
        password: 'user',
        accounttype: 'regular'
    },
    {
        userId: 2,
        username: 'admin',
        password: 'admin',
        accounttype: 'administrator'
    }
]

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, cb) => {

    console.log('in local strategy', username, password);
    //insert db call

    /* MOCK DB CALL */

    let user = UserModel.find(user => {
        return user = user.username === username && user.password === password;
    })

    if(user) {
        return cb(null, user);
    } else{
        return cb({message: 'no user found'})
    }
    /* MOCK DB CALL - END */

    /* INSERT DB CALL HERE */
    // return UserModel.findOne({ userId, password})
    //     .then((user) => {
    //         if (!user){
    //             return cb(null, false, {message: 'incorrect credentials!'})
    //         }
    //         else {
    //             return cb(null, user, {message: 'login success!'})
    //         }
    //     })
    //     .catch(err => cb(err));
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
    }, (jwtPayload, cb) => {
    /* call db if needed */

        console.log('show me jwt_payload: ', jwtPayload);

        let user = UserModel.find(user => {
            return user = user.userId === jwtPayload.userId;
        })

        if(user) {
            return cb(null, user);
        } else{
            return cb({message: 'no user found'})
        }

        /* INSERT DB CALL HERE */
        // return UserModel.findByOneId(jwtPayload.id)
        //     .then((user) => {
        //         return cb(null, user);
        //     })
        //     .catch(err => {
        //         return cb(err);
        //     });

    }
));
