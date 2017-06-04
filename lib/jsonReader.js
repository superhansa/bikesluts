var fs = require('fs');
var JSONStream = require('JSONStream');

var jsonReader = {};
jsonReader.read = function (fileName, callback) {
  return fs.readFile(fileName, function(err, data) {
    if (err) throw err;
    return callback(data);
  });
};

jsonReader.readStartStationStream = function (fileName, callback) {
  return fs.createReadStream(fileName)
    .pipe(JSONStream.parse('trips.*.start_station_id'));
};

module.exports = jsonReader;