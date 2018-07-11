const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    passportJWT = require('passport-jwt'),
    JWTStrategy = passportJWT.Strategy;
    ExtractJWT = passportJWT.ExtractJwt;

const pg = require('pg');

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, cb) => {

    console.log('in local strategy', username, password);
    //insert db call

    /* MOCK DB CALL */
    let UserModel = [
        {
            id: 1,
            username: 'user',
            password: 'user'
        },
        {
            id: 2,
            username: 'admin',
            password: 'admin'
        }
    ]

    return cb(null, UserModel[UserModel.findIndex((user) => {
            return (user.username === username && user.password === password)})]);

    // return (UserModel[UserModel.findIndex((user) => {
    //     if(user.username === username && user.password === password){
    //         return cb(null, user.username === username && user.password === password);
    //     } else {
    //         return cb({err: 'user not found'})
    //     }
    //
    // })]);
    /* MOCK DB CALL - END */

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
