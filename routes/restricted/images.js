const express = require('express'),
    router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    console.log('getting all images');
    // Insert db call here

    /* MOCK DATA - to be replaced with db call result */
    res.send({
        id: 1,
        caption: 'this would be the associated event, if any..',
        date: 'date the picture was taken goes here',
        meta: ['some','meta', 'here'],
        url: 'path/to/image'
    });
})

module.exports = router;