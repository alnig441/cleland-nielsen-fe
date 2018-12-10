/* configuration of express server to run production environment */
const path = require('path');
const express = require('express');
const logger = require('morgan');
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cron = require('node-cron');

const jobHandler = require('./app_modules/jobHandler');
const photoAppJob = new jobHandler('/photoapptemp/');

require('./routes/authenticate/passport');


/* pull in all app server routes */
const authenticate = require('./routes/authenticate/authentication'),
    logout = require('./routes/logout'),
    images = require('./routes/restricted/images'),
    accounts = require('./routes/restricted/accounts'),
    users = require('./routes/restricted/users'),
    events = require('./routes/restricted/events'),
    permissions = require('./routes/restricted/permissions');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/dist'));
app.use('/photos', express.static(process.env.PHOTOS_MOUNT_POINT));

/* routes setup */
app.use('/login', authenticate);
app.use('/logout', logout);
app.use('/imagesDb', passport.authenticate('jwt', {session: false}), images);
app.use('/imagesDb/latest', passport.authenticate('jwt', {session: false}), images);
app.use('/accountsDb', passport.authenticate('jwt', {session: false}), accounts);
app.use('/usersDb', passport.authenticate('jwt', {session: false}),users);
app.use('/eventsDb', passport.authenticate('jwt', {session: false}), events);
app.use('/permissionsDb', passport.authenticate('jwt', {session: false}), permissions);
app.use('/batchLoadImages', images);


app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, hostName, function onStart(err) {
    if (err) {
        console.log('show me error', err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://'+hostName+':%s/ in your browser.', port, port);
});


cron.schedule(process.env.SCHEDULE, () => {

    console.log('cron job started at: ', new Date())

    photoAppJob.on('dto_done', listenDtoDone);
    photoAppJob.on('conversion_done', listenConversionDone);
    photoAppJob.on('db_load_done', listenDbLoadDone);
    photoAppJob.on('empty', listenEmpty);
    photoAppJob.on('error', listenError);

    photoAppJob.generateDto();

    function listenDtoDone(DTO) {
        console.log(`job generate DTO complete - DTO generated for ${DTO.length} new images`)
        if(DTO){
            photoAppJob.loadImages(DTO);
        }
    }

    function listenDbLoadDone(loadedImages) {
        console.log(`job load db complete - ${loadedImages.length} new images loaded into images table`);
        photoAppJob.convertFilesToPng();
    }

    function listenConversionDone(processedFiles) {
        console.log(`job file conversion / cron schedule completed - ${processedFiles.length} files converted and moved`);
        photoAppJob.removeAllListeners();
    }

    function listenEmpty(res) {
        console.log(`cron schedule terminated - ${res}`);
        photoAppJob.removeAllListeners();
    }

    function listenError(err) {
        console.log('cron schedule terminated - error emitted: ', err);
        photoAppJob.removeAllListeners();
    }

})

