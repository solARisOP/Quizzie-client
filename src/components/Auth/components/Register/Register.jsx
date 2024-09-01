import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css'

function Register() {
	const [formData, setFormData] = useState({
		name : "",
		email : "",
		password : "",
		cnfpassword : ""
	});
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const formUpdation = {
		updateName : (e) => {
			setFormData(ele=>{
				const obj = {...ele}
				obj.name = e.target.value
				return obj
			})
		},
		updateEmail : (e) => {
			setFormData(ele=>{
				const obj = {...ele}
				obj.email = e.target.value
				return obj
			})
		},
		updatePass : (e) => {
			setFormData(ele=>{
				const obj = {...ele}
				obj.password = e.target.value
				return obj
			})
		},
		updateCnfPass : (e) => {
			setFormData(ele=>{
				const obj = {...ele}
				obj.cnfpassword = e.target.value
				return obj
			})
		},
	}

	const validateCreate = async (e) => {
		e.preventDefault()
		const validateErrors = {}

		if(/^[a-zA-Z ]{3,}$/.test(formData.name.trim()) == 0) {
			setFormData(ele=>{
				const obj = {...ele}
				obj.name = ""
				return obj
			})
			validateErrors.name = "invalid name";
		} 
		if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim()) == 0) {
			setFormData(ele=>{
				const obj = {...ele}
				obj.email = ""
				return obj
			})
			validateErrors.email = "invalid email";
		} 
		if(/^(?=\S)(\S{5,})$/.test(formData.password.trim())==0) {
			setFormData(ele=>{
				const obj = {...ele}
				obj.password = ""
				return obj
			})
			validateErrors.password = "invalid password";
		}
		if(formData.password.trim()!=formData.cnfpassword.trim() || /^(?=\S)(\S{5,})$/.test(formData.cnfpassword.trim()) == 0) {
			setFormData(ele=>{
				const obj = {...ele}
				obj.cnfpassword = ""
				return obj
			})
			validateErrors.cnfpassword = "password doesn't match";
		}
		
		if(Object.keys(validateErrors).length === 0) {
			e.target.style.pointerEvents = 'none';
			try {
				await axios.post('http://localhost:8000/api/v1/users/register-user', {
					name : formData.name,
					email : formData.email,
					password : formData.password
				})
				navigate('/auth/login')
			} catch (error) {
				toast.error(error.response.data.message)
			}
			e.target.style.pointerEvents = 'auto';
		}
		else setErrors(validateErrors);
	}


	return (
		<form className='reg-layout' onSubmit={validateCreate}>
			<div className='reg-main-layout'>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Name</p>
					</div>
					<input type="text" className={`reg-field-input ${errors.name ? "auth-invalid-input" : null}`} name='name' required onChange={formUpdation.updateName} value={formData.name} placeholder={errors.name||""} />
				</div>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Email</p>
					</div>
					<input type="email" className={`reg-field-input ${errors.email ? "auth-invalid-input" : null}`} name='email' required onChange={formUpdation.updateEmail} value={formData.email} placeholder={errors.email||""} />
				</div>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Password</p>
					</div>
					<input type="password" className={`reg-field-input ${errors.password ? "auth-invalid-input" : null}`} name='password' required onChange={formUpdation.updatePass} value={formData.password} placeholder={errors.password||""} />
				</div>

				<div className='reg-field-container'>
					<div className='reg-full-space'>
						<p className='reg-field-name'>Confirm Password</p>
					</div>
					<input type="text" className={`reg-field-input ${errors.cnfpassword ? "auth-invalid-input" : null}`} name='cnfpassword' required onChange={formUpdation.updateCnfPass} value={formData.cnfpassword} placeholder={errors.cnfpassword||""} />
				</div>

			</div>
			<div >
				<button className='reg-btn' type='submit'>
				Sign-Up
				</button>
			</div>
		</form>
	)
}

export default Register