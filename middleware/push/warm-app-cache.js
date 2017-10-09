let update = require('./../file/update')
let list = require('./../file/list')
let path = require('path')
let appFolder = path.join(process.cwd(), 'app')
let cacheConf = require('./cache-conf')
cacheConf()
function warmAppCache() {
  return list(`${appFolder}/**/*.js`, {})
    .then(files => Promise.all(files.map(file => update(file))))
    .then(warmed => console.log('warmed app'))
}

module.exports = warmAppCache
