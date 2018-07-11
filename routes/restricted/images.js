const express = require('express'),
    router = express.Router();

router.get('/', (req, res, next) => {
    console.log('getting all images');
    res.send('respond with a resource');
})

module.exports = router;