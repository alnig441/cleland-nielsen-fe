const fastExif = require('fast-exif');
const baseUrl = 'src/images/';

exif = {

    getInfo: function(file, full){

        console.log('file received: ', file);
        full ? full = full : full = 1;

        return fastExif.read(baseUrl + file, full)
            .then(result => {
                let exifObj = {
                    latitude: '',
                    longitude: '',
                    created: ''
                };
                exifObj.latitude = this.convertCoordinates({coordinate: result.gps.GPSLatitude , reference: result.gps.GPSLatitudeRef});
                exifObj.longitude = this.convertCoordinates({coordinate: result.gps.GPSLongitude, reference: result.gps.GPSLongitudeRef});
                return exifObj;
            })
            .catch(err => {
                console.log('exif error: ', err)
            })

    },



    convertCoordinates: function (data) {

        console.log('data: ', data);

        let isNegative = data.reference.toLowerCase() == 's' || data.reference.toLowerCase() == 'w';
        let conversion;

        data.coordinate.forEach((elem, ind) => {
            console.log('elem: ', elem, typeof elem)
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