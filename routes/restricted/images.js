const express = require('express'),
    router = express.Router();
const passport = require('passport');

const mockUsers = [
    {
        id: 1,
        caption: 'this would be the associated event, if any..',
        date: 'date the picture was taken goes here',
        meta: ['some','meta', 'here'],
        url: 'path/to/image'
    },
    {
        id: 2,
        caption: 'this would be the associated event, if any..',
        date: 'date the picture was taken goes here',
        meta: ['some','meta', 'here'],
        url: 'path/to/image'
    }
]


router.get('/', (req, res, next) => {
    console.log('getting all images');
    // Insert db call here

    /* MOCK DATA - to be replaced with db call result */
    res.send(mockUsers);
})

router.get('/latest', (req, res, next) => {
    res.send([mockUsers[1]]);
})

module.exports = router;