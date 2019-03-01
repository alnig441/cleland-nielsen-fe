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

router.get('/generate_tabs?', (req, res, next) => {
  options.uri = req.query.year ? `Distinct/${req.query.year}/Photos` : 'Distinct/Photos';
  api.get(options, (error, result, body) => {
    body = body.filter( element => {
      return element != null;
    })
    req.query.year ? null : body.sort()  ;
    res.send(body);
  })
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

module.exports = router;
