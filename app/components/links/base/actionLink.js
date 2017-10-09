import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let ActionLink = ({
  title,
  action,
  style = {},
  classes = [],
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
        styles.action,
        ...classes.filter(classe => typeof classe !== 'string')
      )
    }
    onClick={event => {
      event.preventDefault()
      event.stopPropagation()
      action(event)
    }}
    style={style}
    title={title}
    href={Component === 'a' ? '#' : undefined}
    data-property={property}
    data-value={value}
  >
    {children}
  </Component>
)

export default ActionLink

let styles = StyleSheet.create({
  action: {
    cursor: 'pointer'
  }
})
