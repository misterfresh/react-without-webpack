let { Helmet } = ReactHelmet
let {bindActionCreators} = Redux
let {connect} = ReactRedux

import * as DashboardActions from './actions'

class Dashboard extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
    ]);
  }

  constructor(props){
    super(props)
  }

  componentDidMount() {
    let { dispatch, dashboardActions} = this.props
    Dashboard.readyOnActions(dispatch)

  }

  render(){
    let {
			dashboardActions,
			activeSlideId
    } = this.props
    return <div>
      <Helmet
        title={'Dashboard'}
        meta={[ {'name': 'Dashboard', 'content': "Dashboard"} ]}
      />
      <div>dashboard{activeSlideId}</div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    activeSlideId: state.getIn(['dashboard', 'activeSlideId'])
  }
}

function mapDispatchToProps(dispatch){
    return {
        dashboardActions: bindActionCreators(DashboardActions, dispatch),
        dispatch
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
