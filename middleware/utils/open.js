let Promise = require('bluebird')
let open = Promise.promisify(require("fs").readFile)

module.exports = open