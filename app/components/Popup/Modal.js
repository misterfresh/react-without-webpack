import React from 'react'
let Modal = ({children}) =>
  <div>
    <div className='modal-backdrop in' />
    <div
      className='modal in'
      tabIndex='-1'
      role='dialog'
      aria-hidden='false'

      style={{display: 'block'}}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    </div>
  </div>

export default Modal