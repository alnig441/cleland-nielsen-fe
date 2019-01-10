const events = require('events');
const exif = require('./exifJobs');
const google = require('./googleJobs');
const imageFiles = require('./imageFileJobs');

function jobHandler(srcUrl) {

    events.EventEmitter.call(this);

    this.files = [];
    this.processedImages = [];
    this.srcUrl = srcUrl;
    this.dto = [];
    this.index = 0;

    this.getExif = exif.getInfo;
    this.convertCoordinates = exif.convertCoordinates;
    this.getOffset = google.getOffset;
    this.reverseGeocode = google.reverseGeoCode;
    this.getFiles = imageFiles.getFiles;
    this.convertFiles = imageFiles.convertAndMoveFiles;
    this.populateImagesTable = imageFiles.loadDb;

    this.generateNext = (err, coords) => {
        this.index ++;

        if(err){
            this.emit('error', err);
        }

        if (coords){
            this.reverseGeocode(coords, (err,res) => {
                if(res){
                    this.processedImages.push(res.file);
                    this.dto.push(res);
                }
                this.procede();
            })

        } else {
            this.procede();
        }
    };

    this.procede = () => {
        if (this.index == this.files.length) {
            this.emit('dto_done', this.dto);
        } else {
            this.getExif(this.files[this.index], this.generateNext)
        }
    }

    this.convertNext = (err, res) => {
        this.index++;

        if(err) {
            this.emit('error', err);
        }

        if(this.index == this.processedImages.length){
            this.emit('conversion_done', this.processedImages);
            this.processedImages = [];
        } else{
            this.convertFiles(this.processedImages[this.index], this.convertNext)
        }
    };

    return this;
}

jobHandler.prototype = new events.EventEmitter();

jobHandler.prototype.generateDto = function () {

    this.index = 0;
    this.dto = [];

    this.getFiles((err, res) => {
        if(res){
            this.files = res;
            this.getExif(this.files[this.index], this.generateNext);
        }else {
            this.emit('empty', `${this.srcUrl} empty`);
        }
    })

    return this;
}

jobHandler.prototype.loadImages = function(DTO) {

    this.populateImagesTable(DTO, (err,res) => {
        if(res){
            this.emit('db_load_done', this.processedImages)
        } else {
            this.emit('error', err);
        }
    })

    return this;

}

jobHandler.prototype.convertFilesToPng = function() {

    this.index = 0;

    if(this.processedImages.length > 0){
        this.convertFiles(this.processedImages[this.index], this.convertNext);
    } else {
        this.emit('empty', `no files to convert`)
    }

    return this;
}



module.exports = jobHandler;