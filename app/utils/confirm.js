import ConfirmPopup from 'components/Popup/ConfirmPopup'

const confirm = function(
  event, action, options, abort = null
) {

  event.preventDefault()
  event.stopPropagation()

  let {title, message, confirmLabel, abortLabel, style} = options

  let wrapper = document.body.appendChild(document.createElement('div'))
  let cleanup = function() {
    ReactDOM.unmountComponentAtNode(wrapper)
    return setTimeout(function() {
      return wrapper.remove()
    })
  }

 ReactDOM.render(
    <ConfirmPopup
      title={title}
      action={action}
      abort={abort}
      message={message}
      confirmLabel={confirmLabel}
      abortLabel={abortLabel}
      close={cleanup}
      style={style}
    />, wrapper
  )

}

export default confirm
