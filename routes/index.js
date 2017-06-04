var express = require('express')
var router = express.Router()
var JSONStream = require('JSONStream')
var _ = require('lodash')

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
  var occurrences = {}
  jsonReader.readStream('./data/10trips.json')
    .pipe(JSONStream.parse('trips.*'))
    .on('data', function (data) {
      var startStationId = parseInt(data.start_station_id, 10)
      var endStationId = parseInt(data.end_station_id, 10)
      if (typeof occurrences[startStationId] === 'undefined') {
        occurrences[startStationId] = {count: 1}
      } else {
        occurrences[startStationId].count++
      }

      if (typeof occurrences[endStationId] === 'undefined') {
        occurrences[endStationId] = {count: 1}
      } else {
        occurrences[endStationId].count++
      }
    })
    .on('end', function () {
      var sorted = _.map(occurrences, function (obj, id) {
        return {station_id: id, count: obj.count}
      })
      return res.render('index', {
        title: 'Ninja Turtles',
        stations: _.orderBy(sorted, ['count', 'station_id'], ['desc', 'asc'])
      })
    })
})

router.get('/full_stream_ahead', function (req, res, next) {
  var occurrences = {}
  jsonReader.readStream('./data/trips-2017.5.1-2017.5.31.json')
    .pipe(JSONStream.parse('trips.*'))
    .on('data', function (data) {
      var startStationId = parseInt(data.start_station_id, 10)
      var endStationId = parseInt(data.end_station_id, 10)
      if (typeof occurrences[startStationId] === 'undefined') {
        occurrences[startStationId] = {count: 1}
      } else {
        occurrences[startStationId].count++
      }

      if (typeof occurrences[endStationId] === 'undefined') {
        occurrences[endStationId] = {count: 1}
      } else {
        occurrences[endStationId].count++
      }
    })
    .on('end', function () {
      var sorted = _.map(occurrences, function (obj, id) {
        return {station_id: id, count: obj.count}
      })
      return res.render('index', {
        title: 'Ninja Turtles',
        stations: _.orderBy(sorted, ['count', 'station_id'], ['desc', 'asc'])
      })
    })
})

module.exports = router
