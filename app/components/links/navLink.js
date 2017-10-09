import React from 'react'
import { StyleSheet } from 'aphrodite'

import BaseLink from 'components/links/baseLink'
import links from 'styles/links'

let NavLink = ({
  title,
  link,
  active,
  action,
  Component,
  classes = [],
  property = '',
  value = '',
  children
}) => (
  <BaseLink
    title={title}
    link={link}
    action={action}
    classes={[
      links.spaced,
      links.white,
      styles.navLink,
      active && styles.active,
      ...classes
    ]}
    property={property}
    value={value}
    Component={Component}
  >
    {children}
  </BaseLink>
)

export default NavLink

let styles = StyleSheet.create({
  navLink: {
    marginRight: 9
  },
  active: {
    color: '#3498db',
    ':hover': {
      color: '#3498db'
    }
  }
})
