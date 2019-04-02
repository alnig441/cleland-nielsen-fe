/* configuration of express server to run production environment */
const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

require('./routes/authenticate/passport');

/* pull in all app server routes */
const authenticate = require('./routes/authenticate/authentication'),
    logout = require('./routes/logout'),
    accounts = require('./routes/restricted/accounts'),
    users = require('./routes/restricted/users'),
    permissions = require('./routes/restricted/permissions'),
    mongo_api = require('./routes/restricted/mongo_api');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/dist'));
app.use('/photos', express.static(process.env.PHOTOS_MOUNT_POINT));
//serve letsencrypt credentials
app.use(express.static(__dirname + '/letsencrypt', { dotfiles: 'allow'}));

/* routes setup */
app.use('/login', authenticate);
app.use('/logout', logout);
app.use('/accountsDb', passport.authenticate('jwt', {session: false}), accounts);
app.use('/usersDb', passport.authenticate('jwt', {session: false}),users);
app.use('/permissionsDb', passport.authenticate('jwt', {session: false}), permissions);
app.use('/api', passport.authenticate('jwt', {session: false}), mongo_api);
// app.use('/batchLoadImages', images);

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
