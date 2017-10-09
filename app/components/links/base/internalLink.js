import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import { Link } from 'react-router-dom'
import links from 'styles/links'

let InternalLink = ({
  title,
  link,
  style = {},
  classes = [],
  children = 'title',
  property = '',
  value = ''
}) => (
  <Link
    className={
      classes.filter(classe => typeof classe === 'string').join(' ') +
      ' ' +
      css(
        styles.internal,
        links.noUnderline,
        ...classes.filter(classe => typeof classe !== 'string')
      )
    }
    to={link}
    style={style}
    title={title}
    data-property={property}
    data-value={value}
  >
    {children}
  </Link>
)

export default InternalLink

let styles = StyleSheet.create({
  internal: {}
})
