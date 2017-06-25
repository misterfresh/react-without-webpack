import { LOCATION_CHANGE } from 'react-router-redux'
import {fromJS} from 'immutable'

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