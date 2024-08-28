import React from 'react'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Analysis from './components/Analysis/Analysis.jsx'
import Stats from './components/Stats/Stats.jsx'
import './index.css'

function User() {
	
	return (
		<div className='user-layout'>
			<Sidebar />
			<Dashboard />
		</div>
	)
}

export default User