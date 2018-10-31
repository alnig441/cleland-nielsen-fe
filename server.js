/* configuration of express server to run production environment */
const path = require('path');
const express = require('express');
const logger = require('morgan');
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const dbInit = process.env.DB_INIT ? process.env.DB_INIT : false;
const fs = require('fs');
const jimp = require('jimp');
const Exif = require('./routes/restricted/exif');
const { exec } = require('child_process');

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
app.use('/photos', express.static("/Volumes/media/Photos"));

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


// var task = cron.schedule('* * * * *', () => {
    console.log('running task every minute');
    const destUrl = '/Volumes/media/Photos/photoapp/';
    const srcUrl = 'src/images/Photos/';

    // exif.getInfo('MVIMG_20180930_135746.jpg')
    //     .then(result => {
    //         console.log('exif result: ', result);
    //         if(!result){
    //             exif.getInfo('MVIMG_20180930_135746.jpg', true)
    //                 .then(result => {
    //                     console.log('result full search: ', result);
    //                 })
    //         } else{
    //
    //         }
    //     })

var interval = setInterval(() => {

    fs.readdir(srcUrl, (err, result) => {

        if (err) {
            console.log('readdir error ', err);
            task.stop();
        }
        if (result.length > 0) {

            let splitOnSpace = result[0].split(' ');
            splitOnSpace = splitOnSpace.join('\\ ');

            let splitFile = result[0].split('.');
            splitFile.pop();
            let name = splitFile.join('.');

            jimp.read(`${srcUrl}${result[0]}`)
                .then((image) => {
                    image.resize(280, jimp.AUTO);
                    image.writeAsync(`${destUrl}${name}.png`)
                        .then(res => {
                            console.log('file write success; ', res, result[0]);

                            let file = result[0].split(' ').length > 0 ? splitOnSpace : result[0]

                            exec('rm src/images/Photos/' + file, (err, stdout, stdin) => {
                                if (!err) {
                                    console.log('file removed', file);
                                } else {
                                    console.log(stdout, stdin);
                                }
                            })
                        })
                        .catch(err => {
                            console.log('error writing to target dir; ', err);
                            // task.stop();
                        })
                })
                .catch(err => {
                    console.log('jimp error at file: ', result[0]);
                    // task.stop();
                })

        } else {
            clearInterval(interval);
            // task.stop();
        }

        console.log('files remaining: ', result.length)

    })
},10000)

// });

