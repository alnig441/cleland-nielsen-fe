const events = require('events');
const exif = require('fast-exif');
const https = require('https');

function DTOgenerator(srcUrl) {

    events.EventEmitter.call(this);

    this.files = [];
    this.srcUrl = srcUrl;
    this.dto = [];
    this.index = 0;

    this.getExif = (file, callback) => {

        console.log('getexif incoming: ', file);

        exif.read(this.srcUrl + file, callback)
            .then(result => {
                let exifObj = {
                    file: file,
                    latitude: null,
                    longitude: null,
                    created: null,
                    file: null,
                    year: null,
                    month: null,
                    day: null,
                    country: null,
                    state: null,
                    city: null,
                };

                if(result){
                    exifObj.created = result.exif.DateTimeOriginal;
                }

                if(result.gps){
                    exifObj.latitude = this.convertCoordinates({coordinate: result.gps.GPSLatitude , reference: result.gps.GPSLatitudeRef});
                    exifObj.longitude = this.convertCoordinates({coordinate: result.gps.GPSLongitude, reference: result.gps.GPSLongitudeRef});
                }
                this.dto.push(exifObj);
                callback(null, true);
            }, callback)
            .catch(err => {
                callback(err);
            },callback)
    }

    this.convertCoordinates = (data) => {
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

    reverseGeoCode = (lat,lng,cb) => {

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

    this.next = (err, res) => {
        if(err){
            console.log('there was an error: ', err);
        }
        if(res && this.index < this.files.length - 1){
            this.index++;
            this.getExif(this.files[this.index], this.next);
        }else{
            this.emit('done', this.dto)
            this.index = 0;
            this.files = [];
        }
    }

    return this;
}

DTOgenerator.prototype = new events.EventEmitter();

DTOgenerator.prototype.loadFiles = function (files) {
    this.files = files;
    return this;
}

DTOgenerator.prototype.generateDto = function () {

    console.log('generate dto');

    this.index = 0;
    this.getExif(this.files[this.index], this.next);

    return this;
}

DTOgenerator.prototype.getDTO = function () {
    return this.dto;
}

module.exports = DTOgenerator;