import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import Home from './Home/Home'

import Dashboard from './Dashboard/Dashboard'

import NoMatch from 'containers/NoMatch'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="*" component={NoMatch} />
  </Route>
)