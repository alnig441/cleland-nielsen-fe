const express = require('express'),
    router = express.Router();
const passport = require('passport');

const { Client } = require('pg'),
    connectionString = process.env.MYDB;

router.get('/', (req, res, next) => {
    const client = new Client({
        connectionString: connectionString || process.env.MYDB
    })

    client.connect();

    return client.query('SELECT * FROM permissions')
        .then(result => {
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
        connectionString: connectionString || process.env.MYDB
    })

    client.connect();

    return client.query(`INSERT INTO PERMISSIONS VALUES (${req.body.permission_id}, '${req.body.permission_name}')`)
        .then(result => {
            res.status(200).send({message: `${result.command} SUCCESS`});
            client.end();
        })
        .catch(error => {
            res.status(400).send({message: error.detail});
            client.end();
        })
})

router.param('permission_id', (req, res, next, permission_id) => {
    req.permission = permission_id;
    next();
})

router.route('/:permission_id?')
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        console.log('fetching permission: ', req.permission )
    })
    .put((req, res, next) =>{
        console.log('modifying permission: ', req.permission )
    })
    .delete((req, res, next) => {
        const client = new Client({
            connectionString: connectionString || process.env.MYDB
        })

        client.connect();

        return client.query(`DELETE FROM PERMISSIONS WHERE permission_id = '${req.permission}'`)
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