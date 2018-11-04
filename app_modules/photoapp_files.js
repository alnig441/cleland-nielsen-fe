const jimp = require('jimp');
const fs = require('fs');
const { exec } = require('child_process');

/* TODO : SET PROPER URLS */

const photoapptemp = '/Volumes/media/Photos/photoapptemp/';
// const photoapp = '/Volumes/media/Photos/photoapp/';
const photoapp = 'src/images/Photos/';
const james = 'src/images/';
// const james = '/Volumes/media/Photos/James/';

let files;
let index;

photoAppTemp = {

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

    convertFiles: function() {
        
        index = 0;

        if(!files){
            this.getFiles((err,res) => {
                if(res){
                    convert(files[index], next)
                }
            })
        }else {
            convert(files[index], next)
        }

        function next(err, res) {
            console.log(res);
            if(res){
                index++;
                index == files.length ? console.log('end of array'): convert(files[index], next);
            }

        }


        function convert(file, callback) {

            let png = file.replace(/jp?g/, 'png')

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
                    console.log('error reading file');
                    callback(err);
                }, callback)
        }

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