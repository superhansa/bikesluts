var express = require('express');
var router = express.Router();
var jsonReader = require('../lib/jsonReader');
/* GET home page. */
router.get('/', function(req, res, next) {
  jsonReader.read('./data/10trips.json',function(fileContent){
    var parsed = JSON.parse(fileContent);
    console.log(parsed);

    var start_stations = parsed.trips.map(function (trip) {
      return trip.start_station_id;
    });

    res.render('index', { title: 'Express', jsonFile: start_stations });
  });
  
});

module.exports = router;
