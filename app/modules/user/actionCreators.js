import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  UPDATE_CONNECT_FORM
} from './actionTypes'

import { getConnectForm } from 'user/selectors'

import User from './api'

export function requestUser() {
  return {
    type: REQUEST_USER
  }
}

export function receiveUser(user) {
  console.log(user)
  return {
    type: RECEIVE_USER,
    user,
    receivedAt: Date.now()
  }
}

export function submitConnectForm() {
  return (dispatch, getState) => {
    let connectForm = getConnectForm(getState())
    dispatch(requestUser())
    return (connectForm.get('mode') === 'login'
      ? User.login(connectForm.get('email'), connectForm.get('pass'))
      : User.register(
          connectForm.get('email'),
          connectForm.get('pass'),
          connectForm.get('name')
        )
    )
      .then(response => dispatch(receiveUser(response.data)))
      .catch(error => console.log(error))
  }
}

export function logout() {
  return dispatch => {
    return User.logout()
      .then(response => {
        dispatch({
          type: LOGOUT_USER,
          user: response.data
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

export function updateConnectForm(property, value) {
  return {
    type: UPDATE_CONNECT_FORM,
    property,
    value
  }
}

