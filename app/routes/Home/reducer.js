import {
  SET_ACTIVE_SLIDE
} from 'constants/constants'

const initialState = fromJS({
  activeSlideId: 0
})

export default function home(state = initialState, action) {

  switch(action.type){

    case SET_ACTIVE_SLIDE:
      return state.set('activeSlideId', parseInt(action.slideId))

    default:
      return state

  }
}