let chokidar = require('chokidar')
let path = require('path')
let serverStart = Date.now()
let update = require('./../file/update')
let debounce = require('lodash.debounce')
let cache = require('./../file/cache')

let refresh = debounce(function(res) {
  Object.keys(cache.getAll('stale')).forEach(file =>
    update(file).then(updatedCache => {
      let fileUri = file.split(process.cwd())[1]
      fileUri = fileUri.replace(/\\/gi, '/')
      res.write('data: ' + fileUri + '\n\n')
      cache.remove('stale', file)
    })
  )
})

function updater(req, res, next) {
  if (typeof res.sseSetup !== 'undefined') {
    return next()
  }

  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    })
    serverStart = Date.now()
    chokidar
      .watch(path.join(process.cwd(), 'app'), {
        ignored: /(^|[\/\\])\../
      })
      .on('all', (event, filePath) => {
        if (
          Date.now() - serverStart > 2000 &&
          !filePath.endsWith('___jb_tmp___')
        ) {
          if (event === 'change' || event === 'add') {
            console.log(event, filePath)
            cache.set('stale', filePath)
            refresh(res)
          } else if (event === 'unlink') {
            console.log('unlink', filePath)
            cache.remove('stale', filePath)
            let link = '/app/' + filePath.replace(/\\/gi, '/').split('/app/')[1]
            cache.remove('links', link)
          }
        }
      })
  }

  return next()
}

module.exports = updater
