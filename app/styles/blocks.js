import { StyleSheet } from 'aphrodite'

let blocks = StyleSheet.create({
  outline: {
    border: '1px solid transparent'
  },
  light: {
    background: 'rgba(0,0,0,0.2)',
    color: '#fff'
  },
  image: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  },
  center: {
    width: '30%',
    margin: 'auto'
  }
})

export default blocks
