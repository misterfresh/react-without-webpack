let transformFile = require('./transform-file')
let path = require('path')
let fs = require('fs')
let appFolder = path.join(process.cwd(), 'app')

let warmAppCache = require('./warm-app-cache')
warmAppCache(appFolder)
let pushTranspiled = require('./push-transpiled')

function transformMiddleware(req, res, next){
	if(req.url === '/'){
		return pushTranspiled(res, next)
	}
	if(req.url.split("?").shift().startsWith('/app')){
		return transformFile(req, res, {})
	} else {
		return next()
	}
}

module.exports = transformMiddleware