import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let Container = ({ classes = [], children }) => (
  <div className={css(styles.container, ...classes)}>{children}</div>
)

export default Container

let styles = StyleSheet.create({
  container: {}
})
