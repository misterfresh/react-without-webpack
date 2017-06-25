import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from "rollup-plugin-replace";

let pkg = require('./package.json')
let	external = Object.keys(pkg.dependencies || {})
let fs = require('fs')

let vendorsPath = path.join(process.cwd(), 'public/js/vendors/vendors')

let vendors = external.map(
	dependency => {
		let dependencyVariable = dependency.split('-').map(
			part => {
				return (part.charAt(0).toUpperCase() + part.slice(1))
			}
		).join('')

		return `
			import * as ${dependencyVariable} from '${dependency}';
			window.${dependencyVariable} = ${dependencyVariable};
		`
	}).join('') + `
			window.Component = React.Component;
			window.fromJS = Immutable.default.fromJS
		`
fs.writeFileSync(vendorsPath + '_temp.js', vendors)

export default {
	entry: vendorsPath + '_temp.js',
	dest: vendorsPath + '.js',
	sourceMap: vendorsPath + '.js.map',
	moduleName: 'vendors',
	format: 'iife',
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
}
