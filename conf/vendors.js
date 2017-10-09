let path = require('path')
let rollup = require('rollup')
let resolve = require('rollup-plugin-node-resolve')
let commonjs = require('rollup-plugin-commonjs')
let replace = require('rollup-plugin-replace')

let pkg = require('../package.json')
let external = Object.keys(pkg.dependencies || {})
let fs = require('fs')
let Promise = require('bluebird')
let write = Promise.promisify(fs.writeFile)
let unlink = Promise.promisify(fs.unlink)

let vendorsPath = path.join(process.cwd(), 'public/js/vendors')

Promise.all(
  external
    .map(dependency => {
      let dependencyVariable = dependency
        .split('-')
        .map(part => {
          return part.charAt(0).toUpperCase() + part.slice(1)
        })
        .join('')
      let instructions = `
			export *  from '${dependency}';
			import * as ${dependencyVariable} from '${dependency}';
			export default ${dependencyVariable};
		`
      switch (dependency) {
        case 'immutable':
          instructions = `
					import {default as Temp} from 'immutable';
					let fromJS = Temp.fromJS;
					let Map = Temp.Map;
					let OrderedMap = Temp.OrderedMap;
					export {fromJS};
					export {Map};
					export {OrderedMap};
					export default Temp;
				`
          break
        case 'aphrodite':
          instructions = `
					import {default as Temp} from 'aphrodite/no-important';
					let StyleSheet = Temp.StyleSheet;
					let css = Temp.css;
					export {StyleSheet};
					export {css};
					export default Temp;
				`
          break

        case 'lodash.debounce':
          instructions = `
					import debounce from 'lodash.debounce';
					export default debounce;
				`
          break

        case 'react':
          instructions = `
            import {default as Temp} from 'react';       
            let Component = Temp.Component;           
            let PureComponent = Temp.PureComponent;
            let Children = Temp.Children;
            let PropTypes = Temp.PropTypes;
            let createElement = Temp.createElement;
            export {Component}; export {PureComponent}; export {Children}; export {PropTypes}; export {createElement};
            export default Temp;
          `
          break

        case 'react-dom':
          instructions = `
            import {default as Temp} from 'react-dom';
            let render = Temp.render;
            let unmountComponentAtNode = Temp.unmountComponentAtNode;
            let batchedUpdates = Temp.unstable_batchedUpdates;
            let findDOMNode = Temp.findDOMNode;
            let hydrate = Temp.hydrate;
            export {render}; export {unmountComponentAtNode}; export {batchedUpdates}; export {findDOMNode}; export {hydrate};
            export default Temp;
          `
          break

        case 'redux-thunk':
          instructions = `
            import {default as Temp} from 'redux-thunk';
            let Thunk = Temp;
            export default Thunk;
          `
          break

        case `prop-types`:
          instructions = `
            import {default as Temp} from 'prop-types';           
            let node = Temp.node;
            export {node};
            export default Temp;
          `
          break
      }
      return {
        dependency,
        text: instructions
      }
    })
    .map(module => {
      let dependency = module.dependency
      let vendor = path.join(vendorsPath, module.dependency)
      return write(vendor + '_temp.js', module.text).then(written =>
        rollup
          .rollup({
            entry: vendor + '_temp.js',
            plugins: [
              resolve({
                module: true,
                jsnext: true,
                extensions: ['.js'],
                browser: true
              }),
              replace({
                'process.env.NODE_ENV': JSON.stringify('development')
              }),
              commonjs({
                include: ['node_modules/**'],
                namedExports: {
                  'node_modules/react/index.js': [
                    'Children',
                    'Component',
                    'PropTypes',
                    'createElement',
                    'createFactory'
                  ],
                  'node_modules/react-dom/index.js': ['render','hydrate'],
                  'node_modules/prop-types/index.js': [
                    'bool',
                    'func',
                    'object',
                    'shape',
                    ' array',
                    'arrayOf',
                    'oneOfType',
                    'element',
                    'string'
                  ]
                }
              })
            ]
          })
          .then(bundle =>
            bundle.write({
              dest: vendor + '.js',
              format: 'es',
              sourceMap: vendor + '.js.map',
              moduleName: module.dependency
            })
          )
          .then(bundled =>
            unlink(vendor + '_temp.js').then(removed_temp =>
              console.log('converted', dependency, 'to ES6')
            )
          )
      )
    })
)
