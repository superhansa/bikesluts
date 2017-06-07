var fs = require('fs')
var JSONStream = require('JSONStream')
var _ = require('lodash')

var jsonReader = {}
jsonReader.read = function (fileName, callback) {
  return fs.readFile(fileName, function (err, data) {
    if (err) {
      throw err
    }

    return callback(data)
  })
}

jsonReader.parseData = function (stream) {
  var occurrences = []

  return stream
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
      return {
        stations: _.orderBy(sorted, ['count', 'station_id'], ['desc', 'asc'])
      }
    })
}

jsonReader.getCachedVersion = function (fileName) {
  var cachedName = fileName.replace(/\.json$/i, '.cached.json')
  if (fs.existsSync(cachedName)) {
    return fs.createReadStream(cachedName)
  }

  var writable = fs.createWriteStream(cachedName)

  writable.on('finish', function () {
    console.log(cachedName + ' has been written')
    return fs.createReadStream(cachedName)
  })

  this.parseData(fs.createReadStream(fileName))
    .pipe(writable)
}

jsonReader.readStream = function (fileName) {
  return this.getCachedVersion(fileName)
}

module.exports = jsonReader
