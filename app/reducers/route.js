let { LOCATION_CHANGE } = ReactRouterRedux

const initialState = fromJS(
  {
    locationBeforeTransitions: null
  }
)

export default function route(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      })

    default:
      return state
  }
}