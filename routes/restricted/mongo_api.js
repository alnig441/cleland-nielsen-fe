const express = require('express'),
    router = express.Router();

const api = require('request');
const basic_auth = `Basic  ${new Buffer(process.env.MONGO_API_USER + ':' + process.env.MONGO_API_PW).toString('base64')}`
const headers = {
  'Authorization': basic_auth,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

router.get('/Search/Photos?', (req, res, next) => {

  let params = stringifyParams(req.query);

  api.get({
    url: `${process.env.MONGO_API_BASE_URL}Search/Photos?${params}`,
    headers: headers
  }, (err, result, body) => {
    console.log('any response: ', body);
    res.send(body);
  })

})

router.get('/SearchById/:_id?/Photos', (req, res, next) => {
  let _id = req.params._id ? req.params._id : req.query._id;

  api.get({
    url: `${process.env.MONGO_API_BASE_URL}Search/${_id}/Photos`,
    header: headers
  }, ( error, result, body) => {
    res.send(body);
  })
})

function stringifyParams ( params ) {
  let keys = Object.keys(params);
  let string = '';
  keys.forEach( (element, index) => {
    if ( element ) {
      index < keys.length - 1 ?
        string += `${element}=${params[element]}&` :
        string += `${element}=${params[element]}` ;
    }
  })
  return string;
}
module.exports = router;
