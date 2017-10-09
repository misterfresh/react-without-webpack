import { StyleSheet } from 'aphrodite'

let buttons = StyleSheet.create({
  base: {
    display: 'inline-block',
    fontWeight: '400',
    lineHeight: '1.25',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    userSelect: 'none',
    border: '1px solid transparent',
    padding: '.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '.25rem',
    transition: 'all .2s ease-in-out'
  },
  blue: {
    color: '#fff',
    backgroundColor: '#0275d8',
    borderColor: '#0275d8',
    ':hover': {
      backgroundColor: '#025aa5',
      borderColor: '#01549b',
      color: '#fff'
    }
  },
  large: {
    padding: '.75rem 1.5rem',
    fontSize: '1.25rem',
    borderRadius: '.3rem'
  },
  block: {
    display: 'block',
    width: '100%'
  }
})

export default buttons
