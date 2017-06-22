let babel = require('babel-core')
let cacheMap = {}
let hashMap = {}

let sendTranspiled = require('./sendTranspiled')
let fileLastModifiedHash = require('./file-last-modified-hash')

function transformFile(req, res, conf){
	if(!req.url.endsWith('.js')){
		req.url += '.js'
	}

	let src = process.cwd() + req.url
	fileLastModifiedHash(src).then(
		lastModifiedHash => {
			let lastKnownHash = hashMap[src]
			if (lastKnownHash && lastKnownHash === lastModifiedHash) {
				sendTranspiled(res, cacheMap[lastKnownHash], true)
			} else {
				babel.transformFile(src, conf, function (err, result) {
					if(err){
						console.log(err)
						return res.status(500).send('Error transpiling')
					}
					sendTranspiled(res, result.code)
					hashMap[src]=lastModifiedHash
					cacheMap[lastModifiedHash] = result.code
				})
			}
		}
	)
}

module.exports = transformFile