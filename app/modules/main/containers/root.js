import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ConnectedRouter from 'route/ConnectedRouter'
import { renderRoutes } from 'react-router-config'
import routes from 'routes/routes'

import Wrapper from 'components/grid/wrapper'

let Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Wrapper>
        {renderRoutes(routes)}
      </Wrapper>
    </ConnectedRouter>
  </Provider>
)

export default Root
