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

    return client.query('SELECT * FROM accounts')
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
        connectionString: connectionString
    })

    client.connect();

    return client.query(`INSERT INTO accounts VALUES(${req.body.account_id}, '${req.body.account_name}')`)
        .then((result) => {
            res.status(200).send({message: `${result.command} SUCCESS`});
            client.end();
        })
        .catch(error => {
            res.status(400).send({message: error.detail});
            client.end();
        })})

router.param('account_id', (req, res, next, account_id) => {
    req.account = account_id;
    next();
})

router.route('/:account_id?')
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        console.log('fetching account: ', req.account )
    })
    .put((req, res, next) =>{
        console.log('modifying account: ', req.account )
    })
    .delete((req, res, next) => {
        const client = new Client({
            connectionString: connectionString
        })

        client.connect();

        return client.query(`DELETE FROM ACCOUNTS WHERE account_id = '${req.account}'`)
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