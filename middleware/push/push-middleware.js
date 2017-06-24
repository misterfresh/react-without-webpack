let path = require('path')
let Promise = require('bluebird')

let publicFolder = path.join(process.cwd(), 'public')
let source = path.join(publicFolder, "index.html")

let warmCache = require('./warm-cache')
warmCache(source)

function push(req, res, next){
	if(req.url.endsWith('.map') || req.url.startsWith('/stream')){
		return next()
	}
	return Promise.all(Object.keys(publicCache).map(
		link => {
			if(link === 'index'){
				return
			}
			let stream = res.push(  '/' + link, {
				status: 200,
				method: 'GET',
				request: {
					accept: '*/*',
					'accept-encoding':'gzip'
				},
				response: {
					'content-type': global.publicCache[link]['type'],
					'content-encoding': 'gzip'
				}
			})
			stream.on('error', function(err) {
				console.log('link', link, 'push error', err)
			})

			stream.end(global.publicCache[link]['file'])
		}
	)).then(
		pushed => next()
	)

}

module.exports = push