import React from 'react'
import { StyleSheet, css } from 'aphrodite'

let ExternalLink = ({
  title,
  link,
  style = {},
  classes = [],
  children = 'title',
  property = '',
  value = ''
}) => (
  <a
    className={
      classes.filter(classe => typeof classe === 'string').join(' ') +
      ' ' +
      css(
        styles.external,
        ...classes.filter(classe => typeof classe !== 'string')
      )
    }
    href={link ? link : '#'}
    style={style}
    title={title}
    data-property={property}
    data-value={value}
  >
    {children}
  </a>
)

export default ExternalLink

let styles = StyleSheet.create({
  external: {}
})
