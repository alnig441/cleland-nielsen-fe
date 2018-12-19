const { Client } = require('pg');
const connectionString =  process.env.MYDB || 'postgresql://allannielsen:1109721405@localhost:5432/jacn2014_ng4';
const jimp = require('jimp');
const fs = require('fs');
const { exec } = require('child_process');

/* TODO : SET PROPER URLS */

/* source directory*/
const photoapptemp = process.env.NODE_ENV == 'development' ? 'images/Photos/test/'  : process.env.PHOTOS_MOUNT_POINT + '/photoapptemp/';
const photoapp = process.env.NODE_ENV == 'production' ? process.env.PHOTOS_MOUNT_POINT + '/photoapp/' : 'images/Photos/';

/* destination directory */
const james = process.env.NODE_ENV == 'production' ? process.env.PHOTOS_MOUNT_POINT + '/James/' : 'images';

let files;
let index;

photoAppTemp = {

    loadDb: function(DTO, cb) {

        prepareQuery(DTO, function(err, res) {

            const client = new Client({connectionString: connectionString})
            client.connect();
            client.query(`INSERT INTO images ${res.keys} values ${res.values}`)
                .then(() => {
                    cb(null,true);
                    client.end()
                })
                .catch(err => {
                    cb({code: err.code, detail: err.detail});
                    client.end()
                })

        });


        function prepareQuery(images, cb) {

            let keys = Object.keys(images[0]);
            let keyString = '(' + keys.join() + ')';
            let values = [];

            images.forEach((image) => {
                let tempArray = [];
                let valuesString;

                for(let key in image){
                    if(typeof image[key] != 'number' && image[key] != null){
                        let value;
                        let tempString = image[key].toString();
                        tempString = tempString.replace(/'/g, "''");

                        key == 'created' ? value = "'" + tempString.slice(0,25) + "'": value = "'" + tempString + "'";

                        tempArray.push(value);
                    }else{
                        image[key] == null ? tempArray.push('null') : tempArray.push(image[key]);
                    }
                }
                valuesString = '(' + tempArray.join() + ')';
                values.push(valuesString);
            })

            let allValuesString = values.join();
            cb(null, {keys: keyString, values: allValuesString});
        }

    },

    /* convert photoapptemp/*.jpg to photoapp/*.png */

    getFiles: function(cb) {

        fs.readdir(photoapptemp, (err, res) => {
            if(err){
                cb(err);
            }
            if(res && res.length != 0){
                files = res;
                cb(null, files);
            }else{
                cb(null, false);
            }
        }, cb)

    },

    convertAndMoveFiles: function(file, callback) {
        let png = file.replace(/jp?g/, 'png');

        jimp.read(`${photoapptemp}${file}`)
            .then((image) => {
                image.resize(280, jimp.AUTO);
                image.writeAsync(`${photoapp}${png}`)
                    .then((result) => {
                        move(file, (err, res) => {
                            if(!err){
                                callback(null,`${file} converted and moved`);
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        callback(err);
                    })
            }, callback)
            .catch(err => {
                callback(err);
            }, callback)

        function move(file, callback) {

            let split = file.split(' ');
            let joined = split.join('\\ ');

            exec(`mv ${photoapptemp}${joined} ${james}`, (err, stdout, stdin) => {
                if(!err){
                    callback(null,true);
                }
            })

        }

    }

}

module.exports = photoAppTemp