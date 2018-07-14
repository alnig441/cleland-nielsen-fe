const express = require('express'),
    router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    console.log('getting all users');
    res.send('response with a resource');
})

module.exports = router;