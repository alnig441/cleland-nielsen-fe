const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const jwtSecret = process.env.JWT_SECRET || 'some_secret_word';
const { Pool } = require('pg');

const connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt'),
    saltRounds = 10;


const pool = new Pool({
  connectionString: connectionString
})

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, cb) => {
  pool.connect()
    .then(client => {
      return client.query(`SELECT * FROM users as a INNER JOIN accounts as b ON a.account_type::uuid = b.account_id where a.user_name='${username}'`)
        .then(result => {
          client.release();
          let user = result.rows[0];
          if (user) {
            bcrypt.compare(password, user.password)
              .then(match => {
                if(match) {
                  return cb(null, user, { message: 'login success!' })
                }
                else {
                  return cb({ message: 'invalid password' })
                }
              })
          } else {
            return cb({ message: 'invalid username' })
          }
        })
        .catch(err => {
          client.release();
          return cb({ message: err })
        })
    })
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
  }, (jwtPayload, cb) => {
    pool.connect()
      .then(client => {
        return client.query(`SELECT * FROM users where user_id='${jwtPayload.sub}'`)
          .then(result => {
            client.release();
            let user = result.rows;
            return cb(null, user);
          })
          .catch(err => {
            client.release();
            return cb (err);
          })
      })
  }
));
