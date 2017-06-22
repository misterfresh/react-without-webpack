let {Provider} = ReactRedux
let {Router} = ReactRouter

//throw new Error('done')

export default class Root extends React.Component {
	render() {
		const {store, history, routes} = this.props
		return <Provider store={store}>
      <div>
        <Router history={history} routes={routes} key={Math.random()}/>
      </div>
    </Provider>
	}
}