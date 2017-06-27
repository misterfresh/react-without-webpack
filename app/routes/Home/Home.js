import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import {Link} from 'react-router'
import Chart from 'components/Graph/Chart'

import * as HomeActions from './actions'

class Home extends Component {

	static readyOnActions(dispatch) {
		return Promise.all([
		])
	}

	constructor(props){
    super(props)
  }

  componentDidMount() {
    let { dispatch, homeActions} = this.props
    Home.readyOnActions(dispatch)
  }

  render(){
    let {
      homeActions,
			activeSlideId
    } = this.props


		let data = {
			"Configuring Webpack": 40,
			"Waiting for Webpack to build": 35,
			"Actually writing code and shipping apps": 25
		}

    return <div>
      <Helmet
        title={'Welcome'}
        meta={[ {'name': 'description', 'content': "Welcome"} ]}
      />

      <div>Seems to work!</div>
			<p>Be sure to check out the network tab of developer tools.</p>
			<Link to="dashboard">Go to a different page to see routing at work.</Link>
			<br/><br/><br/><br/>
			<h3>Front-end developers time breakdown (%)</h3>
			<Chart
				type={"pie"}
				width={300}
				height={300}
				showTooltips={true}
				data={data}
			/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    activeSlideId: state.getIn(['home', 'activeSlideId'])
  }
}

function mapDispatchToProps(dispatch){
  return {
    homeActions: bindActionCreators(HomeActions, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
