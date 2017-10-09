import React from 'react'
import { StyleSheet } from 'aphrodite'

import NavLink from 'components/links/navLink'

let TitleLink = ({ title, link, action, classes = [], children }) => (
  <NavLink
    title={title}
    link={link}
    action={action}
    classes={[...classes]}
    Component={'h2'}
    children="title"
  >
    {children}
  </NavLink>
)

export default TitleLink
