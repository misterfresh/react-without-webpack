import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { pure } from 'recompose'

import conf from 'conf/conf'
import Page from 'components/layout/page/page'
import Container from 'components/grid/container'
import Row from 'components/grid/row'
import Col from 'components/grid/col'

import BigButton from 'components/buttons/bigButton'
import DisplayPopupButton from 'display/components/buttons/displayPopupButton'
import blocks from 'styles/blocks'
import grid from 'styles/grid'
import LatestJobs from 'job/components/blocks/latestJobs'

let Marketing = ({}) => (
  <Page title="Welcome">
    <div
      className={'jumbotron ' + css(blocks.image)}
      style={{
        backgroundImage: `url('${conf.assets}images/slides/bg1.jpg')`
      }}
    >
      <Container classes={[blocks.light]}>
        <h1 className="display-3">SPREADERS</h1>
        <p>WE OPTIMIZE EVERYONE'S JOB RELATED USE OF SOCIAL NETWORKS</p>
      </Container>
    </div>
    <Container>
      <Row classes={[grid.threeCols]}>
        <Col classes={[blocks.outline]}>
          <h2>RECRUITERS</h2>
          <p>
            Save time and money Source qualified candidates in our Social
            Linkers' networks Monitor your applicants online Reach candidates
            you couldn't have found elsewhere
          </p>
        </Col>
        <Col classes={[blocks.outline]}>
          <h2>SPREADERS</h2>
          <p>
            Become a Social Linker Grow your spreaders community Help your
            network to find new jobs and earn money from it Track your impact on
            your networks in real time!
          </p>
        </Col>
        <Col classes={[blocks.outline]}>
          <h2>CANDIDATES</h2>
          <p>
            Find job ads that you cannot find elsewhere Check your match with
            job ads Always be kept informed on where you are in the selection
            process
          </p>
        </Col>
      </Row>
    </Container>
    <Row>
      <div
        className={css(styles.collection, blocks.image)}
        style={{
          backgroundImage: `url('${conf.assets}images/background/collection-bg.jpg')`
        }}
      >
        <Container classes={[blocks.light]}>
          <h2>Join the community</h2>
          <p className="lead">
            Publish, find or spread jobs on tellnspread.com <br /> the first
            European sharing economy recruitment network!
          </p>
          <br />
          <DisplayPopupButton
            key={'navlink-enter'}
            title={'Connect'}
            popup={'connect'}
            Component={BigButton}
          >
            Join us
          </DisplayPopupButton>
        </Container>
      </div>
    </Row>
    <Row classes={[grid.twoCols]}>
      <Col classes={[blocks.outline]}>
        <h2>19 Countries</h2>
        <p>
          Austria, Belgium, Denmark, Finland, France, Germany, Greece, Hungary,
          Ireland, Italy, Liechtenstein, Luxembourg , Netherlands, Poland,
          Portugal, Spain,Switzerland, Sweden and United-Kingdom
        </p>
      </Col>
      <Col classes={[blocks.outline]}>
        <h2>18 Functions</h2>
        <p>
          Advisory, Banking & Financial Services, Consulting, Engineering &
          Manufacturing, Finance & Accounting, General Management, Healthcare &
          Life Science, Human Resources, Information Technology, Legal,
          Marketing & Communication, Office Support, Oil & Gas, Purchasing,
          Sales, Supply Chain & Procurement, Real Estate & Construction,
          Security & Defence
        </p>
      </Col>
    </Row>
    <LatestJobs />
  </Page>
)

export default pure(Marketing)

let styles = StyleSheet.create({
  collection: {
    padding: '50px 0',
    position: 'relative',
    width: '100%'
  }
})
