import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

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

    return <div>
      <Helmet
        title={'Welcome'}
        meta={[ {'name': 'description', 'content': "Welcome"} ]}
      />

      <div>Seems to work</div>
			<h3>Welcome for now</h3>
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
