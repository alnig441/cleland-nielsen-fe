const express = require('express'),
    router = express.Router();

const http = require('request');
const basic_auth = `Basic  ${new Buffer(process.env.MONGO_API_USER + ':' + process.env.MONGO_API_PW).toString('base64')}`

router.get('/Search/Photos', (req, res, next) => {

  request.get({
    url: `${process.env.MONGO_API_BASE_URL}Search/Photos`,
    headers: {
      'Authorization': basic_auth
    }
  }, (err, res, body) => {
    console.log('any response: ', body);
  })
})

module.exports = router;
