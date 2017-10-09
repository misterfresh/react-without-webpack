import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { pure } from 'recompose'

import Page from 'components/layout/page/page'
import BlueLink from 'components/links/blueLink'
import CreateJobButton from 'job/components/buttons/createJobButton'
import SpreadersBlock from 'components/blocks/spreadersBlock'
import JobsBlock from 'job/components/blocks/jobsBlock'
import ApplicationsBlock from 'components/blocks/applicationsBlock'
import SelectedJobs from 'job/components/blocks/selectedJobs'

let JobSearch = ({}) => (
  <Page title="Job Search">
    <div className={css(styles.content)}>
      <div className={css(styles.highlighted)}>
        <BlueLink>Job search</BlueLink>
        <CreateJobButton>Add a job</CreateJobButton>
      </div>
      <div className={css(styles.sidebar)}>
        <ApplicationsBlock />
      </div>
      <div className={css(styles.main)}>
        <div className={css(styles.dashboard)}>
          <div className={css(styles.dbtitle)}>
            <h2>Dashboard</h2>
            <p>Welcome to Tellnspread admin panel</p>
          </div>
          <div className={css(styles.spread)}>
            <SpreadersBlock />
          </div>
          <div className={css(styles.myjob)}>
            <JobsBlock />
          </div>
          <div className={css(styles.application)}>
            <ApplicationsBlock />
          </div>
          <div className={css(styles.stitle)}>
            <h2>Spread these jobs</h2>
            <p>
              if one of your spreaders is reruited, earn the indicated amount
            </p>
          </div>
          <SelectedJobs classes={[styles.jobs]} />
        </div>
      </div>
    </div>
  </Page>
)

export default pure(JobSearch)

let styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateAreas: `"highlighted highlighted highlighted"
												"sidebar main main"`,
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto'
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
  dashboard: {
    display: 'grid',
    gridTemplateAreas: `"dbtitle dbtitle dbtitle"
                        "spread myjob application"
                        "stitle stitle stitle"
                        "jobs jobs jobs"`,
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto 1fr auto 1fr',
    gridGap: '10px',
    backgroundColor: 'white',
    height: '100%'
  },
  dbtitle: {
    gridArea: 'dbtitle',
    backgroundColor: 'lightgrey'
  },
  spread: {
    gridArea: 'spread',
    backgroundColor: 'lightgrey'
  },
  myjob: {
    gridArea: 'myjob',
    backgroundColor: 'lightgrey'
  },
  application: {
    gridArea: 'application',
    backgroundColor: 'lightgrey'
  },
  stitle: {
    gridArea: 'stitle',
    backgroundColor: 'lightgrey'
  },
  jobs: {
    gridArea: 'jobs',
    backgroundColor: 'lightgrey'
  }
})
