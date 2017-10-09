import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, css } from 'aphrodite'

import { isLogged } from 'user/selectors'

import Page from 'components/layout/page/page'

class Dashboard extends Component {
  static readyOnActions(dispatch) {
    return Promise.all([
    ])
  }

  componentDidMount() {
    Dashboard.readyOnActions(this.props.dispatch)
  }
  render() {
    let { logged } = this.props

    return <Page title="Dashboard">
      <h2>Dashboard</h2>
    </Page>
  }
}

function mapStateToProps(state) {
  return {
    logged: isLogged(state)
  }
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    { dispatch }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)