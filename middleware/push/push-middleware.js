let push = require('./../file/push')
let cache = require('./../file/cache')

let warmPublicCache = require('./warm-public-cache')
warmPublicCache()
let warmAppCache = require('./warm-app-cache')
warmAppCache()

function pushMiddleware(req, res, next) {
  if (req.url.endsWith('.map') || req.url.startsWith('/stream')) {
    return next()
  }
  let links = cache.getAll('links')
  console.log('push links')
  return Promise.all(
    Object.keys(links).map(link => {
      if (link.endsWith('index.html')) {
        return
      }
      push(res, link, links[link]['file'], links[link]['type'])
    })
  ).then(pushed => next())
}

module.exports = pushMiddleware
