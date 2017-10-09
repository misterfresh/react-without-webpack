import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'

import Page from 'components/layout/page/page'
import BlueLink from 'components/links/blueLink'
import DisplayPopupButton from 'display/components/buttons/displayPopupButton'
import Button from 'components/buttons/button'
import AppJob1Block from 'job/components/blocks/appJob1Block'
import AppJob2Block from 'job/components/blocks/appJob2Block'
import AppJob3Block from 'job/components/blocks/appJob3Block'
import ApplicationsBlock from 'components/blocks/applicationsBlock'

let Application = ({}) => (
  <Page title="Application">
    <div className={css(styles.content)}>
      <div className={css(styles.highlighted)}>
        <BlueLink>Job search</BlueLink>
        <DisplayPopupButton popup="job" mode="add" Component={Button}>
          Add a job
        </DisplayPopupButton>
      </div>
      <div className={css(styles.sidebar)}>
        <ApplicationsBlock />
      </div>
      <div className={css(styles.main)}>
        <div className={css(styles.application)}>
          <div className={css(styles.atitle)}>
            <h2>My Applications</h2>

            <p>Welcome to Tellnspread admin panel</p>
          </div>
          <div className={css(styles.mitem1)}>
            <h3>Overview</h3>
          </div>
          <div className={css(styles.mitem2)}>
            <h3>Active</h3>
          </div>
          <div className={css(styles.mitem3)}>
            <h3>Bookmarked</h3>
          </div>
          <div className={css(styles.mitem3)}>
            <h3>Bookmarked</h3>
          </div>
          <div className={css(styles.mitem4)}>
            <h3>Closed</h3>
          </div>
          <div className={css(styles.ablock1)}>
            <h1>10</h1>
            <p>Active Applications</p>
          </div>
          <div className={css(styles.ablock2)}>
            <h1>34</h1>
            <p>Bookmarked Applications</p>
          </div>
          <div className={css(styles.ablock3)}>
            <h1>34</h1>
            <p>Active Applications</p>
          </div>
          <div className={css(styles.trust)}>
            <h1>67 %</h1>
            <p>Your Trustworthy Rate</p>
          </div>
          <div className={css(styles.offt)}>
            <h1>0</h1>
            <p>Off-topic Application</p>
          </div>
          <div className={css(styles.jobs)}>
            <AppJob1Block />
            <AppJob2Block />
            <AppJob3Block />
          </div>
        </div>
      </div>
    </div>
  </Page>
)

export default Application

let styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateAreas: `"highlighted highlighted highlighted"
												"sidebar main main"`,
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '70px auto'
  },
  highlighted: {
    gridArea: 'highlighted',
    background: '#eee',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sidebar: {
    gridArea: 'sidebar',
    background: '#ddd'
  },
  main: {
    gridArea: 'main',
    background: 'grey'
  },
  application: {
    display: 'grid',
    gridTemplateAreas: `"atitle atitle atitle atitle"
                      "mitem1 mitem2 mitem3 mitem4"
                       "ablock1 ablock2 ablock3 ablock4"
                        "jobs jobs jobs trust"
                        "jobs jobs jobs trust"
                        "jobs jobs jobs trust"
                        "jobs jobs jobs offt"
                        "jobs jobs jobs offt"
                        "jobs jobs jobs offt"`,
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'auto auto auto 1fr',
    gridGap: '10px',
    backgroundColor: 'white',
    height: '100%'
  },
  atitle: {
    gridArea: 'atitle',
    backgroundColor: 'lightgrey'
  },
  mitem1: {
    gridArea: 'mitem1',
    backgroundColor: 'lightgrey',
    paddingLeft: '10px',
    textDecoration: 'underline'
  },
  mitem2: {
    gridArea: 'mitem2',
    backgroundColor: 'lightgrey',
    paddingLeft: '10px'
  },
  mitem3: {
    gridArea: 'mitem3',
    backgroundColor: 'lightgrey',
    paddingLeft: '10px'
  },
  mitem4: {
    gridArea: 'mitem4',
    backgroundColor: 'lightgrey',
    paddingLeft: '10px'
  },
  ablock1: {
    gridArea: ' ablock1',
    backgroundColor: 'lightgrey'
  },
  ablock2: {
    gridArea: 'ablock2',
    backgroundColor: 'lightgrey'
  },
  ablock3: {
    gridArea: 'ablock3',
    backgroundColor: 'lightgrey'
  },
  ablock4: {
    gridArea: ' ablock4',
    backgroundColor: 'lightgrey'
  },
  match: {
    gridArea: 'match',
    backgroundColor: 'lightgrey'
  },
  match: {
    gridArea: 'match',
    backgroundColor: 'lightgrey'
  },
  jobs: {
    gridArea: 'jobs',
    backgroundColor: 'lightgrey'
  },
  trust: {
    gridArea: 'trus',
    backgroundColor: 'lightgrey',
    gridRowStart: '4',
    gridColumnStart: '4',
    GridRowEnd: '6',
    GridColumnEnd: '4'
  },
  offt: {
    gridArea: 'offt',
    backgroundColor: 'lightgrey',
    gridRowStart: '7',
    gridColumnStart: '4',
    GridRowEnd: '9',
    GridColumnEnd: '4'
  }
})
