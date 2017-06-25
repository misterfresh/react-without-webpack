let push = require('./../utils/push')
let cache = require('./../utils/cache')

function pushTranspiled(res, next) {
	let app = cache.retrieve('app')
	//console.log('app', app)
	return Promise.all(Object.keys(app).map(
		link => {
			console.log('link', link)
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