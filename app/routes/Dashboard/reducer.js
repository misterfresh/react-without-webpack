import {fromJS} from 'immutable'
import {
  SET_ACTIVE_JOB_ADS_SLIDE
} from 'constants/constants'

const initialState = fromJS({
  activeSlideId: 0
})

export default function dashboard(state = initialState, action) {

  switch(action.type){

    case SET_ACTIVE_JOB_ADS_SLIDE:
      return state.set('activeSlideId', parseInt(action.slideId))

    default:
      return state
  }

}