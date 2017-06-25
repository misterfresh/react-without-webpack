let source = new EventSource("stream")
let head = document.getElementsByTagName('head')[0]
let entrySrc = document.getElementById('app-entry').src

source.addEventListener('message', function (event) {
  console.log('updating!', event.data)
	window.location.reload(true)
	let uri = event.data
  let scriptTag = document.getElementById('app-entry')
	head.removeChild(scriptTag)
	ReactDom.default.unmountComponentAtNode(document.getElementById('root'))

	let newScriptTag = document.createElement('script')
  newScriptTag.src = entrySrc + '?' + Date.now() + "&path=" + encodeURIComponent(uri)
  newScriptTag.id = "app-entry"
  newScriptTag.type = "module"
	head.appendChild(newScriptTag)

}, false)
