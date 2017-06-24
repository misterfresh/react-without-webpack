let source = new EventSource("stream")

source.addEventListener('message', function (event) {
    console.log('updating!',event.data)
    window.location.reload(true)
}, false)
