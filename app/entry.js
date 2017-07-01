import React from 'react'
import ReactDOM from 'react-dom'

import {browserHistory} from 'react-router'

import {fromJS} from 'immutable'

import { syncHistoryWithStore } from 'react-router-redux';

import routes from 'routes/Routes'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'

let initialState = {}

const store = configureStore(fromJS(initialState))

const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState (state) {
		return state.get('route').toJS();
	}
})

ReactDOM.render(
	<Root store={store} history={history} routes={routes} />,
	document.getElementById('root')
)


