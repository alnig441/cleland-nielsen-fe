const fastExif = require('fast-exif');
// const baseUrl = 'src/images/';
const baseUrl = '/Volumes/media/Photos/photoapptemp/';
const https = require('https');
const events = require('events');


let DTO = [];
let images = [];
let index = 0;


function next(err, res) {

    if(res){
        if(index == images.length - 1){
            index = 0;
            images = [];
        }else{
            index++;
            DTO.push(res);
            exif.getInfo(images[index], next)

        }
    }

    if(err){
        console.log(err);

    }

}

exif = {

    generateDTO: function (files, callback){

      if(files) {
          images = files;
          this.getInfo(files[index], next);
      }

    },

    getInfo: function(file, callback){

        console.log('getting exif: ', file);

        fastExif.read(baseUrl + file, callback)
            .then(result => {

                console.log('exif ', result.exif.DateTimeOriginal, file)

                let exifObj = {
                    latitude: null,
                    longitude: null,
                    created: null
                };

                if(result.gps){
                    exifObj.latitude = this.convertCoordinates({coordinate: result.gps.GPSLatitude , reference: result.gps.GPSLatitudeRef});
                    exifObj.longitude = this.convertCoordinates({coordinate: result.gps.GPSLongitude, reference: result.gps.GPSLongitudeRef});
                }

                exifObj.created = result.exif.DateTimeOriginal;

                callback(null, exifObj);
            }, callback)
            .catch(err => {
                console.log('exif error: ', err)
                callback(err)
            }, callback)

    },


    reverseGeoCode: function(lat,lng,cb){

      https.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDbwTih6bX4Z88dKO-ob8HTJf2crU7WCKM', (result)=> {

          var payload = '';

          result.on('data', (data) => {
              payload += data;
          })

          result.on('end', () => {
              let location =  JSON.parse(payload);

              if(location.status == 'OK'){
                  location.results[0].address_components.forEach((element) => {
                      console.log('types: ',element.types);
                  })
              }
          })

      })

    },


    convertCoordinates: function (data) {
        let isNegative = data.reference.toLowerCase() == 's' || data.reference.toLowerCase() == 'w';
        let conversion;

        data.coordinate.forEach((elem, ind) => {
            switch (ind) {
                case 0:
                    conversion = elem;
                    break;
                case 1:
                    conversion += elem/60;
                    break;
                case 2:
                    conversion += elem/3600;
                    break;
            }
        })

        return conversion = isNegative ? '-' + conversion.toString(): conversion.toString() ;
    }

}

module.exports = exif;