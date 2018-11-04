const fastExif = require('fast-exif');
// const baseUrl = 'src/images/';
const baseUrl = '/Volumes/media/Photos/photoapptemp/';
const https = require('https');
const events = require('events');

exif = {

    getInfo: function(file, callback){

        // console.log('getting exif: ', file);

        fastExif.read(baseUrl + file, callback)
            .then(result => {

                // console.log('exif ', result.exif.DateTimeOriginal, file)

                let exifObj = {
                    file: file,
                    latitude: null,
                    longitude: null,
                    created: null,
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