import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let Col = ({ classes = [], children }) => (
  <div className={css(styles.col, ...classes)}>{children}</div>
)

export default Col

let styles = StyleSheet.create({
  col: {
    flexGrow: 1
  }
})
