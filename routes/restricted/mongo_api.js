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
    baseUrl: process.env.MONGO_API_BASE_URL,
    headers: headers,
    json: true,
    followAllRedirects: true
  }
  object.uri ? options.uri = object.uri : null;
  object.qs ? options.qs = object.qs : null;
  object.body ? options.body = object.body : null;
  return options;
}

router.get('/Search/**', (req, res, next) => {
  let uri = req.originalUrl.replace(/api\//, '');
  let options = new Options({uri : uri, qs: req.query });
  api.get(options, (err, result, body) => {
    res.send(body);
  })
})

router.get('/generate_tabs/**', (req, res, next) => {
  let uri = req.originalUrl.replace(/api\/generate_tabs/, 'Distinct');
  let options = new Options({ uri: uri });
  api.get(options, (error, result, body) => {
    body = body.filter( element => {
      return element != null;
    })
    req.query.year ? null : body.sort()  ;
    res.send(body);
  })
})

router.get('/searchTerms/**', (req, res, next) => {
  let uri = req.originalUrl.replace(/api\/searchTerms/, 'Terms');
  let options = new Options({ uri: uri });
  api.get(options, (error, result, body) => {
    body = body.filter( element => {
      return element != null;
    })
    res.send(body);
  })
})

router.post('/Update/**', (req, res, next) => {
  let io = req.app.get('socketio');
  let uri = req.originalUrl.replace(/\/api/, '');
  let options = new Options({ uri: uri, body: req.body });
  api.post(options, (error, result, body) => {
    res.send(body);
    io.emit('update', { endpoint: uri, whatever: body })
  })
})

router.route('/:_id/**')
  .get((req, res, next) => {
    let uri = newPath(req.originalUrl, req.params._id, 'SearchById/');
    let options = new Options({ uri: uri });
    api.get(options, (error, result, body) => {
      res.send(body);
    })
  })
  .post((req, res, next) => {
    let uri = newPath(req.originalUrl, req.params._id, 'UpdateById/');
    let options = new Options({ uri: uri, body: req.body });
    api.post(options, (error, result, body) => {
      res.send(body);
    })
  })
  .delete((req, res, next) => {
    let uri = newPath(req.originalUrl, req.params._id, 'RemoveById/');
    let options = new Options({ uri: uri });
    api.delete(options, (error, result, body) => {
      res.send(body);
    })
  })

function newPath(url, _id, partial) {
  let find = new RegExp('/api/' + _id);
  let replace = partial + _id;
  return url.replace(find, replace);
}

module.exports = router;
