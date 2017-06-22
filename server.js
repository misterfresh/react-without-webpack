let express = require('express')
let babel = require('babel-core')
let path = require('path')
let folder = process.cwd()

const http2 = require('spdy')
const logger = require('morgan')
const fs = require('fs')

const options = {
	key: fs.readFileSync('./certificates/server.key'),
	cert: fs.readFileSync('./certificates/server.crt')
}

let transformMiddleware = require('./transform-middleware/transform-middleware')

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

server.use(transformMiddleware)

server.get('/', function(req, res, next){
	res.sendFile(folder + '/public/index.html')
})

server.use(express.static(path.join(folder,'public')))

http2
	.createServer(options, server).listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
})
