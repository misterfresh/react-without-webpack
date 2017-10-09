module.exports = Object.assign(
  {},
  require('./conf'),
  require(`./${process.env.MYAPP_ENV}/api.json`)
)
