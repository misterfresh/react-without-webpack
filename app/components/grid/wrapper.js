import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let Wrapper = ({ children }) => (
  <div className={css(styles.wrapper)}>{children}</div>
)

export default Wrapper

let styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  }
})
