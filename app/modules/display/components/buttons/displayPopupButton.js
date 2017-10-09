import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as displayActions from 'display/actionCreators'

import NavLink from 'components/links/navLink'

class DisplayPopupButton extends PureComponent {
  render() {
    let {
      showPopup,
      hidePopup,
      togglePopup,
      popup,
      action = 'toggle',
      title = '',
      classes = [],
      Component = NavLink,
      children = 'title'
    } = this.props

    return (
      <Component
        title={title}
        action={() => {
          switch (action) {
            case 'show':
              showPopup(popup)
              break

            case 'hide':
              hidePopup(popup)
              break

            case 'toggle':
            default:
              togglePopup(popup)
              break
          }
        }}
        classes={[...classes]}
      >
        {children}
      </Component>
    )
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

export default connect(() => ({}), mapDispatchToProps)(DisplayPopupButton)
