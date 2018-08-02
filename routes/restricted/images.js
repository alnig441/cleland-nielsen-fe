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

router.param('image_id', (req, res, next, image_id) => {
    req.image = image_id;
    next();
})

router.route('/:image_id?')
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        console.log('fetching image: ', req.image )
    })
    .put((req, res, next) =>{
        console.log('modifying image: ', req.image )
    })
    .delete((req, res, next) => {
        const client = new Client({
            connectionString: connectionString
        })

        client.connect();

        return client.query(`DELETE FROM IMAGES WHERE id = '${req.image}'`)
            .then((result) => {
                res.status(200).send({message: `${result.command} SUCCESS`});
                client.end();
            })
            .catch(error => {
                res.status(400).send({message: error.detail});
                client.end();
            })
    })


module.exports = router;