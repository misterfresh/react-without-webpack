
function push(res, path, file, contentType){
	let stream = res.push( path, {
		status: 200,
		method: 'GET',
		request: {
			accept: '*/*',
			'accept-encoding':'gzip'
		},
		response: {
			'content-type': contentType,
			'content-encoding': 'gzip'
		}
	})
	stream.on('error', function(err) {
		console.log('link', path, 'push error', err)
	})

	stream.end(file)
}

module.exports = push