import {
  SET_ACTIVE_MAIN_LINK
} from 'constants/constants'

export function setActiveMainLink(key) {
	return {
		type: SET_ACTIVE_MAIN_LINK,
		key
	}
}
