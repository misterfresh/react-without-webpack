let push = require('./../utils/push')
let cache = require('./../utils/cache')
let path = require('path')
let appFolder = path.join(process.cwd(), 'app')

let warmAppCache = require('./warm-app-cache')
warmAppCache(appFolder)

function pushTranspiled(req, res, next) {
	if(req.url.endsWith('.map') || req.url.startsWith('/stream')){
		return next()
	}
	let app = cache.retrieve('app')
	//console.log('app', app)
	return Promise.all(Object.keys(app).map(
		link => {
			//console.log('link', link)
			let src = app[link]
			let hash = cache.retrieveHash(src)
			//console.log('hash', hash)
			let gzipped = cache.retrieve(hash)
			push(res, link, gzipped, 'application/javascript')

		}
	)).then(
		pushed => next()
	)
}

module.exports = pushTranspiled