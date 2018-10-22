const express = require('express'),
    router = express.Router();
const passport = require('passport');

const   { Client } = require('pg'),
        connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

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

    console.log('images get:');

    const client = new Client({
        connectionString: connectionString
    })

    client.connect();
    return client.query('SELECT * FROM images ORDER BY created DESC')
        .then(images => {
            client.query('SELECT DISTINCT(year) FROM images ORDER BY year DESC')
                .then(years => {
                    let arr = [];
                    years.rows.forEach(current => {
                        arr[current.year] = [];
                        images.rows.forEach(image => {
                            if(image.year == current.year){
                                arr[current.year][image.month] ? arr[current.year][image.month].push(image) : arr[current.year][image.month] = [];
                            }
                        })
                    })
                    res.send(arr);
                })
        })
        .catch(err => {
            console.log('error getting ALL images', err);
        })
    client.end();
})

router.get('/latest', (req, res, next) => {
    res.send([mockImages[1]]);
})

router.get('/tabs', (req, res, next) => {
    const client = new Client({
        connectionString : connectionString
    })
    client.connect();
    return client.query('SELECT DISTINCT(year) FROM images ORDER BY year ASC')
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('error getting tab info: ', err);
        })
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