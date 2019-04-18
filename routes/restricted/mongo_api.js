const express = require('express'),
    router = express.Router();
const api = require('request');

const basic_auth = `Basic  ${new Buffer(process.env.MONGO_API_USER + ':' + process.env.MONGO_API_PW).toString('base64')}`
const headers = {
  'Authorization': basic_auth,
  'Accept': 'application/json'
};
const Options = function (object) {
  let options = {
    baseUrl: process.NODE_ENV == 'production' ? process.env.MONGO_API_BASE_URL : 'http://localhost:4000/api/',
    headers: headers,
    json: true,
    followAllRedirects: true
  }
  object.uri ? options.uri = object.uri : null;
  object.qs ? options.qs = object.qs : null;
  object.body ? options.body = object.body : null;
  return options;
}

router.get('/', (req, res, next) => {
  let options = new Options({uri :'Search/Photos?', qs: req.query });
  api.get(options, (err, result, body) => {
    res.send(body);
  })
})

router.get('/generate_tabs?', (req, res, next) => {
  let uri = req.query.year ? `Distinct/${req.query.year}/Photos` : 'Distinct/Photos';
  let options = new Options({ uri: uri });
  api.get(options, (error, result, body) => {
    body = body.filter( element => {
      return element != null;
    })
    req.query.year ? null : body.sort()  ;
    res.send(body);
  })
})

router.post('/update', (req, res, next) => {
  let options = new Options({ uri: `Update/Photos`, body: req.body });
  api.post(options, (error, result, body) => {
    res.send(body);
  })
})

router.route('/:_id?')
  .get((req, res, next) => {
    let options = new Options({ uri: `SearchById/${req.params._id}/Photos` });
    api.get(options, (error, result, body) => {
      res.send(body);
    })
  })
  .post((req, res, next) => {
    let options = new Options({ uri: `UpdateById/${req.params._id}/Photos`, body: req.body });
    api.post(options, (error, result, body) => {
      res.send(body);
    })
  })
  .delete((req, res, next) => {
    let options = new Options({ uri: `RemoveById/${req.params._id}/Photos` });
    api.delete(options, (error, result, body) => {
      res.send(body);
    })
  })



module.exports = router;
