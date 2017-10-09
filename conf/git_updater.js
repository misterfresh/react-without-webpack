const fs = require('fs')
const path = require('path')
const https = require('https')
const shell = require('shelljs')
const privateKey = fs.readFileSync(
  path.join(process.cwd(), './conf/staging/certificates/server.key'),
  'utf8'
)
const certificate = fs.readFileSync(
  path.join(process.cwd(), './conf/staging/certificates/server.crt'),
  'utf8'
)

const credentials = { key: privateKey, cert: certificate }

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.get('/updater', function(req, res) {
  //console.log(req.body)
  if (shell.exec('git pull').code !== 0) {
    shell.echo('Error: Git pull failed')
    shell.exit(1)
    res.send('Update failed!')
  } else {
    shell.echo('Success: Git updated')
    //shell.exit(0);
    res
      .status(200)
      .json({ status: 'success', message: 'notification registered' })
  }
})

app.post('/updater', function(req, res) {
  //console.log(req.body)
  if (shell.exec('git pull').code !== 0) {
    shell.echo('Error: Git pull failed')
    shell.exit(1)
    res.send('Update failed!')
  } else {
    shell.echo('Success: Git updated')
    //shell.exit(0);
    res
      .status(200)
      .json({ status: 'success', message: 'notification registered' })
  }
})

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(3000)
