let path = require('path')
let push = require('./../utils/push')
let cache = require('./../utils/cache')

let warmVendors = require('./warm-vendors')
warmVendors()

function pushVendors(req, res, next){
	if(req.url.endsWith('.map') || req.url.startsWith('/stream')){
		return next()
	}
	return Promise.all(cache.retrieve('vendors').map(
		link => {
			//console.log('vendor', link)
			push(res,  '/' + link, cache.retrieve(link)['file'], cache.retrieve(link)['type'])
		}
	)).then(
		pushed => next()
	)
}

module.exports = pushVendors