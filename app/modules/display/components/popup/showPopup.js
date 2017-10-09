import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as displayActions from 'display/actionCreators'
import { getPopupsVisibility } from 'display/selectors'

import Popup from 'components/popup/popup'

class ShowPopup extends Component {
  render() {
    let { popup, popupsVisible, hidePopup, children } = this.props

    return (
      <Popup
        visible={popupsVisible.get(popup)}
        close={() => hidePopup(popup)}
        size="auto"
      >
        {children}
      </Popup>
    )
  }
}

function mapStateToProps(state) {
  return {
    popupsVisible: getPopupsVisibility(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...displayActions
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPopup)
