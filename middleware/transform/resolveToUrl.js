let dependencies = Object.keys(require('./../../package.json').dependencies)
let path = require('path')
let plugins = JSON.parse(
  require('fs').readFileSync(path.join(process.cwd(), '.babelrc'), 'utf-8')
).plugins
let moduleResolver = plugins.find(
  plugin => typeof plugin[0] !== 'undefined' && plugin[0] === 'module-resolver'
)
let aliases = moduleResolver[1]['alias']

function resolver({ node: { source } }) {
  if (source !== null) {
    if (dependencies.includes(source.value)) {
      source.value = '/js/vendors/' + source.value
    } else {
      if (!source.value.startsWith('/') && !source.value.startsWith('./')) {
        let alias = source.value.split('/')[0]
        if (typeof aliases[alias] !== 'undefined') {
          //let old = source.value
          source.value =
            aliases[alias]['slice'](1) + source.value.slice(alias.length)
          //console.log('old', old, 'src', source.value)
        } else {
          source.value = '/app/' + source.value
        }
      }
    }
    if (!source.value.endsWith('.js')) {
      source.value += '.js'
    }
  }
}

function resolveToUrl() {
  return {
    visitor: {
      ImportDeclaration: resolver
    }
  }
}

module.exports = resolveToUrl
