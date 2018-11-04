const https = require('https');

const key = 'AIzaSyDbwTih6bX4Z88dKO-ob8HTJf2crU7WCKM';
const api = 'https://maps.googleapis.com/maps/api/geocode/json?';


google = {

    reverseGeoCode: function(coordinates,cb){

            // console.log('incoming coordinates: ', coordinates);

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
                https.get(`${api}latlng=${coordinates.latitude},${coordinates.longitude}&key=${key}`, (result)=> {

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
                        cb(null, dto)
                    }, cb)

                })
            } else {
            cb(null, dto)
        }

    }

}

module.exports = google;