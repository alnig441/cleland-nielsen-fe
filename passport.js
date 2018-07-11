const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    passportJWT = require('passport-jwt'),
    JWTStrategy = passportJWT.Strategy;
    ExtractJWT = passportJWT.ExtractJwt;

const pg = require('pg');

passport.use(new localStrategy({
    usernameField: 'userId',
    passwordField: 'password'
}, (userId, password, cb) => {

    console.log('in local strategy');
    //insert db call

    let UserModel = [
        {
            id: 1,
            userId: 'user',
            password: 'user'
        },
        {
            id: 2,
            userId: 'admin',
            password: 'admin'
        }
    ]



    return UserModel.findOne({ userId, password})
        .then((user) => {
            if (!user){
                return cb(null, false, {message: 'incorrect credentials!'})
            }
            else {
                return cb(null, user, {message: 'login success!'})
            }
        })
        .catch(err => cb(err));
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
    }, (jwtPayload, cb) => {
    /* call db if neeed */

        console.log('in JWT strategy: ');
        return UserModel.findByOneId(jwtPayload.id)
            .then((user) => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }

));
