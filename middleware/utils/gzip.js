let zlib = require('zlib')

function gzip(file){
	return new Promise((resolve, reject)=> {
		zlib.gzip(file, function(err, gzipped){
			if(err){
				return reject(err)
			}
			return resolve(gzipped)
		})
	})
}

module.exports = gzip