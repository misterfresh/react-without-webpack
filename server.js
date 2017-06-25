let express = require('express')
let babel = require('babel-core')
let path = require('path')
let folder = process.cwd()

const http2 = require('spdy')
const logger = require('morgan')
const fs = require('fs')
let cache = require('./middleware/utils/cache')

const options = {
	key: fs.readFileSync('./certificates/server.key'),
	cert: fs.readFileSync('./certificates/server.crt')
}

let transformMiddleware = require('./middleware/transform/transform-middleware')
let updater = require('./middleware/updater/updater-middleware')
let push = require('./middleware/push/push-middleware')

const port = process.env.PORT || 5000
const server = express()

process.on('unhandledRejection', (reason, promise) => {
    if (reason.stack) {
        console.log(reason.stack)
    } else {
        console.log({err: reason, promise: promise})
    }
})

server.use(logger('dev'))
server.use(updater)
server.use(transformMiddleware)

server.get('/stream', function(req, res) {
	res.sseSetup()
})

server.use(push)

server.get('/', function(req, res, next){
	//console.log(cache)
	res.send(cache.retrieve('index')['file'])
})

server.use(express.static(path.join(folder,'public')))

http2
	.createServer(options, server).listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.info('==> 🌎 Listening on port %s. Open up https://localhost:%s/ in your browser.', port, port);
})
