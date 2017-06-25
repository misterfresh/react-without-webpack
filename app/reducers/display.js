import {fromJS} from 'immutable'
import {
  SET_ACTIVE_MAIN_LINK
} from 'constants/constants'

const initialState = fromJS({
  popupVisible: false,
  isFetching: false
})

export default function display(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MAIN_LINK:
      return state

    default:
      return state
  }
}
