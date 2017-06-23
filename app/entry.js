import routes from 'routes/Routes'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'
let { syncHistoryWithStore } = ReactRouterRedux

let initialState = {}

const store = configureStore(fromJS(initialState))

const history = syncHistoryWithStore(ReactRouter.browserHistory, store, {
	selectLocationState (state) {
		return state.get('route').toJS();
	}
})

ReactDom.render(
	<Root store={store} history={history} routes={routes} />,
	document.getElementById('root')
)
