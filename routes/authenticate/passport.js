const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';
const { Client } = require('pg');
const connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt'),
    saltRounds = 10;

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, cb) => {


    const client = new Client({
        connectionString: connectionString,
    })
    client.connect();

    return client.query(`SELECT * FROM users as a INNER JOIN accounts as b ON a.account_type::uuid = b.account_id where a.user_name='${username}'`)
        .then(result => {
            // console.log('result from user query in passport: ', result.rows)
            let user = result.rows[0]
            bcrypt.compare(password, user.password)
                .then(match => {
                    if(match) {
                        return cb(null, user, {message: 'login success!'})
                    }
                    else {
                        return cb({message: 'invalid password'})
                    }
                    client.end();
                })
        })
        .catch(err => {
            return cb({message: 'user name does not exist'})
            client.end();
        })

}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
    }, (jwtPayload, cb) => {

        // console.log('in jwt strategy: ', jwtPayload)

        const client = new Client({
            connectionString: connectionString
        });

        client.connect();

        return client.query(`SELECT * FROM users where user_id='${jwtPayload.sub}'`)
            .then(result => {
                let user = result.rows;
                return cb(null, user);
                client.end();
            })
            .catch(err => {
                return cb (err);
                client.end();
            })

    }
));
