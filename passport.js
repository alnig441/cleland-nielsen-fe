const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    // passportJWT = require('passport-jwt'),
    // JWTStrategy = passportJWT.Strategy;
    // ExtractJWT = passportJWT.ExtractJwt;
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const pg = require('pg');


/* MOCK USER DATA */
const UserModel = [
    {
        id: 1,
        username: 'user',
        password: 'user',
        accountype: 'regular'
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin',
        accountype: 'administrator'
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
    secretOrKey: 'your_jwt_secret'
    }, (jwtPayload, cb) => {
    /* call db if needed */

        let user = UserModel.find(user => {
            return user = user.username === jwtPayload.username && user.password === jwtPayload.password;
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
