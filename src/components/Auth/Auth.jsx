import React from 'react'
import './index.css'
import { NavLink, Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className='auth-layout'>
        <div className='auth-top-bar'>
            <div className='auth-flex-container'>
                <div className='auth-margin-y'>
                    <p className='auth-text-large'>QUIZZIE</p>
                </div>
                <div className='auth-btn-flex-container'>
                    <NavLink className={({ isActive }) => `auth-btn ${isActive ? "auth-selected-btn" : null}`} to={'/auth/signup'}>
                        <p className='auth-text-md'>
                        Sign Up
                        </p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `auth-btn ${isActive ? "auth-selected-btn" : null}`} to={'/auth/login'}>
                        <p className='auth-text-md'>
                        Log In
                        </p>
                    </NavLink>
                </div>

            </div>
            <Outlet />
        </div>
    </div>
  )
}

export default Auth