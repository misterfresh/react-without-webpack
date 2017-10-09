import { StyleSheet } from 'aphrodite'

let links = StyleSheet.create({
  spaced: {
    marginLeft: 15
  },
  noUnderline: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'none'
    }
  },
  blue: {
    color: '#3498db',
    ':hover': {
      color: '#85c6f2'
    }
  },
  white: {
    color: '#fff',
    ':hover': {
      color: '#c3c4ca'
    }
  },
  grey: {
    color: '#ccc',
    ':hover': {
      color: '#c3c4ca'
    }
  }
})

export default links
