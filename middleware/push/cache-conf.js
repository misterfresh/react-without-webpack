let read = require('./../file/read')
let path = require('path')
let cache = require('./../file/cache')
let gzip = require('./../file/gzip')
let confPath = path.join(
  process.cwd(),
  `conf/${process.env.MYAPP_ENV}/client.json`
)

function cacheConf() {
  return read(confPath)
    .then(conf => 'export default ' + conf)
    .then(updated => gzip(updated))
    .then(gzipped => {
      let cached = {
        file: gzipped,
        type: 'application/javascript'
      }
      cache.set('links', '/conf/conf.js', cached)
      return cached
    })
}

module.exports = cacheConf
