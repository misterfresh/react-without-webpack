import { StyleSheet } from 'aphrodite'

let grid = StyleSheet.create({
  full: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  threeCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  twoCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
})

export default grid
