import React from 'react'
import './index.css'

function Register() {
	return (
		<div className='reg-layout'>
			<div className='reg-main-layout'>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Name</p>
					</div>
					<input type="text" className='reg-field-input' />
				</div>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Email</p>
					</div>
					<input type="text" className='reg-field-input' />
				</div>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Password</p>
					</div>
					<input type="text" className='reg-field-input' />
				</div>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Confirm Password</p>
					</div>
					<input type="text" className='reg-field-input' />
				</div>

			</div>
			<div >
				<button className='reg-btn'>
				Sign-Up
				</button>
			</div>
		</div>
	)
}

export default Register