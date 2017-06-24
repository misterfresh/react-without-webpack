let path = require('path')
let Promise = require('bluebird')
let readFile = Promise.promisify(require("fs").readFile)
let zlib = require('zlib')

let getContentType = require('./get-content-type')
let getFileLinks = require('./get-file-links')

let publicFolder = path.join(process.cwd(), 'public')
let publicCache = {}

function warmCache(source){
	return readFile(source, "utf8").then(
		index => {
			let links = getFileLinks(index)

			return Promise.all(links.map(
				link => {
					let linkPath = path.join(publicFolder, link)

					return readFile(linkPath).then(
						file => new Promise((resolve, reject)=>{
							zlib.gzip(file, function (err, zipped){
									if(err){
										return reject(err)
									}
									return resolve(zipped)
							})
						})
					).then(
						zipped => {
							publicCache[link] = {
								file: zipped,
								type: getContentType(link)
							}
						}
					)
				}
			)).then(
				warmed => {
					publicCache['index'] = {
						file: index,
						type: 'text/html'
					}
					//console.log(publicCache)
					global.publicCache = publicCache
				}
			)
		}
	)
}

module.exports = warmCache