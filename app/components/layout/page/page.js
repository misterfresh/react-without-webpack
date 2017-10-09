import React from 'react'
import { Helmet } from 'react-helmet'
import { StyleSheet, css } from 'aphrodite'

import Header from 'components/layout/header/header'
import ShowPopup from 'display/components/popup/showPopup'
import ConnectForm from 'user/components/form/connectForm'

let Page = ({ title, user, children }) => (
  <div className={css(styles.page)}>
    <Helmet title={title} meta={[{ name: 'description', content: title }]} />
    <Header />
    <div className={css(styles.main)}>{children}</div>
    <ShowPopup popup="connect">
      <ConnectForm />
    </ShowPopup>
  </div>
)

export default Page

let styles = StyleSheet.create({
  page: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    minHeight: '100%',
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateRows: '70px 1fr auto',
    gridTemplateAreas: `"header header header"
												"main main main"
												"footer footer footer"`,
    gridGap: '10px'
  },
  main: {
    gridArea: 'main'
  }
})
