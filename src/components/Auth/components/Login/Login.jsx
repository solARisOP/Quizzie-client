import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setQuizes, setUser } from '../../../../features/quizSlice.js';
import './index.css'

function Login() {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});

	const formUpdation = {
		updateEmail: (e) => {
			setFormData(ele => {
				const obj = { ...ele }
				obj.email = e.target.value
				return obj
			})
		},
		updatePass: (e) => {
			setFormData(ele => {
				const obj = { ...ele }
				obj.password = e.target.value
				return obj
			})
		}
	}

	const validateCreate = async (e) => {
		e.preventDefault()
		const validateErrors = {}

		if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim()) == 0) {
			setFormData(ele => {
				const obj = { ...ele }
				obj.email = ""
				return obj
			})
			validateErrors.email = "invalid email";
		}
		if (/^(?=\S)(\S{5,})$/.test(formData.password.trim()) == 0) {
			setFormData(ele => {
				const obj = { ...ele }
				obj.password = ""
				return obj
			})
			validateErrors.password = "invalid password";
		}

		if (Object.keys(validateErrors).length === 0) {
			e.target.style.pointerEvents = 'none';
			try {
				const res = await axios.post('http://localhost:8000/api/v1/users/login-user', {
					email: formData.email,
					password: formData.password
				}, {
					withCredentials: true,
				});
				e.target.style.pointerEvents = 'auto';
				dispatch(setUser(res.data.data.user))
				dispatch(setQuizes(res.data.data.quizes))
			} catch (error) {
				e.target.style.pointerEvents = 'auto';
				toast.error(error?.response?.data?.message || error.message)
			}
		}
		else setErrors(validateErrors);
	}

	return (
		<form className='log-layout' onSubmit={validateCreate}>
			<div className='log-main-layout'>

				<div className='log-field-container'>
					<div className='log-full-space'>
						<p className='log-field-name'>Email</p>
					</div>
					<input type="text" className={`log-field-input ${errors.email ? "auth-inavlid-input" : null}`} required onChange={formUpdation.updateEmail} value={formData.email} placeholder={errors.email||""} />
				</div>

				<div className='log-field-container'>
					<div className='log-full-space'>
						<p className='log-field-name'>Password</p>
					</div>
					<input type="password" className={`log-field-input ${errors.password ? "auth-inavlid-input" : null}`} required onChange={formUpdation.updatePass} value={formData.password} placeholder={errors.password||""} />
				</div>

			</div>
			<div className='log-margin-y'>
				<button className='log-btn'>
					Log-In
				</button>
			</div>
		</form>
	)
}

export default Login