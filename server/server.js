let express = require('express')
let path = require('path')
let folder = process.cwd()

const http2 = require('spdy')
const morgan = require('morgan')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let vhost = require('vhost')

process.on('unhandledRejection', (reason, promise) => {
  if (reason.stack) {
    console.log(reason.stack)
  } else {
    console.log({ err: reason, promise: promise })
  }
})

let chokidar = require('chokidar')
const watcher = chokidar.watch([
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'server')
])
watcher.on('ready', function() {
  watcher.on('all', function() {
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]server[\/\\]/.test(id) || /[\/\\]app[\/\\]/.test(id)) {
        delete require.cache[id]
      }
    })
  })
})

let redirect = express()
redirect.use((req, res, next) => {
  if (req.url.includes('.well-known/acme-challenge')) {
    return next()
  }
  if (!req.secure) {
    res.redirect(301, 'https://' + req.hostname + req.url)
  } else {
    next()
  }
})
redirect.use(express.static(path.join(folder, 'public')))
let insecure = require('http')
  .createServer(redirect)
  .listen(80)

const server = express()
let conf = require('conf/conf')
let apibase = require('./api/apibase')
server.use(
  vhost(`api.${conf.domain}`, function(req, res) {
    apibase.emit('request', req, res)
  })
)

let transformMiddleware = require('middleware/transform/transform-middleware')
let updater = require('middleware/updater/updater-middleware')
let pushMiddleware = require('middleware/push/push-middleware')
let authMiddleware = require('middleware/auth/auth-middleware')
server.use(morgan('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(updater)
server.use(transformMiddleware)
server.get('/stream', function(req, res) {
  res.sseSetup()
})
server.use(pushMiddleware)
server.use(authMiddleware)

server.get('*', function(req, res, next) {
  let url = req.url
  let parts = url.split('.')
  let ext = parts[parts.length - 1]
  if (
    !!ext &&
    [
      'map',
      'js',
      'css',
      'ico',
      'eot',
      'woff',
      'png',
      'jpg',
      'svg',
      'html',
      'ttf'
    ].includes(ext)
  ) {
    return next()
  }
  return require('./router')(req, res)
})
server.use(express.static(path.join(folder, 'public')))

const certificates = require('conf/certificates')
const port = process.env.PORT || 443
http2.createServer(certificates, server).listen(port, '0.0.0.0', err => {
  if (err) {
    console.error(err)
    throw err
  }

  console.info(
    `==> 🌎 Listening on port %s. Open up ${conf.front} in your browser.`,
    port
  )
})
