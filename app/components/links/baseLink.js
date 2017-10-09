import React from 'react'
import { pure } from 'recompose'

import ActionLink from './base/actionLink'
import DisabledLink from './base/disabledLink'
import ExternalLink from './base/externalLink'
import InternalLink from './base/internalLink'

let BaseLink = ({
  title,
  link,
  style = {},
  classes = [],
  action,
  Component,
  children = 'title',
  property = '',
  value = ''
}) => {
  if (action) {
    return (
      <ActionLink
        title={title}
        classes={classes}
        Component={Component}
        action={action}
        style={style}
        property={property}
        value={value}
      >
        {children}
      </ActionLink>
    )
  } else if (link) {
    if (link.startsWith('http')) {
      return (
        <ExternalLink
          title={title}
          classes={classes}
          link={link}
          style={style}
          property={property}
          value={value}
        >
          {children}
        </ExternalLink>
      )
    } else {
      return (
        <InternalLink
          title={title}
          classes={classes}
          link={link}
          style={style}
          property={property}
          value={value}
        >
          {children}
        </InternalLink>
      )
    }
  } else {
    return (
      <DisabledLink
        title={title}
        classes={classes}
        Component={Component}
        style={style}
        property={property}
        value={value}
      >
        {children}
      </DisabledLink>
    )
  }
}

export default pure(BaseLink)
