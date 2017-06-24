function getFileLinks(file){
	let links = []
	file.replace(/href=("|')(.*?)("|')/g, function(a, b, link) {
		links.push(link)
	})
	file.replace(/src=("|')(.*?)("|')/g, function(a, b, link) {
		links.push(link)
	})
	return links.filter(
		link => !link.startsWith('/app')
	)
}

module.exports = getFileLinks