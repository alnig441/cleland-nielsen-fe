const express = require('express'),
    router = express.Router();
const passport = require('passport');

const mockImages = [
    {
        id: 1,
        event_en: 'this would be the associated event, if any..',
        created: 'date the picture was taken goes here',
        meta: ['some','meta', 'here'],
        file: 'path/to/image'
    },
    {
        id: 2,
        event_en: 'this would be the associated event, if any..',
        created: 'date the picture was taken goes here',
        meta: ['some','meta', 'here'],
        file: 'path/to/image'
    }
]


router.get('/', (req, res, next) => {
    res.send(mockImages);
})

router.get('/latest', (req, res, next) => {
    res.send([mockImages[1]]);
})

module.exports = router;