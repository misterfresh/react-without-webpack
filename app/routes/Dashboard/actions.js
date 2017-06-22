'use strict'

import {
  SET_ACTIVE_JOB_ADS_SLIDE
} from 'constants/constants'

export function setActiveSlide(event){
  return {
    type: SET_ACTIVE_JOB_ADS_SLIDE,
    slideId: event.target.getAttribute('data-slideId')
  }
}