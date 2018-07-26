const { Client } = require('pg'),
    connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

const bcrypt = require('bcrypt'),
    saltRounds = 10;

const defaultPassword = 'jacn2014';

let client = new Client({ connectionString: connectionString });

client.connect()

client.query(`INSERT INTO accounts VALUES 
    (uuid_generate_v4(), 'administrator', (select array(select permission_id::uuid from permissions)),
    (uuid_generate_v4(), 'standard_user'),
    (uuid_generate_v4(), 'super_user')`)
    .then(res => {

        console.log('result: ', res);

        bcrypt.hash('jacn2014', saltRounds)
            .then((hash, err) => {
                if(err) {

                    console.log('error: ', err);
                }

                client.query(`Insert into users values 
            (uuid_generate_v4(), (select account_id from accounts where account_type='administrator'), 'alnig441', '${hash}'),
            (uuid_generate_v4(), (select account_id from accounts where account_type='standard_user'), 'vandel', '${hash}'),
            (uuid_generate_v4(), (select account_id from accounts where account_type='standard_user'), 'kilsyth', '${hash}')`)
                    .then(result => {
                        console.log('result: ', result);
                        client.end()

                    })
                    .catch(err => {
                        console.log('insert users error: ', err);
                    })

            })
            .catch(err => {
                console.log('bcrypt error: ', err)
            })
    })
    .catch(err => {
        console.log('insert accounts error: ', err);

    })


