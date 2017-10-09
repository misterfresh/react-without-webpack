import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { pure } from 'recompose'

import PopupContainer from './popupContainer'

let Popup = ({ size = 'small', visible, close, classes = [], children }) => (
  <PopupContainer close={close} visible={visible} size={size}>
    <div
      className={css(styles.popup, ...classes)}
      onClick={event => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {children}
    </div>
  </PopupContainer>
)

export default pure(Popup)

let styles = StyleSheet.create({
  popup: {
    gridArea: 'popup'
  }
})
