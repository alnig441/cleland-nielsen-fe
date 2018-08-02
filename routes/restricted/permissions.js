const express = require('express'),
    router = express.Router();
const passport = require('passport');

const { Client } = require('pg'),
    connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

router.get('/', (req, res, next) => {
    const client = new Client({
        connectionString: connectionString
    })

    client.connect();

    return client.query('SELECT * FROM permissions')
        .then(result => {
            // console.log('fetching from permissions: ', result)
            res.send(result.rows);
            client.end();
        })
        .catch(error => {
            console.log('error from query: ', error);
            client.end();
        })
})

router.post('/', (req, res, next) => {
    const client = new Client({
        connectionString: connectionString
    })

    client.connect();

    return client.query(`INSERT INTO PERMISSIONS VALUES (${req.body.permission_id}, '${req.body.permission_name}')`)
        .then(result => {
            res.status(200).send({message: result.command + ' SUCCESS'});
            client.end();
        })
        .catch(error => {
            res.status(400).send({message: error.detail});
            client.end();
        })
})


module.exports = router;