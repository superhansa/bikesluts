var express = require('express')
var router = express.Router()

var jsonReader = require('../lib/jsonReader')
/* GET home page. */
router.get('/', function (req, res, next) {
  jsonReader.read('./data/10trips.json', function (fileContent) {
    var parsed = JSON.parse(fileContent)
    console.log(parsed)

    var startStations = parsed.trips.map(function (trip) {
      return trip.start_station_id
    })

    res.render('index', { title: 'Express', jsonFile: startStations })
  })
})

router.get('/stream10', function (req, res, next) {
  var stations = jsonReader.readStream('./data/10trips.json')
  console.log(stations)
  return res.render('index', {
    title: 'Ninja Turtles',
    stations: stations
  })
})

router.get('/full_stream_ahead', function (req, res, next) {
  var stations = require('../data/sorted.json')
  var topTen = stations.slice(0, 10)
  return res.render('index', {
    title: 'Ninja Turtles',
    stations: topTen
  })
})

module.exports = router
