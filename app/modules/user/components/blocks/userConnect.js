import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActions from 'user/actionCreators'
import { getUser } from 'user/selectors'

import DisplayPopupButton from 'display/components/buttons/displayPopupButton'
import NavLink from 'components/links/navLink'
import links from 'styles/links'

class UserConnect extends PureComponent {
  constructor(props) {
    super(props)
    this.toggleMenuVisible = this.toggleMenuVisible.bind(this)
    this.state = {
      logoutVisible: false
    }
  }

  toggleMenuVisible() {
    this.setState({
      logoutVisible: !this.state.logoutVisible
    })
  }

  render() {
    let { user, logout } = this.props

    let { logoutVisible } = this.state

    return (
      <div className={css(styles.connect)}>
        {user.get('email') ? (
          <NavLink
            key={'navlink-user'}
            title={user.get('name')}
            classes={[links.blue, styles.user]}
            Component="span"
            action={this.toggleMenuVisible}
          >
            {user.get('name')}
            <div
              className={css(styles.dropdown, logoutVisible && styles.visible)}
            >
              <NavLink
                key={'navlink-user'}
                title="Logout"
                action={logout}
                classes={[links.blue, styles.user]}
                Component="span"
              >
                Logout
              </NavLink>
            </div>
          </NavLink>
        ) : (
          <DisplayPopupButton
            key={'navlink-enter'}
            title={'Connect'}
            popup={'connect'}
            classes={[links.blue]}
          >
            Connect
          </DisplayPopupButton>
        )}
      </div>
    )
  }
}

let styles = StyleSheet.create({
  connect: {
    position: 'relative',
    marginRight: 20
  },
  user: {
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    left: 0,
    display: 'none',
    paddingLeft: 0,
    paddingRight: 2,
    paddingTop: 4,
    paddingBottom: 5,
    borderRadius: 2,
    background: '#333'
  },
  visible: {
    display: 'block'
  }
})

function mapStateToProps(state) {
  return {
    user: getUser(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...userActions
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConnect)
