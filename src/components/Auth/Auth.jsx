import React from 'react'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import './index.css'

function Auth() {
  return (
    <div className='auth-layout'>
        <div className='auth-top-bar'>
            <div className='auth-flex-container'>
                <div className='auth-margin-y'>
                    <p className='auth-text-large'>QUIZZIE</p>
                </div>
                <div className='auth-btn-flex-container'>
                    <div className='auth-btn auth-selected-btn'>
                        <p className='auth-text-md'>
                        Sign Up
                        </p>
                    </div>
                    <div className='auth-btn'>
                        <p className='auth-text-md'>
                        Log In
                        </p>
                    </div>
                </div>

            </div>
            <Register />
        </div>
    </div>
  )
}

export default Auth