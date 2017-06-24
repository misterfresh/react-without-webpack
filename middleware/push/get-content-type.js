function getContentType(link) {
	let parts = link.split('.')
	let ext = parts[parts.length -1]
	let type = ''
	switch(ext){
		case 'js':
			type = 'application/javascript'
			break

		case 'css':
			type = 'text/css'
			break

		case 'ico':
			type = 'image/x-icon'
			break

		case 'png':
			type = 'image/png'
			break

		case 'jpg':
		case 'jpeg':
			type = 'image/jpeg'
			break

		case 'html':
			type = 'text/html'
			break
	}
	return type
}

module.exports = getContentType