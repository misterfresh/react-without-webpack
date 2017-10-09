import { combineReducers } from 'redux-immutable'

import user from 'user/reducer'
import route from 'route/reducer'
import display from 'display/reducer'

const rootReducer = combineReducers({
  user,
  display,
  route
})

export default rootReducer
