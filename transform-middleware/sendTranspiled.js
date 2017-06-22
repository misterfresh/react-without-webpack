function sendTranspiled(res, transpiled, cache = false){
	res.setHeader('Content-type', "application/javascript")
	res.setHeader('Accept-Ranges', "bytes")
	res.setHeader('Cache-Control', "public, max-age=0")
	res.setHeader('Connection', "keep-alive")
	res.append('X-Babel-Cache-Hit', cache)
	res.status(200).send(transpiled)
}

module.exports = sendTranspiled