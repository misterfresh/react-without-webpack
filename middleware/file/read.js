let Promise = require('bluebird')
let read = Promise.promisify(require('fs').readFile)

module.exports = read
