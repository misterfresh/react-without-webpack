import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StyleSheet, css } from 'aphrodite'

import { isLogged } from 'user/selectors'

import Page from 'components/layout/page/page'
import Chart from 'components/graph/chart'

class Home extends Component {
  static readyOnActions(dispatch) {
    return Promise.all([
    ])
  }

  componentDidMount() {
    Home.readyOnActions(this.props.dispatch)
  }
  render() {
    let { logged } = this.props
    let data = {
      "Configuring Webpack": 40,
      "Waiting for Webpack to build": 35,
      "Actually writing code and shipping apps": 25
    }
    return <Page title="Welcome">
      <div>You are { !logged && 'not '}logged in.</div>

        <div>
          <h3>Front-end developers time breakdown (%)</h3>
          <Chart
            type={"pie"}
            width={300}
            height={300}
            showTooltips={true}
            data={data}
          />
        </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
