let fs = require('fs')
let path = require('path')
let file = path.join(
  process.cwd(),
  'node_modules/spdy-transport/lib/spdy-transport/priority.js'
)

let data = fs
  .readFileSync(file)
  .toString()
  .split('\n')
if (data.length < 190) {
  data.splice(73, 0, '/*')
  data.splice(75, 0, '*/')
  data.splice(
    187,
    0,
    `
	var index = utils.binarySearch(this.list, node, compareChildren);
 	this.list.splice(index, 1);
`
  )
  let text = data.join('\n')

  fs.writeFile(file, text, function(err) {
    if (err) return console.log(err)
  })
}

file = path.join(process.cwd(), 'node_modules/aphrodite/lib/index.js')
data = fs.readFileSync(file).toString()
fs.writeFile(
  file,
  data.split('var useImportant = true;').join('var useImportant = false;'),
  function(err) {
    if (err) return console.log(err)
  }
)

file = path.join(process.cwd(), 'node_modules/react/cjs/react.development.js')
data = fs.readFileSync(file).toString()
fs.writeFile(
  file,
  data.split(`var objectAssign$1 = require('object-assign');`).join('').split('objectAssign$1').join('Object.assign'),
  function(err) {
    if (err) return console.log(err)
  }
)

file = path.join(process.cwd(), 'node_modules/react-dom/cjs/react-dom.development.js')
data = fs
  .readFileSync(file)
  .toString()
  .split('\n')
if (data.length > 17215) {
  let text = data.slice(16, 17219).join('\n')

  fs.writeFile(file, text, function(err) {
    if (err) return console.log(err)
  })
}
