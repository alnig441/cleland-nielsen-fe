const path = require('path');
const express = require('express');

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
