let cache = require('./../utils/cache')
let path = require('path')
let resolveToUrl = require('./resolveToUrl')
let conf = JSON.parse(require('fs').readFileSync(
	path.join(process.cwd(), '.babelrc'), 'utf-8')
)
conf.babelrc = false
conf.plugins.push([resolveToUrl])

let gzip = require('./../utils/gzip')
let transpile = require('./../utils/transpile')

let sendTranspiled = require('./sendTranspiled')
let fileLastModifiedHash = require('./file-last-modified-hash')

function transformFile(req, res){
	let uri = req.url.split("?").shift()
	if(!uri.endsWith('.js')){
		uri += '.js'
	}

	let src = (process.cwd() + uri).replace(/\\/gi, '/')
	//console.log('src', src)
	return fileLastModifiedHash(src).then(
		lastModifiedHash => {
			let lastKnownHash = cache.retrieveHash(src)
			//console.log('known', lastKnownHash, 'mod', lastModifiedHash)
			if (lastKnownHash && lastKnownHash === lastModifiedHash) {
				sendTranspiled(res, cache.retrieve(lastKnownHash), true)
			} else {

				return transpile(src, conf).then(
					transpiled => {
						//console.log('transpiled', transpiled)
						return gzip(transpiled)
					}
				).then(
					gzipped => {
						//console.log('gzipped')
						sendTranspiled(res, gzipped)
						cache.saveHash(src, lastModifiedHash)
						cache.save(lastModifiedHash, gzipped)
						cache.remove(lastKnownHash)
					}
				).catch(
					error => res.status(500).json(error)
				)
			}
		}
	)
}

module.exports = transformFile