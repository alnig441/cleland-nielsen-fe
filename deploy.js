if (process.env.NODE_ENV === 'production') {
    var child_process = require('child_process');
    child_process.exec("rimraf dist && webpack --config config/webpack.prod.js --progress --profile --bail", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
