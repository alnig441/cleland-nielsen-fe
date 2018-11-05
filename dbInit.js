const { Client } = require('pg'),
    connectionString = process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';

const bcrypt = require('bcrypt'),
    saltRounds = 10;

const defaultPassword = 'jacn2014';

let client = new Client({ connectionString: connectionString });

client.connect()


// client.query(`select tablename from pg_tables where schemaname='public' and tablename='images';`)
//     .then(result => {
//         if(result.rows.length > 0){
//             console.log('table exists: ', result.rows);
//         } else {
//             console.log('pish!');
//         }
//     })
//     .catch(err => {
//         console.log('error getting table: ', err);
//         client.end();
//     })

client.query('CREATE TABLE images (' +
    'id serial primary key,' +
    'created timestamp without time zone,' +
    'meta text[],' +
    'year integer,' +
    'month integer,' +
    'day integer,' +
    'file character varying unique not null,' +
    'storage character varying,' +
    'occasion text,' +
    'country text,' +
    'state text,' +
    'city text,' +
    'names text[]);')
    .then(() => {
        console.log('images SUCCESS')
    })
    .catch(err => {
        console.log('error creating images table: ', err);
        client.end();
    })

client.query('CREATE TABLE events (' +
    'img_id serial not null primary key,' +
    'event_da text not null,' +
    'event_en text not null,' +
    'updated timestamp without time zone);')
    .then(() => {
        console.log('events SUCCESS');
    })
    .catch(err => {
        console.log('error creating events table: ', err);
        client.end();
    })

client.query('CREATE TABLE permissions (' +
    'permission_id uuid not null primary key, ' +
    'permission_name character varying unique not null);')
    .then(() => {
        console.log('permissions SUCCESS');
    })
    .catch(err => {
        console.log('error creating permissions table: ', err);
        client.end();
    })

client.query('CREATE TABLE accounts (' +
    'account_id uuid not null primary key,' +
    'account_name character varying not null unique,' +
    'account_permissions uuid[]);')
    .then(() => {
        console.log('accounts SUCCESS');
    })
    .catch((err) => {
        console.log('error creating accounts table: ', err.error);
        client.end()
    })

client.query('CREATE TABLE users (' +
    'user_id uuid not null primary key, ' +
    'account_type character varying not null,' +
    'user_name character varying not null unique,' +
    'password character varying not null,' +
    'language character varying);')
    .then(res => {
        console.log('users SUCCESS');
    })
    .catch(err => {
        console.log('error creating users table: ', err);
        client.end();
    })

client.query(`INSERT INTO permissions VALUES
(uuid_generate_v4(), 'to_view_images'),
(uuid_generate_v4(), 'to_view_videos'),
(uuid_generate_v4(), 'to_view_users'),
(uuid_generate_v4(), 'to_view_accounts'),
(uuid_generate_v4(), 'to_view_permissions'),
(uuid_generate_v4(), 'to_edit_images'),
(uuid_generate_v4(), 'to_edit_videos'),
(uuid_generate_v4(), 'to_edit_users'),
(uuid_generate_v4(), 'to_edit_accounts'),
(uuid_generate_v4(), 'to_edit_permissions'),
(uuid_generate_v4(), 'to_add_images'),
(uuid_generate_v4(), 'to_add_videos'),
(uuid_generate_v4(), 'to_add_users'),
(uuid_generate_v4(), 'to_add_accounts'),
(uuid_generate_v4(), 'to_add_permissions'),
(uuid_generate_v4(), 'to_delete_images'),
(uuid_generate_v4(), 'to_delete_videos'),
(uuid_generate_v4(), 'to_delete_users'),
(uuid_generate_v4(), 'to_delete_accounts'),
(uuid_generate_v4(), 'to_delete_permissions')`)
    .then(() => {
        console.log('permissions added');
    })
    .catch(err => {
        console.log('adding permissions failed: ', err);
        client.end();
    })

client.query(`INSERT INTO accounts VALUES
(uuid_generate_v4(), 'administrator', (select array(select permission_id::uuid from permissions)))`)
    .then(() => {
        console.log('accounts added');
    })
    .catch(err => {
        console.log('adding accounts failed: ', err);
        client.end();
    })

bcrypt.hash('jacn2014', saltRounds)
    .then((hash, err) => {
        if(err){
            console.log('hash error: ', err);
            client.end();
        }

        client.query(`INSERT INTO users VALUES
        (uuid_generate_v4(), (select account_id from accounts where account_name = 'administrator'), 'alnig441', '${hash}')`)
            .then(() => {
                console.log(`admin user 'alnig441' added`);
                client.end();
            })
            .catch(err => {
                console.log('admin user add failed: ', err);
                client.end();
            })
    })
    .catch(err => {
        console.log('hash error: ', err);
        client.end();
    })


