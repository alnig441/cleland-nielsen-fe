const events = require('events');
const exif = require('./exif');
const google = require('./googleApi');


function dtoBuilder(srcUrl) {

    events.EventEmitter.call(this);

    this.files = [];
    this.srcUrl = srcUrl;
    this.dto = [];
    this.index = 0;

    this.reverseGeocode = google.reverseGeoCode;
    this.getExif = exif.getInfo;
    this.convertCoordinates = exif.convertCoordinates;

    this.next = (err, coords) => {
        if(err){
            console.log('there was an error: ', err);
        }
        if(coords && this.index < this.files.length - 1){
            this.reverseGeocode(coords, (err,res) => {
                this.dto.push(res);
                this.index++;
                this.getExif(this.files[this.index], this.next);
            })

        }else{
            this.reverseGeocode(coords, (err,res) => {
                this.dto.push(res);
                this.emit('done', this.dto);
                this.index = 0;
                this.files = [];
            })
        }
    }

    return this;
}

dtoBuilder.prototype = new events.EventEmitter();

dtoBuilder.prototype.generateDto = function (files) {
    this.files = files;
    this.index = 0;
    this.dto = [];
    this.getExif(this.files[this.index], this.next);
    return this;
}



module.exports = dtoBuilder;