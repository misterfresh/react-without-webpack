let transformFile = require('./transform-file')

function transformMiddleware(req, res, next) {
  if (req.url.startsWith('/app')) {
    return transformFile(req, res, {})
  } else {
    return next()
  }
}

module.exports = transformMiddleware
