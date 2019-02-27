const express = require('express'),
    router = express.Router();

const api = require('request');
const basic_auth = `Basic  ${new Buffer(process.env.MONGO_API_USER + ':' + process.env.MONGO_API_PW).toString('base64')}`

router.get('/Search/Photos', (req, res, next) => {

  api.get({
    url: `${process.env.MONGO_API_BASE_URL}Search/Photos`,
    headers: {
      'Authorization': basic_auth
    }
  }, (err, result, body) => {
    console.log('any response: ', body);
    res.send(body);
  })
})

module.exports = router;
