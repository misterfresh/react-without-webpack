let glob = require('glob')
let update = require('./../utils/update')
let cache = require('./../utils/cache')

function globPromise(pattern, options){
	return new Promise((resolve, reject)=>{
		glob(pattern, options, function(err, files){
			if(err){
				return reject(err)
			}
			return resolve(files)
		})
	})
}

function warmAppCache(folder){
	return globPromise(`${folder}/**/*.js`, {})
		.then(
			files => {
				let app = {}
				files.forEach(
					file => {
						let replaced = file.replace(/\\/gi, '/')
						let link = '/app/' + replaced.split('/app/')[1]
						link = (link.endsWith('index.js') || link.endsWith('entry.js')) ? link : link.slice(0,-3)
						app[link] = replaced
					}
				)
				cache.save('app', app)
				return Promise.all(files.map(
					file => update(file)
				))
			}
		).then(
			warmed => console.log('warmed app')
		)
}

module.exports = warmAppCache