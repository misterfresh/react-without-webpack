let babel = require('babel-core')
let cacheMap = {}
let hashMap = {}
let zlib = require('zlib')

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
				babel.transformFile(src, conf, function (err, transpiled) {
					if(err){
						return res.status(500).send('Error transpiling')
					}
					zlib.gzip(transpiled.code, function(err, gzipped){
						if(err){
							return res.status(500).send('Error gzipping')
						}
						sendTranspiled(res, gzipped)
						hashMap[src]=lastModifiedHash
						cacheMap[lastModifiedHash] = gzipped
					})
				})
			}
		}
	)
}

module.exports = transformFile