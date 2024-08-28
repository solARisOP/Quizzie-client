import React from 'react'
import './index.css'

function Login() {
	return (
		<div className='log-layout'>
			<div className='log-main-layout'>

				<div className='log-field-container'>
					<div className='log-full-space'>
						<p className='log-field-name'>Email</p>
					</div>
					<input type="text" className='log-field-input' />
				</div>

				<div className='log-field-container'>
					<div className='log-full-space'>
						<p className='log-field-name'>Password</p>
					</div>
					<input type="text" className='log-field-input' />
				</div>

			</div>
			<div className='log-margin-y'>
				<button className='log-btn'>
					Log-In
				</button>
			</div>
		</div>
	)
}

export default Login