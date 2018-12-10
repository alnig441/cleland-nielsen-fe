const https = require('https');
const key = process.env.API_KEY;
const geocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json?';
const timeZoneApi = 'https://maps.googleapis.com/maps/api/timezone/json?';

google = {

    reverseGeoCode: function (coordinates, cb) {

        let dto = {
            file: coordinates.file,
            created: coordinates.created,
            day: null,
            month: null,
            year: null,
            country: '',
            state: '',
            city: ''
        };

        function timestampCb(err, timestamp) {
            if(timestamp){
                for(var prop in timestamp){
                    dto[prop] = timestamp[prop];
                }
                cb(null, dto);
            }
        }


        if(coordinates.latitude){
            https.get(`${geocodeApi}latlng=${coordinates.latitude},${coordinates.longitude}&key=${key}`, (result)=> {

                var payload = '';

                result.on('data', (data) => {
                    payload += data;
                })

                result.on('error', (err) => {
                    console.log('reverse geocode api error: ', err);
                    cb(err);
                })

                result.on('end', () => {
                    let location = JSON.parse(payload);

                    if (location.status == 'OK') {
                        location.results[0].address_components.forEach((element) => {
                            element.types.find((type) => {
                                let value = element.long_name;
                                switch (type) {
                                    case 'country':
                                        dto.country = value;
                                        break;
                                    case 'administrative_area_level_1':
                                        dto.state = value;
                                        break;
                                    case 'locality':
                                        dto.city = value;
                                        break
                                }

                            })
                        })
                    }
                    this.getOffset(coordinates, timestampCb);

                })
            })
        } else {
            cb(null,dto);
        }
    },

    getOffset: function(coordinates, cb) {

        if(coordinates){

            let timestamp = Date.parse(coordinates.created);
            let timeObj = {};

            https.get(`${timeZoneApi}location=${coordinates.latitude},${coordinates.longitude}&timestamp=${timestamp.toString().slice(0,10)}&key=${key}`, (result) => {
                let payload = '';

                result.on('data', (data) => {
                    payload += data;
                })

                result.on('error', (err) => {
                    console.log('timezone api error',err);
                    cb(err);
                })

                result.on('end', () => {
                    let body = JSON.parse(payload);

                    if(body.status == 'OK'){

                        let offset = (body.rawOffset + body.dstOffset) * 1000;
                        let actualLocalTime = new Date(timestamp + offset);

                        timeObj.created = actualLocalTime;
                        timeObj.year = actualLocalTime.getUTCFullYear();
                        timeObj.month = actualLocalTime.getUTCMonth();
                        timeObj.day = actualLocalTime.getUTCDate();
                    }

                    cb(null ,timeObj)
                })
            })

        }

    }

}

module.exports = google;