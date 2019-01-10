/* configuration of express server to run production environment */
const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cron = require('node-cron');
const fs = require('fs');

const jobHandler = require('./app_modules/jobHandler');
var photoAppJob;

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
//serve letsencrypt credentials
app.use(express.static(__dirname + '/letsencrypt', { dotfiles: 'allow'}));

/* routes setup */
app.use('/login', authenticate);
app.use('/logout', logout);
app.use('/imagesDb', passport.authenticate('jwt', {session: false}), images);
app.use('/imagesDb/latest', passport.authenticate('jwt', {session: false}), images);
app.use('/accountsDb', passport.authenticate('jwt', {session: false}), accounts);
app.use('/usersDb', passport.authenticate('jwt', {session: false}),users);
app.use('/eventsDb', passport.authenticate('jwt', {session: false}), events);
app.use('/permissionsDb', passport.authenticate('jwt', {session: false}), permissions);
// app.use('/batchLoadImages', images);

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

cron.schedule(process.env.SCHEDULE, () => {

    const logFile = '.photoapp.log';

    fs.writeFile(logFile, `LOG OPENED: ${new Date()}`, (err) => {
        return null;
    });

    photoAppJob = new jobHandler('/photoapptemp/');
    console.log('cron job started at: ', new Date())

    photoAppJob.on('dto_done', listenDtoDone);
    photoAppJob.on('conversion_done', listenConversionDone);
    photoAppJob.on('db_load_done', listenDbLoadDone);
    photoAppJob.on('empty', listenEmpty);
    photoAppJob.on('error', listenError);

    photoAppJob.generateDto();

    function listenDtoDone(DTO) {
        console.log(`job generate DTO complete - DTO generated for ${DTO.length} new images`)
        if(DTO && DTO.length > 0){
            photoAppJob.loadImages(DTO);
        } else {
            console.log(`cron schedule terminated`);
            photoAppJob.removeAllListeners();
            let logMessage = `\n${new Date()}: INFO: CRON Schedule Terminated: Empty DTO`;
            writeToLog(logMessage);
        }
    }

    function listenDbLoadDone(loadedImages) {
        console.log(`job load db complete - ${loadedImages.length} new images loaded into images table`);
        photoAppJob.convertFilesToPng();
    }

    function listenConversionDone(processedFiles) {
        console.log(`job file conversion / cron schedule completed - ${processedFiles.length} files converted and moved`);
        photoAppJob.removeAllListeners();
        let logMessage = `\n${new Date()}: SUCCESS: CRON Schedule Completed: ${processedFiles.length} files converted and moved`;
        writeToLog(logMessage);
    }

    function listenEmpty(res) {
        console.log(`cron schedule terminated - ${res}`);
        photoAppJob.removeAllListeners();
    }

    function listenError(err) {
        console.log('cron schedule terminated - error emitted: ', err);
        photoAppJob.removeAllListeners();
        let logMessage = `\n${new Date()}: ERROR: CRON Schedule Terminated: ${err.code} - ${err.detail}`;
        writeToLog(logMessage);
    }

    function writeToLog(message) {
        fs.appendFile(logFile, message, (err) => {
            return null;
        })
    }


})

module.exports = app;