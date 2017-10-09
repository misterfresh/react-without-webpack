import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let DisabledLink = ({
  title,
  classes = [],
  style = {},
  Component = 'span',
  children = 'title',
  property = '',
  value = ''
}) => (
  <Component
    className={
      classes.filter(classe => typeof classe === 'string').join(' ') +
      ' ' +
      css(
        styles.disabled,
        ...classes.filter(classe => typeof classe !== 'string')
      )
    }
    style={style}
    title={title}
    data-property={property}
    data-value={value}
  >
    {children}
  </Component>
)

export default DisabledLink

let styles = StyleSheet.create({
  disabled: {}
})
