import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { fromJS } from 'immutable'
import { StyleSheetServer } from 'aphrodite/no-important'
import Helmet from 'react-helmet'

import routes from 'routes/routes'
import Wrapper from 'components/grid/wrapper'

import uuid from 'utils/uuid'
import configureStore from 'main/store/configureStore'
import routerMiddleware from 'route/middleware'

import html from './html'

function renderComponentWithRoot(store, req) {
  const initialState = store.getState()
  const context = {}
  const InitialView = (<Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <Wrapper>
        {renderRoutes(routes)}
      </Wrapper>
    </StaticRouter>
  </Provider>)

  const data = StyleSheetServer.renderStatic(() =>
    ReactDOM.renderToString(InitialView)
  )
  const head = Helmet.rewind()

  return html(head, data, initialState.setIn(['user', 'token'], '').toJS())
}

function handleError(req, res, error) {
  req.log.error({ err: error })
  res.status(500).send('Internal server error: ' + error.message)
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search)
}

function handleRoute(req, res, branch) {
  console.log('user', req.user, 'token', req.token, 'url', req.url)
  let parts = req.url.split('?')
  let pathname = parts[0]
  let search = typeof parts[1] !== 'undefined' ? parts[1] : ''
  let query = search
    ? JSON.parse(
        '{"' +
          decodeURI(search.replace('+', ' '))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    : {}
  search = search ? '?' + search : ''

  let history = createMemoryHistory()
  const store = configureStore(
    fromJS({
      user: {
        user: req.user,
        token: req.token,
        connectForm: {
          mode: 'login',
          name: '',
          email: '',
          pass: ''
        }
      },
      route: {
        location: {
          pathname,
          search,
          hash: '',
          action: 'POP',
          key: uuid(),
          query
        }
      }
    }),
    routerMiddleware(history)
  )

  Promise.all(branch.filter(
    ({route}) => !!route.component.readyOnActions
  ).map(
    ({route}) => route.component.readyOnActions(store.dispatch)
  )).then(done => res
      .status(200)
      .send(renderComponentWithRoot(store, req))
  )
}

let router = function(req, res) {
  const branch = matchRoutes(routes, req.url)
  if(!!branch.length){
    handleRoute(req, res, branch)
  } else {
    res.status(404).send('Not found')
  }
}

module.exports = router
