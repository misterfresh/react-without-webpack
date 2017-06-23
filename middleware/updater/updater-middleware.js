let chokidar = require('chokidar');
let path = require('path')
let serverStart = Date.now()

function updater(req, res, next){
    res.sseSetup = function() {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
        serverStart = Date.now()
        chokidar.watch( path.join(process.cwd(), 'app'), {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
            if(Date.now() - serverStart > 2000){
                res.write("data: " + JSON.stringify({event,path}) + "\n\n")
            }
        })
    }

    next()
}

module.exports = updater
