let chokidar = require('chokidar');
let path = require('path')

function updater(req, res, next){
    res.sseSetup = function() {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
    }

    chokidar.watch( path.join(process.cwd(), 'app'), {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
        res.write("data: " + JSON.stringify({event,path}) + "\n\n");
    })

    next()
}

module.exports = updater
