const express = require('express'),
    router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    console.log('getting all accounts from db');
    res.send('respond with resource');
})

module.exports = router;