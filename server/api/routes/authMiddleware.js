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
      if (['PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        let parts = req.url.split('/')
        let resourceId = parts[parts.length - 1]
        let resourceType = parts[parts.length - 2]
        console.log(
          'auth method',
          req.method,
          'resource',
          resourceType + ':' + resourceId
        )
        return User.author(resourceType + ':' + resourceId).then(authorId => {
          console.log('res author', authorId, 'current author', req.user.id)
          if (authorId !== req.user.id) {
            return Response.forbidden(req, res, {
              message: 'not the owner'
            })
          } else {
            return next() || 'authorized'
          }
        })
      } else {
        return next() || 'no edit'
      }
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
