
function pushVendors(req, res, next){
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

module.exports = pushVendors