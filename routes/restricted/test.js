const events = require('events');
const exif = require('fast-exif');
const https = require('https');

function DTOgenerator(files, srcUrl) {

    events.EventEmitter.call(this);

    this.files = files;
    this.srcUrl = srcUrl;
    this.dto = [];

    return this;

}

DTOgenerator.prototype = new events.EventEmitter();

DTOgenerator.prototype.setArgument = function(newArgument){
    this.received = newArgument;
    this.emit('setting_argument', this.received);
    return this;
}

DTOgenerator.prototype.getExif = function(){
    this.emit('getting_exif');
    return this;
}


module.exports = DTOgenerator;