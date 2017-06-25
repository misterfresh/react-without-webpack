let Promise = require('bluebird')

let path = require('path')
let fileLastModifiedHash = require('./../transform/file-last-modified-hash')
let transpile = require('./../utils/transpile')
let gzip = require('./../utils/gzip')
let cache = require('./../utils/cache')
let resolveToUrl = require('./../transform/resolveToUrl')
let conf = JSON.parse(require('fs').readFileSync(
	path.join(process.cwd(), '.babelrc'), 'utf-8')
)
conf.babelrc = false
conf.plugins = [[resolveToUrl]]

function update(file){
	return Promise.all([
		fileLastModifiedHash(file),
		transpile(file, conf).then(
			transpiled => gzip(transpiled)
		)
	]).spread(
		(hash, gzipped) => {
			cache.saveHash(file.replace(/\\/gi, '/'), hash)
			cache.save(hash, gzipped)
		}
	)
}

module.exports = update