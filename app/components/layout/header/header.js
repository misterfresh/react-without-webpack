import React, { Component } from 'react'
import { pure } from 'recompose'

import HeaderBlock from './headerBlock'
import NavLink from 'components/links/navLink'
import UserConnect from 'user/components/blocks/userConnect'

let navLinks = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Dashboard',
    link: '/dashboard'
  }
]

let Header = ({}) => (
  <HeaderBlock>
    {navLinks.map((navlink, index) => (
      <NavLink
        key={'navlink-' + index}
        title={navlink.title}
        link={navlink.link}
      >
        {navlink.title}
      </NavLink>
    ))}

    <UserConnect key={'navlink-connect'} />
  </HeaderBlock>
)

export default pure(Header)
