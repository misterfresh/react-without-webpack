let apibase = require('./apibase')

apibase.listen(8000, '0.0.0.0', err => {
  if (err) {
    console.error(err)
    throw err
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up https://myapp:%s/ in your browser.',
    8000,
    8000
  )
})
