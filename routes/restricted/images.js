const express = require('express'),
    router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    console.log('getting all images');
    res.send('respond with a resource');
})

module.exports = router;