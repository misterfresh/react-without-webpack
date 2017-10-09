import { StyleSheet } from 'aphrodite'

let buttons = StyleSheet.create({
  base: {
    display: 'block',
    width: '100%',
    padding: '.5rem .75rem',
    fontSize: '1rem',
    lineHeight: '1.25',
    color: '#464a4c',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,.15)',
    borderRadius: '.25rem',
    transition:
      'border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
    marginBottom: 10
  }
})

export default buttons
