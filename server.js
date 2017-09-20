/* configuration of express server to run production environment */

const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

// const isDeveloping = process.env.NODE_ENV !== 'production';

// const config = isDeveloping ? require('./config/webpack.dev.js'): require('./config/webpack.prod.js');

// const hostName = isDeveloping ? "localhost" : "0.0.0.0";
// const port = isDeveloping ? 3000 : process.env.PORT;
// const app = express();

// if (isDeveloping) {
//     console.log('running express dev mode');
//     const compiler = webpack(config);
//     const middleware = webpackMiddleware(compiler, {
//         publicPath: config.output.publicPath,
//         contentBase: 'src',
//         stats: {
//             colors: true,
//             hash: false,
//             timings: true,
//             chunks: false,
//             chunkModules: false,
//             modules: false
//         }
//     });
//
//     app.use(middleware);
//     app.use(webpackHotMiddleware(compiler));
//     app.get('*', function response(req, res) {
//         res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//         res.end();
//     });
// } else {
//     console.log('running prod mode (express)');
//     app.use(express.static(__dirname + '/dist'));
//     app.get('*', function response(req, res) {
//         res.sendFile(path.join(__dirname, 'dist/index.html'));
//     });
// }

app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
    res.sendFile(path, join(__dirname, 'dist/index.html'));
})

app.listen(port, hostName, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://'+hostName+':%s/ in your browser.', port, port);
});
