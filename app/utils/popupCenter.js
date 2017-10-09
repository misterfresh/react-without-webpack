export default function popupCenter(url, title, w, h) {
  let dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : screen.left
  let dualScreenTop =
    window.screenTop != undefined ? window.screenTop : screen.top

  let width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  let height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  let left = width / 2 - w / 2 + dualScreenLeft
  let top = height / 2 - h / 2 + dualScreenTop
  let newWindow = window.open(
    url,
    title,
    'resizable,alwaysRaised, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}
