let source = new EventSource("stream")

source.addEventListener('message', function (event) {
    window.location.reload(true)
}, false)
