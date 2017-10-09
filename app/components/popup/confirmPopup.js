import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import Popup from './popup'
import Button from 'components/buttons/button'

let noop = param => param
let ConfirmPopup = ({
  title = 'Warning',
  message,
  confirmLabel = 'Ok',
  abortLabel = 'Cancel',
  action,
  close,
  abort,
  style
}) => (
  <Popup
    size="auto"
    visible={true}
    close={() => {
      abort = abort || noop
      close()
      abort()
    }}
  >
    <div className={css(styles.container)}>
      <h4 className="modal-title">{title}</h4>
      {message && (
        <div className="modal-body">
          <p>{message}</p>
        </div>
      )}

      <div className={css(styles.bottom)}>
        {typeof confirmLabel !== 'undefined' &&
          !!confirmLabel && (
            <Button
              action={() => {
                close()
                action()
              }}
              classes={[styles.confirm]}
            >
              {confirmLabel}
            </Button>
          )}
        {typeof abortLabel !== 'undefined' &&
          !!abortLabel && (
            <Button
              action={() => {
                abort = abort || noop
                close()
                abort()
              }}
            >
              {abortLabel}
            </Button>
          )}
      </div>
    </div>
  </Popup>
)

export default ConfirmPopup

let styles = StyleSheet.create({
  container: {
    background: '#fff',
    padding: 10,
    borderRadius: 4,
    minWidth: 500,
    position: 'relative'
  },
  bottom: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  confirm: {
    marginRight: 15
  }
})
