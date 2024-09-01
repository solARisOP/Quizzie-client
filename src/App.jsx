import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setUser, setLoading, setQuizes } from './features/quizSlice.js'

function App() {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				let promise = [axios.get('http://localhost:8000/api/v1/users/get-user', { withCredentials: true }),
					axios.get('http://localhost:8000/api/v1/analysis/user-quizes', {withCredentials: true})]
					
				promise = await Promise.all(promise)
				dispatch(setUser(promise[0].data.data.user))
				dispatch(setQuizes(promise[1].data.data))
			} catch (error) {
				console.error(error);
			}
			dispatch(setLoading(false))
		}
		if (!user) fetchUser()
	}, [])

	return (
		<Outlet />
	)
}

export default App
