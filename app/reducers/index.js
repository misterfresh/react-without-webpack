'use strict'

let {combineReducers} = ReduxImmutable

import route from './route'
import display from './display'
import home from 'routes/Home/reducer'

import dashboard from 'routes/Dashboard/reducer'

const rootReducer = combineReducers({
  display,
  home,
  dashboard,
  route
})

export default rootReducer