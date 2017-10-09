import React from 'react'

import App from 'main/containers/app'
import Home from './home/home'
import Dashboard from './dashboard/dashboard'

import NoMatch from 'main/containers/noMatch'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/*',
    component: NoMatch
  }
]