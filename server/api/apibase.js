const fs = require('fs')
const path = require('path')
const https = require('https')

let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let compression = require('compression')
let morgan = require('morgan')

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use('/api', function(req, res, next) {
  require('./routes/api')(req, res, next)
})

const credentials = require('conf/certificates')
module.exports = https.createServer(credentials, server)
