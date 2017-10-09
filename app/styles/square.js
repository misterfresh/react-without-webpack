import { StyleSheet } from 'aphrodite'

let square = StyleSheet.create({
  grid: {
    display: 'grid',
    gridTemplateAreas: `"title title"
												"topLeft topRight"
												"bottomLeft bottomRight"`,
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto 100px 100px'
  },
  title: {
    gridArea: 'title',
    marginBottom: 0
  },
  topLeft: {
    gridArea: 'topLeft'
  },
  topRight: {
    gridArea: 'topRight'
  },
  bottomLeft: {
    gridArea: 'bottomLeft'
  },
  bottomRight: {
    gridArea: 'bottomRight'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

export default square
