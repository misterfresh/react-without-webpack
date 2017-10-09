const fs = require('fs')
const path = require('path')

module.exports = {
  key: fs.readFileSync(
    path.join(
      process.cwd(),
      `./conf/${process.env.MYAPP_ENV}/certificates/server.key`
    )
  ),
  cert: fs.readFileSync(
    path.join(
      process.cwd(),
      `./conf/${process.env.MYAPP_ENV}/certificates/server.crt`
    )
  )
}
