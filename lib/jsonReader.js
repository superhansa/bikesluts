var fs = require('fs');
var Parser = require('jsonparse');
var p = new Parser();
var jsonReader = {};
jsonReader.read = function (fileName, callback) {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    return callback(data);

  });
  
}

module.exports = jsonReader;