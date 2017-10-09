let express = require('express')
let api = express.Router()
let authMiddleware = require('./authMiddleware')
let conf = require('conf/api')

api.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', conf.issuer)
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Request-Id, X-User-Id, Authorization, Cookie'
  )
  res.header('Access-Control-Allow-Credentials', true)

  if (req.method === 'OPTIONS') {
    return res.status(200).send()
  }

  req.token =
    !!req.cookies && req.cookies[`${conf.name}_token`]
      ? req.cookies[`${conf.name}_token`]
      : false
  next()
})

api.use(authMiddleware)

api.use('/:entity', (req, res, next) =>
  require(`./${req.params.entity}`)(req, res, next)
)

module.exports = api
