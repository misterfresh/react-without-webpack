let transformFile = require('./transform-file')
let path = require('path')
let fs = require('fs')

function transformMiddleware(req, res, next){
	if(req.url.startsWith('/app')){
		return transformFile(req, res, {})
	} else {
		return next()
	}
}

module.exports = transformMiddleware