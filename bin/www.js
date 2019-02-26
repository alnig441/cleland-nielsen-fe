const app = require('../app');
const https = require('https');
const http = require('http');
const fs = require('fs');
const port = process.env.NODE_ENV === "production" ? process.env.PORT: "3000";
const httpsPort = process.env.HTTPS_PORT;
const hostName = process.env.NODE_ENV === 'production' ? "0.0.0.0": "localhost";

if (httpsPort) {
    const credentials = {
        ca      : fs.readFileSync(process.env.CA),
        cert    : fs.readFileSync(process.env.CERT),
        key     : fs.readFileSync(process.env.KEY)
    }

    const httpsServer = https.createServer(credentials,app);

    httpsServer.listen(httpsPort, hostName, function onStart(err) {
        if (err) {
            console.log('show me error - https: ', err);
        }
        console.info(`==> 🌎 Listening on port ${httpsPort}. Open up https://${hostName}:${httpsPort}/ in your browser.`);

    })

    const httpServer = http.createServer(app);

    httpServer.listen(80, hostName, function onStart(err) => {
      if (err) {
        console.log('show me error - http', err);
      }
      console.info(`==> 🌎 Listening on port ${port}. Open up http://${hostName}:${port}/ in your browser.`);

    })

} else {
    const httpServer = http.createServer(app);

    httpServer.listen(port, hostName, function onStart(err)  {
        if (err) {
            console.log('show me error: ', err);
        }
        console.info(`==> 🌎 Listening on port ${port}. Open up http://${hostName}:${port}/ in your browser.`);

    })
}
