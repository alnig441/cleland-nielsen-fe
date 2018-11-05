const https = require('https');
const key = 'AIzaSyDbwTih6bX4Z88dKO-ob8HTJf2crU7WCKM';
const geocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json?';
const timeZoneApi = 'https://maps.googleapis.com/maps/api/timezone/json?';


google = {

    test: function(coordinates){
        console.log('timestamp: ', coordinates);
    },

    reverseGeoCode: function(coordinates,cb){

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
                            google.test(coordinates)
                            this.test(coordinates)
                        }
                        cb(null, dto)
                    }, cb)

                })
            } else {
            cb(null, dto)
        }

    }

};

module.exports = google;