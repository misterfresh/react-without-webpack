import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import blocks from 'styles/blocks'

let HeaderBlock = ({ children }) => (
  <header className={css(blocks.outline, styles.header)}>{children}</header>
)

export default HeaderBlock

let styles = StyleSheet.create({
  header: {
    background: '#212121',
    height: 70,
    gridArea: 'header',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
