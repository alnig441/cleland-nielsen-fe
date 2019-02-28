const express = require('express'),
    router = express.Router();
const api = require('request');

const basic_auth = `Basic  ${new Buffer(process.env.MONGO_API_USER + ':' + process.env.MONGO_API_PW).toString('base64')}`
const headers = {
  'Authorization': basic_auth,
  'Accept': 'application/json'
};
const options = {
  baseUrl: process.NODE_ENV == 'production' ? process.env.MONGO_API_BASE_URL : 'http://localhost:4000/api/',
  headers: headers,
  json: true,
  followAllRedirects: true
}


router.route('/')
  .get((req, res, next) => {
    options.uri = 'Search/Photos?';
    options.qs = req.query;
    api.get(options, (err, result, body) => {
      res.send(body);
    })
  })
  .put((req, res, next) => {
    res.send('put')
  })
  .post((req, res, next) => {
    res.send('post')
  })
  .delete((req, res, next) => {
    res.send('delete')
  })

router.route('/:_id?')
  .get((req, res, next) => {
    options.uri = `SearchById/${req.params._id}/Photos`;
    api.get(options, (error, result, body) => {
      res.send(body);
    })
  })
  .put((req, res, next) => {
    res.send('put')
  })
  .post((req, res, next) => {
    options.uri = `UpdateById/${req.params._id}/Photos`;
    options.body = req.body;
    console.log('options: ', options)
    api.post(options, (error, result, body) => {
      res.send(body);
    })
  })
  .delete((req, res, next) => {
    options.uri = `RemoveById/${req.params._id}/Photos`;
    api.delete(options, (error, result, body) => {
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
