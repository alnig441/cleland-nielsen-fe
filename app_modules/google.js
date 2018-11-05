const https = require('https');
const key = 'AIzaSyDbwTih6bX4Z88dKO-ob8HTJf2crU7WCKM';
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
            country: null,
            state: null,
            city: null
        };


        if(coordinates.latitude){
            https.get(`${geocodeApi}latlng=${coordinates.latitude},${coordinates.longitude}&key=${key}`, (result)=> {

                var payload = '';

                result.on('data', (data) => {
                    payload += data;
                })

                result.on('end', () => {
                    let location =  JSON.parse(payload);

                    if(location.status == 'OK'){
                        location.results[0].address_components.forEach((element) => {
                            element.types.find((type) => {
                                let value = element.long_name;
                                switch(type) {
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
                    if(coordinates)
                    this.getOffset(coordinates, (err, timestamp) => {
                        console.log('timestamp: ', new Date(timestamp.created), coordinates.created, timestamp.hour)
                        console.log('utc: ', timestamp.utc);
                    })
                    cb(null, dto)
                }, cb)

            })
        } else {
            cb(null, dto)
        }
    },

    getOffset: function(coordinates, cb) {

        // console.log('getOffset: ', coordinates);

        if(coordinates){

            let timestamp = Date.parse(coordinates.created);
            let timeObj = {};
            // timestamp = timestamp.toString().slice(0,10);

            https.get(`${timeZoneApi}location=${coordinates.latitude},${coordinates.longitude}&timestamp=${timestamp.toString().slice(0,10)}&key=${key}`, (result) => {
                let payload = '';

                result.on('data', (data) => {
                    payload += data;
                })

                result.on('error', (err) => {
                    console.log('timezone api error',err)
                })

                result.on('end', () => {
                    let body = JSON.parse(payload);
                    // console.log('timezone api payload: ', payload)

                    if(body.status == 'OK'){
                        let offset = (body.rawOffset + body.dstOffset) * 1000;
                        let timestampAdjusted = new Date(Date.parse(coordinates.created) + offset);
                        let x = coordinates.created;
                        let utc = new Date(Date.UTC(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds()))

                        // console.log('adjusted:', timestampAdjusted, offset, coordinates.created)

                        timeObj.created = timestampAdjusted;
                        timeObj.year = coordinates.created.getUTCFullYear().toString();
                        timeObj.month = coordinates.created.getUTCMonth().toString();
                        timeObj.day = coordinates.created.getUTCDate().toString();
                        timeObj.hour = coordinates.created.getHours().toString();
                        timeObj.utc = utc;

                    }

                    cb(null ,timeObj)
                })
            })

            // cb(null, timestamp)

        }

    }

}

module.exports = google;