let	dependencies = Object.keys(require('./../../package.json').dependencies)

function resolver (
	{node: {source}}
) {
	if (source !== null) {
		if(dependencies.includes(source.value)){
			//console.log('source', source.value)
			source.value = '/js/vendors/' + source.value
		} else {
			//console.log('source', source.value)
			if(!source.value.startsWith('/') && !source.value.startsWith('./')){
				source.value = '/app/' + source.value
				//console.log('dest', source.value)
			}
		}
	}
}

function resolveToUrl () {
	return {
		visitor: {
			ImportDeclaration: resolver
		}
	}
}

module.exports = resolveToUrl
