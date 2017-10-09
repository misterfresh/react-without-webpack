import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let Row = ({ classes = [], children }) => (
  <div className={css(styles.row, ...classes)}>{children}</div>
)

export default Row

let styles = StyleSheet.create({
  row: {
    display: 'flex'
  }
})
