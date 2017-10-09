import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { pure } from 'recompose'
import grid from 'styles/grid'

let PopupContainer = ({ size = 'small', close, visible, children }) => (
  <div
    onClick={close}
    className={css(grid.full, styles.dark, styles.popup, styles[size])}
    style={{
      position: 'fixed',
      display: visible ? 'grid' : 'none'
    }}
  >
    {children}
  </div>
)

export default pure(PopupContainer)

let styles = StyleSheet.create({
  dark: {
    background: 'rgba(0,0,0,.4)'
  },
  popup: {
    display: 'grid',
    zIndex: 50,
    gridTemplateAreas: `"a a a"
												"b popup c"
												"d d d"`
  },
  small: {
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr'
  },
  medium: {
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateRows: '1fr 2fr 1fr'
  },
  large: {
    gridTemplateColumns: '1fr 3fr 1fr',
    gridTemplateRows: '1fr 3fr 1fr'
  },
  auto: {
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateRows: '1fr auto 1fr'
  }
})
