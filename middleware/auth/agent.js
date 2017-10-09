const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false
})

module.exports = agent
