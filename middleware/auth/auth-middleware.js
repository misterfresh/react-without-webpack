let stackTokenCalls = require('./stack-token-calls')
let conf = require('conf/conf')

function authMiddleware(req, res, next) {
  let parts = req.url.split('.')
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

  res.header('Access-Control-Allow-Origin', conf.front)
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

  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  req.token =
    !!req.cookies && req.cookies[`${conf.name}_token`]
      ? req.cookies[`${conf.name}_token`]
      : false

  return stackTokenCalls(req, ip).spread((user, token) => {

    let options = Object.assign(
      {},
      {
        maxAge: conf.maxAge,
        path: conf.path
      },
      conf.domain && {
        domain: conf.domain
      },
      conf.secure && {
        secure: conf.secure
      },
      conf.httpOnly && {
        httpOnly: conf.httpOnly
      }
    )

    if (token) {
      res.cookie(`${conf.name}_token`, token, options)
    }
    req.user = user.data
    req.token = token
    return next()
  })
}

function readToken(token) {
  let data = {}
  if (token) {
    data = JSON.parse(
      new Buffer(token.split('.')[1], 'base64').toString('ascii')
    )
  } else {
    console.log('no token')
  }
  return data
}

module.exports = authMiddleware
