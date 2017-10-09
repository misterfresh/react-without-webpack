let glob = require('glob')

function list(pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, function(err, files) {
      if (err) {
        return reject(err)
      }
      //console.log(JSON.stringify(files))
      return resolve(files)
    })
  })
}

module.exports = list
