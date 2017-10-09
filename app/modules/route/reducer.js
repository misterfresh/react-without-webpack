import { LOCATION_CHANGE } from './actionTypes'
import { fromJS, Map } from 'immutable'

const initialState = fromJS({
  location: null
})

export default function route(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: fromJS(action.payload)
      })

    default:
      return state
  }
}
