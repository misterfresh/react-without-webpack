import Immutable, { Map, fromJS } from 'immutable'

import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  UPDATE_CONNECT_FORM
} from './actionTypes'

export default function user(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return state.set('isFetching', true)

    case RECEIVE_USER:
      return state
        .set('user', state.get('user').merge(fromJS(action.user)))
        .set('isFetching', false)

    case LOGOUT_USER:
      return state
        .set('user', state.get('user').merge(fromJS(action.user)))
        .set('isFetching', false)

    case UPDATE_CONNECT_FORM:
      return state.setIn(['connectForm', action.property], action.value)

    default:
      return state
  }
}

let baseConnectForm = {
  mode: 'login',
  name: '',
  email: '',
  pass: ''
}

const anonymous = {
  isFetching: false,
  authorId: '',
  cas: '',
  created: 0,
  email: '',
  emailVerified: false,
  id: '',
  ip: '',
  name: '',
  organizations: [],
  type: 'user',
  updated: 0
}

const initialState = fromJS({
  user: anonymous,
  token: '',
  connectForm: baseConnectForm
})
