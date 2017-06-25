import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'

//throw new Error('done')

export default class Root extends Component {
	render() {
		const {store, history, routes} = this.props
		return <Provider store={store}>
      <div>
        <Router history={history} routes={routes} key={Math.random()}/>
      </div>
    </Provider>
	}
}