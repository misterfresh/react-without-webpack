let User = require('models/user')
let Response = require('response')

function authMiddleware(req, res, next) {
  if (req.url === '/user/get_session') {
    return next() || 'session'
  }

  if (!req.token) {
    return Response.forbidden(req, res, {
      message: 'unauthorized request'
    })
  }

  if (req.cookies) {
    console.log(req.cookies)
  }

  return User.verify(req.token)
    .then(verifiedToken => {
      req.user = verifiedToken.body
      console.log('usr', req.user)
      return next() || 'auth'
    })
    .catch(error => {
      console.log('token invalid')
      return Response.forbidden(req, res, {
        message: 'invalid token',
        error
      })
    })
}

module.exports = authMiddleware
