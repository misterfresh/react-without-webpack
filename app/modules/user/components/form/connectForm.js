import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActions from 'user/actionCreators'
import { getUser, getConnectForm } from 'user/selectors'

import BaseInput from 'components/form/baseInput'
import NavLink from 'components/links/navLink'
import TitleLink from 'components/links/titleLink'
import Button from 'components/buttons/button'
import DisplayPopupButton from 'display/components/buttons/displayPopupButton'
import buttons from 'styles/buttons'
import links from 'styles/links'
import input from 'styles/input'

class ConnectForm extends PureComponent {
  constructor(props) {
    super(props)
    this.updateConnectForm = this.updateConnectForm.bind(this)
  }

  updateConnectForm(property, value) {
    this.props.updateConnectForm(property, value)
  }

  render() {
    let { connectForm, submitConnectForm } = this.props
    return (
      <form className={css(styles.form)}>
        <NavLink
          classes={[
            styles.login,
            !(connectForm.get('mode') === 'login') && links.grey
          ]}
          title="Login"
          active={connectForm.get('mode') === 'login'}
          action={event =>
            this.updateConnectForm(
              event.target.dataset.property,
              event.target.dataset.value
            )}
          Component={'h2'}
          value="login"
          property="mode"
        >
          Login
        </NavLink>
        <NavLink
          classes={[
            styles.register,
            !(connectForm.get('mode') === 'register') && links.grey
          ]}
          title="Register"
          active={connectForm.get('mode') === 'register'}
          action={event =>
            this.updateConnectForm(
              event.target.dataset.property,
              event.target.dataset.value
            )}
          Component={'h2'}
          value="register"
          property="mode"
        >
          Register
        </NavLink>
        <DisplayPopupButton
          popup="connect"
          Component={TitleLink}
          classes={[styles.close, links.grey]}
          title="Close"
        >
          <i className="fa fa-close" />
        </DisplayPopupButton>
        <div className={css(styles.inputs)}>
          <BaseInput
            name="email"
            type="email"
            value={connectForm.get('email')}
            onChange={this.updateConnectForm}
            className={css(input.base, styles.email)}
          />
          <BaseInput
            name="password"
            type="password"
            value={connectForm.get('pass')}
            onChange={this.updateConnectForm}
            className={css(input.base, styles.password)}
            property="pass"
          />
          {connectForm.get('mode') === 'register' && (
            <BaseInput
              name="name"
              value={connectForm.get('name')}
              onChange={this.updateConnectForm}
              className={css(input.base, styles.name)}
            />
          )}
          <Button
            classes={[buttons.block]}
            title={
              connectForm.get('mode') === 'login'
                ? 'Connect'
                : 'Create new account'
            }
            action={submitConnectForm}
          >
            {connectForm.get('mode') === 'login'
              ? 'Connect'
              : 'Create new account'}
          </Button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: getUser(state),
    connectForm: getConnectForm(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm)

let styles = StyleSheet.create({
  login: {
    gridArea: 'login'
  },
  register: {
    gridArea: 'register'
  },
  clear: {
    gridArea: 'clear'
  },
  close: {
    gridArea: 'close'
  },
  form: {
    background: '#fff',
    display: 'grid',
    gridTemplateAreas: `"login register clear close"
												"form form form form"`,
    gridTemplateColumns: '1fr 1fr auto auto',
    gridTemplateRows: 'auto 1fr',
    justifyItems: 'center',
    padding: 10,
    borderRadius: 4,
    position: 'relative'
  },
  email: {
    gridArea: 'email'
  },
  password: {
    gridArea: 'password'
  },
  name: {
    gridArea: 'name'
  },
  inputs: {
    gridArea: 'form',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
})
