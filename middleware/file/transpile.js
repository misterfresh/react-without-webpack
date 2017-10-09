let babel = require('babel-core')

function transpile(file, conf) {
  return new Promise((resolve, reject) => {
    babel.transformFile(file, conf, function(err, transpiled) {
      if (err) {
        reject(err)
      } else {
        resolve(transpiled.code)
      }
    })
  })
}

module.exports = transpile
