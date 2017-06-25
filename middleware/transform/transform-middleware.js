let transformFile = require('./transform-file')

function transformMiddleware(req, res, next){
	if(req.url.split("?").shift().startsWith('/app')){
		return transformFile(req, res, {})
	} else {
		return next()
	}
}

module.exports = transformMiddleware