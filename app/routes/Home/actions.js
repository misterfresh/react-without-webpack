import {
  SET_ACTIVE_SLIDE
} from 'constants/constants'

export function setActiveSlide(event){
  return {
    type: SET_ACTIVE_SLIDE,
    slideId: event.target.getAttribute('data-slideId')
  }
}