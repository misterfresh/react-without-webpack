import React from 'react'
import { hydrate } from 'react-dom'

import { createBrowserHistory } from 'history'
import { StyleSheet } from 'aphrodite'
import { fromJS } from 'immutable'

import routerMiddleware from 'route/middleware'

import Root from 'main/containers/root'
import configureStore from 'main/store/configureStore'

let initialState = window._INITIAL_STATE_ || {}
let history = createBrowserHistory()

const store = configureStore(fromJS(initialState), routerMiddleware(history))

StyleSheet.rehydrate(window.renderedClassNames)

hydrate(
	<Root store={store} history={history} />,
  document.getElementById('root')
)

delete window._INITIAL_STATE_
delete window.renderedClassNames


