var express = require('express');
var router = express.Router();
var jsonReader = require('../lib/jsonReader');
/* GET home page. */
router.get('/', function(req, res, next) {
  jsonReader.read('./data/10trips.json',function(fileContent){
    res.render('index', { title: 'Express', jsonFile: fileContent });
  });
  
});

module.exports = router;
