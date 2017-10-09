import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as displayActions from 'display/actionCreators'

import Wrapper from 'components/grid/wrapper'

class App extends Component {
  static readyOnActions(dispatch) {
    return Promise.all([])
  }

  componentDidMount() {
    App.readyOnActions(this.props.dispatch)
  }

  render() {
    let { children } = this.props

    return (
      <Wrapper>
        <Helmet
          title={'My App'}
          titleTemplate={'%s - ' + 'My App'}
          meta={[
            { 'char-set': 'utf-8' },
            { name: 'description', content: 'My App' }
          ]}
        />
        {children}
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    path: state.getIn(['route', 'locationBeforeTransitions', 'pathname'])
  }
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    bindActionCreators(
      {
        ...displayActions
      },
      dispatch
    ),
    { dispatch }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
