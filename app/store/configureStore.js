let { createStore, applyMiddleware, compose } = Redux
let thunk = ReduxThunk.default

import rootReducer from 'reducers/index.js'

export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk)
		)
	)

	return store
}