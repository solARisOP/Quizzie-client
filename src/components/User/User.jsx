import Sidebar from './components/Sidebar/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import './index.css'

function User() {
	
	return (
		<div className='user-layout'>
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default User