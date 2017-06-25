let path = require('path')
let Promise = require('bluebird')
let list = Promise.promisify(require("fs").readdir)
let gzip = require('./../utils/gzip')
let cache = require('./../utils/cache')
let open = require('./../utils/open')

let vendorsFolder = path.join(process.cwd(), 'public', 'js', 'vendors')

function warmVendors(){
	return list(vendorsFolder).then(
		vendorFiles => {
			//console.log(vendorFiles)
			let links = []
			let vendors = []
			vendorFiles.forEach(
				vendorFile => {
					if(vendorFile.endsWith('.js')){
						vendors.push(path.join(vendorsFolder,vendorFile))
						links.push('js/vendors/' + vendorFile.slice(0,-3))
					}
				}
			)
			//console.log(vendors)
			//console.log(links)
			cache.save('vendors', links)
			return Promise.all(vendors.map(
				(vendor, index) => open(vendor).then(
						file => gzip(file)
					).then(
						zipped => cache.save(links[index], {
							file: zipped,
							type: "application/javascript"
						})
					)
			))
		}
	)
}

module.exports = warmVendors