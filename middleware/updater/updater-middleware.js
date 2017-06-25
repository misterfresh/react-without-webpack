let chokidar = require('chokidar');
let path = require('path')
let serverStart = Date.now()

let update = require('./../utils/update')

function updater(req, res, next){
	res.sseSetup = function() {
		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		})
		serverStart = Date.now()
		chokidar.watch( path.join(process.cwd(), 'app'), {ignored: /(^|[\/\\])\../}).on('all', (event, filePath) => {
			if(Date.now() - serverStart > 2000){

				return update(filePath).then(
					updatedCache => {
						let fileUri = filePath.split(process.cwd())[1]
						fileUri = fileUri.replace(/\\/gi, '/')
						console.log(fileUri)
						res.write("data: " + fileUri + "\n\n")
					}
				)
			}
		})
	}

	next()
}

module.exports = updater
