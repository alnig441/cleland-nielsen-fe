const app = require('../app');
const https = require('https');
const http = require('http');
const fs = require('fs');
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";

if (process.env.LE_FOLDER) {
    const credentials = {
        ca      : fs.readFileSync(process.env.CA),
        cert    : fs.readFileSync(process.env.CERT),
        key     : fs.readFileSync(process.env.KEY)
    }

    const httpsServer = https.createServer(credentials,app);

    httpsServer.listen(443, hostName, function onStart(err) {
        if (err) {
            console.log('show me error - https: ', err);
        }
        console.info('==> 🌎 Listening on port %s. Open up https://'+hostName+':%s/ in your browser.', port, port);
    })

} else {
    const httpServer = http.createServer(app);

    httpServer.listen(port, hostName, function onStart(err)  {
        if (err) {
            console.log('show me error: ', err);
        }
        console.info('==> 🌎 Listening on port %s. Open up http://'+hostName+':%s/ in your browser.', port, port);
    })
}





