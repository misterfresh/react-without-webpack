import {
  SET_ACTIVE_MAIN_LINK,
  SHOW_POPUP,
  HIDE_POPUP,
  TOGGLE_POPUP
} from './actionTypes'

export function setActiveMainLink(key) {
  return {
    type: SET_ACTIVE_MAIN_LINK,
    key
  }
}

export function hidePopup(popup) {
  return {
    type: HIDE_POPUP,
    popup
  }
}

export function showPopup(popup) {
  return {
    type: SHOW_POPUP,
    popup
  }
}

export function togglePopup(popup) {
  return {
    type: TOGGLE_POPUP,
    popup
  }
}
