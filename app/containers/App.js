import * as DisplayActions from 'actions/display'
import Page from 'components/Layout/Page'

let { Helmet } = ReactHelmet
let { bindActionCreators } = Redux
let {connect} = ReactRedux

class App extends React.Component {

  static readyOnActions(dispatch) {
    return Promise.all([
    ])
  }

  componentDidMount(){
    let {dispatch} = this.props
    App.readyOnActions(dispatch)
  }

  renderPage(){
    let {
      children
    } = this.props

    return <Page>
      {children}
    </Page>
  }

  render(){
    return <div>
      <Helmet
      title={"Demo"}
      titleTemplate={"%s - " + "Demo"}
      meta={[
        {'char-set': 'utf-8'},
        {'name': 'description', 'content': 'Demo'}
      ]}
    />
      {this.renderPage()}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    path: state.getIn(['route','locationBeforeTransitions','pathname'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    displayActions: bindActionCreators(DisplayActions, dispatch),
    dispatch
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
