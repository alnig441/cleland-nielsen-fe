/* configuration of express server to run production environment */
const path = require('path');
const express = require('express');
const logger = require('morgan');
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const dbInit = process.env.DB_INIT ? process.evn.DB_INIT : false;

require('./routes/authenticate/passport');

if(dbInit){
    require('./dbInit');
}


/* pull in all app server routes */
const authenticate = require('./routes/authenticate/authentication'),
    logout = require('./routes/logout'),
    images = require('./routes/restricted/images'),
    accounts = require('./routes/restricted/accounts'),
    users = require('./routes/restricted/users'),
    events = require('./routes/restricted/events'),
    permissions = require('./routes/restricted/permissions');

const cron = require('node-cron');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/dist'));

/* routes setup */
app.use('/login', authenticate);
app.use('/logout', logout);
app.use('/imagesDb', passport.authenticate('jwt', {session: false}), images);
app.use('/imagesDb/latest', passport.authenticate('jwt', {session: false}), images);
app.use('/accountsDb', passport.authenticate('jwt', {session: false}), accounts);
app.use('/usersDb', passport.authenticate('jwt', {session: false}),users);
app.use('/eventsDb', passport.authenticate('jwt', {session: false}), events);
app.use('/permissionsDb', passport.authenticate('jwt', {session: false}), permissions);

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, hostName, function onStart(err) {
    if (err) {
        console.log('show me error', err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://'+hostName+':%s/ in your browser.', port, port);
});

cron.schedule('* * * * *', () => {
    console.log('running task every minute');
});

