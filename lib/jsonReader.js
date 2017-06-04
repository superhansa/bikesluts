var fs = require('fs')

var jsonReader = {}
jsonReader.read = function (fileName, callback) {
  return fs.readFile(fileName, function (err, data) {
    if (err) {
      throw err
    }

    return callback(data)
  })
}

jsonReader.readStream = function (fileName) {
  return fs.createReadStream(fileName)
}

module.exports = jsonReader
