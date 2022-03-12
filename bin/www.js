const app = require('../app');
const https = require('https');
const http = require('http');
const fs = require('fs');
const port = process.env.PORT ;
const httpsPort = process.env.HTTPS_PORT;
const hostName = process.env.NODE_ENV === 'development' ? "localhost" : "0.0.0.0" ;

if (httpsPort) {
    const credentials = {
        ca      : fs.readFileSync(process.env.CA),
        cert    : fs.readFileSync(process.env.CERT),
        key     : fs.readFileSync(process.env.KEY)
    }

    const httpsServer = https.createServer(credentials,app);
    const io = require('socket.io')(httpsServer);
    app.set('socketio', io);

    httpsServer.listen(httpsPort, hostName, function onStart(err) {
        if (err) {
            console.log('show me error - https: ', err);
        }
        console.info(`==> 🌎 Listening on port ${httpsPort}. Open up https://${hostName}:${httpsPort}/ in your browser.`);

    })

} else {
    const httpServer = http.createServer(app);
    const io = require('socket.io')(httpServer);
    app.set('socketio', io);

    httpServer.listen(port, hostName, function onStart(err)  {
        if (err) {
            console.log('show me error: ', err);
        }
        console.info(`==> 🌎 Listening on port ${port}. Open up http://${hostName}:${port}/ in your browser.`);

    })
}
