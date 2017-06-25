import React from 'react'
import Modal from './Modal'

let ConfirmPopup = ({
	title, message, abortLabel, confirmLabel,
	action, close, abort,
	style
}) =>
	<Modal>
		<div className='modal-header'>
			<h4 className='modal-title'>
				{title}
			</h4>
		</div>
		{message && <div className='modal-body'>
			{message}
		</div>}
		<div className='modal-footer'>
			<div className='text-right'>
				{ typeof abortLabel !== 'undefined' && <button
					type='button'
					className='btn btn-default'
					onClick={() => {
						abort = abort || noop
						close()
						abort()
					}}
					style={Object.assign({},
						(style && typeof style.abortButton !== 'undefined') && style.abortButton
					)}
				>
					{abortLabel}
				</button>}
				{' '}
				{ typeof confirmLabel !== 'undefined' && <button
					type='button'
					className='btn btn-primary'
					onClick={() => {
						close()
						action()
					}}
					style={Object.assign({},
						(style && typeof style.confirmButton !== 'undefined') && style.confirmButton
					)}
				>
					{confirmLabel}
				</button>}
			</div>
		</div>
	</Modal>

export default ConfirmPopup

let noop = param => param
