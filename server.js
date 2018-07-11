/* configuration of express server to run production environment */
const path = require('path');
const express = require('express');
const logger = require('morgan');
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const pg = require('pg');

require('./passport');

/* pull in all app routes */
const authenticate = require('./routes/authentication'),
    images = require('./routes/restricted/images');

const cron = require('node-cron');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/dist'));

/* routes setup */
app.use('/login', authenticate);
app.use('/images', passport.authenticate('jwt', {session: false}), images);

app.post('/test', (req, res, next) => {
    console.log('test route');
    res.send({message: 'test route'});
})

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, hostName, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://'+hostName+':%s/ in your browser.', port, port);
});

cron.schedule('* * * * *', () => {
    console.log('running task every minute');
});

