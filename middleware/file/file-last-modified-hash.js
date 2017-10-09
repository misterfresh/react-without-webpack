let fs = require('fs')
let crypto = require('crypto')

function fileLastModifiedHash(path) {
  return new Promise((resolve, reject) => {
    fs.lstat(path, function(err, stats) {
      if (err) {
        return reject(err)
      } else {
        let mtime = stats.mtime.getTime()
        let date = new Date(mtime)['toLocaleDateString']('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })

        let hash = crypto
          .createHash('md5')
          .update(mtime + '-' + path)
          .digest('hex')
        //console.log(date, hash, path.split(process.cwd())[1])
        return resolve(hash)
      }
    })
  })
}

module.exports = fileLastModifiedHash
