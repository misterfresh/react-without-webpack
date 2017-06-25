let path = require('path')
let open = require('./../utils/open')
let gzip = require('./../utils/gzip')
let cache = require('./../utils/cache')

let getContentType = require('./get-content-type')
let getFileLinks = require('./get-file-links')

let publicFolder = path.join(process.cwd(), 'public')

function warmPublioCache(source){
	return open(source, "utf8").then(
		index => {
			let links = getFileLinks(index)
			cache.save('public', links)

			return Promise.all(links.map(
				link => {
					let linkPath = path.join(publicFolder, link)

					return open(linkPath).then(
						file => gzip(file)
					).then(
						zipped => cache.save(link, {
							file: zipped,
							type: getContentType(link)
						})
					)
				}
			)).then(
				warmed => cache.save('index', {
					file: index,
					type: 'text/html'
				})
			)
		}
	)
}

module.exports = warmPublioCache