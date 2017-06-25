
let cacheMap = {
	public: [],
	app: {},
	vendors: {}
}

let hashMap = {}

function save(key, file){
	cacheMap[key] = file
}

function retrieve(key){
	if (typeof cacheMap[key] !== 'undefined'){
		return cacheMap[key]
	}
	return false
}

function remove(key){
	delete cacheMap[key]
}

function saveHash(key, file){
	hashMap[key] = file
}

function retrieveHash(key){
	if (typeof hashMap[key] !== 'undefined'){
		return hashMap[key]
	}
	return false
}

module.exports = {
	save, retrieve, remove,
	saveHash, retrieveHash
}