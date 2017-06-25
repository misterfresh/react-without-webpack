let path = require('path')
let rollup = require('rollup')
let resolve = require('rollup-plugin-node-resolve')
let commonjs = require('rollup-plugin-commonjs')
let replace = require("rollup-plugin-replace")

let pkg = require('./package.json')
let	external = Object.keys(pkg.dependencies || {})
let fs = require('fs')
let Promise = require('bluebird')
let write = Promise.promisify(fs.writeFile)
let unlink = Promise.promisify(fs.unlink)

let vendorsPath = path.join(process.cwd(), 'public/js/vendors')

Promise.all(external.map(
	dependency => {
		let dependencyVariable = dependency.split('-').map(
			part => {
				return (part.charAt(0).toUpperCase() + part.slice(1))
			}
		).join('')
		let specific = `export default ${dependencyVariable};`
		switch (dependency){
			case 'immutable':
				specific = `
					export {default as default} from 'immutable';
					import {default as Temp} from 'immutable';
					let fromJS = Temp.fromJS;
					export {fromJS};
				`
				break
		}
		return {
			dependency,
			text: `
				export *  from '${dependency}';
				import * as ${dependencyVariable} from '${dependency}';
			` + specific
		}
	}
).map(
	module => {
		let dependency = module.dependency
		let vendor = path.join(vendorsPath, module.dependency)
		return write(vendor + '_temp.js', module.text).then(
			written => rollup.rollup({
				entry: vendor + '_temp.js',
				plugins: [
					resolve({
						module: true,
						jsnext: true,
						extensions: [ '.js' ],
						browser: true
					}),
					replace({
						"process.env.NODE_ENV": JSON.stringify("development")
					}),
					commonjs({
						include: [
							'node_modules/**'
						],
						namedExports: {
							'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
							'node_modules/react-dom/index.js': ['render'],
							'node_modules/prop-types/index.js': [ 'bool', 'func', 'object', 'shape', ' array', 'arrayOf', 'oneOfType', 'element', 'string']
						}
					})
				]
			}).then(
				bundle => bundle.write({
					dest: vendor + '.js',
					format: 'es',
					sourceMap: vendor + '.js.map',
					moduleName: module.dependency
				})
			).then(
				bundled => unlink(vendor + '_temp.js').then( removed_temp => console.log('converted', dependency, 'to ES6') )
			)
		)
	}
))
