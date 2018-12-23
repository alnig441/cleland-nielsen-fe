const fastExif = require('fast-exif');
const baseUrl = process.env.NODE_ENV == 'development' ? 'images/Photos/test/' : process.env.PHOTOS_MOUNT_POINT + '/photoapptemp/';
const https = require('https');

exif = {

    getInfo: function(file, callback){

        fastExif.read(baseUrl + file, callback)
            .then(result => {

                let exifObj = {
                    file: file,
                    latitude: null,
                    longitude: null,
                    created: null,
                };

                if (result.gps && result.gps.GPSLatitude) {
                    exifObj.latitude = this.convertCoordinates({
                        coordinate: result.gps.GPSLatitude,
                        reference: result.gps.GPSLatitudeRef
                    });
                    exifObj.longitude = this.convertCoordinates({
                        coordinate: result.gps.GPSLongitude,
                        reference: result.gps.GPSLongitudeRef
                    });
                }

                exifObj.created = result.exif.DateTimeOriginal;

                callback(null, exifObj);
            })
            .catch(err => {

                console.log('exif error: ', err)
                callback(err)
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