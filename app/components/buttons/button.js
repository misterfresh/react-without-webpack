import React from 'react'
import { pure } from 'recompose'

import BaseLink from 'components/links/baseLink'
import buttons from 'styles/buttons'

let Button = ({
  title,
  link,
  style,
  classes = [],
  action,
  Component = 'button',
  children = 'title'
}) => (
  <BaseLink
    title={title}
    link={link}
    classes={[buttons.base, buttons.blue, ...classes]}
    style={style}
    action={action}
    Component={Component}
  >
    {children}
  </BaseLink>
)

export default pure(Button)
