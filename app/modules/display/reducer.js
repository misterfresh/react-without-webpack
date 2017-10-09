import { fromJS } from 'immutable'
import {
  SET_ACTIVE_MAIN_LINK,
  SHOW_POPUP,
  HIDE_POPUP,
  TOGGLE_POPUP
} from './actionTypes'

import { RECEIVE_USER } from 'user/actionTypes'

const initialState = fromJS({
  popups: {
    connect: false
  },
  isFetching: false
})

export default function display(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MAIN_LINK:
      return state

    case SHOW_POPUP:
      return state.setIn(['popups', action.popup], true)

    case HIDE_POPUP:
      return state.setIn(['popups', action.popup], false)

    case TOGGLE_POPUP:
      return state.setIn(
        ['popups', action.popup],
        !state.getIn(['popups', action.popup])
      )

    case RECEIVE_USER:
      return state.setIn(['popups', 'connect'], false)

    default:
      return state
  }
}
