let Promise = require('bluebird')

let path = require('path')
let fileLastModifiedHash = require('./file-last-modified-hash')
let transpile = require('./transpile')
let gzip = require('./gzip')
let cache = require('./cache')
let resolveToUrl = require('./../transform/resolveToUrl')
let conf = JSON.parse(
  require('fs').readFileSync(path.join(process.cwd(), '.babelrc'), 'utf-8')
)
conf.babelrc = false
conf.plugins = conf.plugins.filter(plugin =>
  ['transform-class-properties', 'syntax-object-rest-spread'].includes(
    plugin[0]
  )
)
conf.plugins.push([resolveToUrl])

function update(file) {
  return Promise.all([
    fileLastModifiedHash(file),
    transpile(file, conf).then(transpiled => gzip(transpiled))
  ]).spread((hash, gzipped) => {
    let path = file.replace(/\\/gi, '/')
    //console.log('saved', hash, path)

    cache.remove('cacheMap', cache.get('hashMap', path))
    cache.set('hashMap', path, hash)
    cache.set('cacheMap', hash, gzipped)

    let link = '/app/' + path.split('/app/')[1]
    let cached = {
      file: gzipped,
      type: 'application/javascript'
    }
    cache.set('links', link, cached)
    return cached
  })
}

module.exports = update
