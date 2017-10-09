import React from 'react'
import { StyleSheet } from 'aphrodite'

import BaseLink from 'components/links/baseLink'
import links from 'styles/links'

let BlueLink = ({
  title,
  link,
  action,
  Component = 'a',
  classes = [],
  children
}) => (
  <BaseLink
    title={title}
    link={link}
    action={action}
    classes={[links.spaced, links.blue, ...classes]}
    Component={Component}
    children="title"
  >
    {children}
  </BaseLink>
)

export default BlueLink
