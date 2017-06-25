let path = require('path')
let push = require('./../utils/push')
let cache = require('./../utils/cache')

let publicFolder = path.join(process.cwd(), 'public')
let source = path.join(publicFolder, "index.html")

let warmPublicCache = require('./warm-public-cache')
warmPublicCache(source)

function pushLink(req, res, next){
	if(req.url.endsWith('.map') || req.url.startsWith('/stream')){
		return next()
	}
	return Promise.all(cache.retrieve('public').map(
		link => {
			if(link === 'index'){
				return
			}
			//console.log(link)
			push(res,  '/' + link, cache.retrieve(link)['file'], cache.retrieve(link)['type'])
		}
	)).then(
		pushed => next()
	)

}

module.exports = pushLink