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

    return client.query('SELECT * FROM users as a INNER JOIN accounts as b ON a.account_type::uuid = b.account_id')
        .then(result => {
            console.log('result from users: ', result.rows);
            res.send(result.rows);
            client.end();
        })
        .catch(error => {
            console.log('error from query: ', error);
            client.end();
        })
})

module.exports = router;