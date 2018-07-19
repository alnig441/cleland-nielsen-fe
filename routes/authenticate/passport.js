const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';
const { Client } = require('pg');
const connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

const jwt = require('jsonwebtoken');

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, cb) => {

    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    return client.query(`SELECT * FROM users as a INNER JOIN accounts as b ON a.account_type::uuid = b.account_id where a.password ='${password}' and a.user_name='${username}'`)
        .then(result => {
            let user = result.rows[0];
            return cb(null, user, {message: 'login success'})
        })
        .catch(err => {
            console.error('error: ', err.stack);
        })

}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
    }, (jwtPayload, cb) => {

        console.log('jwtstrategy: ', JWTStrategy)

        const client = new Client({
            connectionString: connectionString
        });

        client.connect();

        return client.query(`SELECT * FROM users where user_id='${jwtPayload.sub}'`)
            .then(result => {
                let user = result.rows;
                return cb(null, user)
            })
            .catch(err => {
                return cb (err);
            })


        client.end();
    }
));
