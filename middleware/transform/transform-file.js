let path = require('path')
let cache = require('./../file/cache')
let update = require('./../file/update')

let send = require('./../file/send')
let fileLastModifiedHash = require('./../file/file-last-modified-hash')

function transformFile(req, res) {
  let uri = req.url.split('?').shift()

  let file = path.join(process.cwd(), uri)
  let src = file.replace(/\\/gi, '/')
  //console.log('src', src)

  return fileLastModifiedHash(file).then(lastModifiedHash => {
    let lastKnownHash = cache.get('hashMap', src)
    //console.log('known', lastKnownHash, 'mod', lastModifiedHash)
    if (lastKnownHash && lastKnownHash === lastModifiedHash) {
      send(res, cache.get('cacheMap', lastKnownHash), true)
    } else {
      return update(file)
        .then(updated => send(res, updated.file))
        .catch(error => res.status(500).json(error))
    }
  })
}

module.exports = transformFile
