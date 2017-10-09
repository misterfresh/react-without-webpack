let path = require('path')
let read = require('./../file/read')
let gzip = require('./../file/gzip')
let cache = require('./../file/cache')
let list = require('./../file/list')
let getContentType = require('./../file/get-content-type')

let publicFolder = path.join(process.cwd(), 'public')

function warmPublicCache() {
  return list(
    `${publicFolder}/**/*.@(js|png|jpg|css|eot|svg|ttf|woff|woff2|ico|html)`,
    {}
  )
    .then(files =>
      Promise.all(
        files.map(file => {
          let replaced = file.replace(/\\/gi, '/')
          let link = replaced.split('public')[1]

          return read(file)
            .then(data => gzip(data))
            .then(gzipped =>
              cache.set('links', link, {
                file: gzipped,
                type: getContentType(link)
              })
            )
        })
      )
    )
    .then(warmed => console.log('warmed public'))
}

module.exports = warmPublicCache
