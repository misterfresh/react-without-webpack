let { Helmet } = ReactHelmet

class NoMatch extends React.Component {

  render() {
    return (
      <div>
        <Helmet title='Not Found' />
        Page was not found
      </div>
    )
  }
}

export default NoMatch;
