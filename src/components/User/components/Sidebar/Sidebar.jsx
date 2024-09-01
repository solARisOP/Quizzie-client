import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setQuizes, setUser } from '../../../../features/quizSlice';
import {CopyQuiz, EditQuiz, CreateQuiz} from '../../../Modal';
import './index.css'
import { toast } from 'react-toastify';

function Sidebar() {
	const dispatch = useDispatch()

	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isCopyModalOpen, setCopyModalOpen] = useState(false);

	const [quizName, setQuizName] = useState("")
    const [quizType, setQuizType] = useState("")
	const [quizId, setQuizId] = useState(null);

	const closeModal = () => {
		setCreateModalOpen(false);
		setEditModalOpen(false);
		setCopyModalOpen(false);
		setQuizName("")
		setQuizType("")
		setQuizId(null)
	};

	const openModal = (value) => {
		if(!value) {
			setCreateModalOpen(true);
		}
		else if(value == 1) {
			if(!quizName.trim()) {
				toast.warning('Quiz name cannot be empty')
				return
			}
			if(!quizType.trim()) {
				toast.warning('Select a quiz type')
				return
			}
			setCreateModalOpen(false);
			setEditModalOpen(true);
		}
		else {		
			setEditModalOpen(false);
			setCopyModalOpen(true);
			setQuizName("")
			setQuizType("")
		}
	};
	
	const logoutUser = async () => {

		try {
			await axios.post('https://quizee-server-edxd.onrender.com/api/v1/users/logout-user', {}, {
				withCredentials: true,
			});
			dispatch(setUser(null))
			dispatch(setQuizes(null))
		} catch (error) {
			console.error(error);	
		}
	}

	return (
		<>
			<div className='sidebar-layout'>
				<div className='sidebar-main-layout'>
					<div className='sidebar-logo-container'>
						<p className='sidebar-logo'>
							QUIZZIE
						</p>
					</div>
					<div className='sidebar-links-container'>
						<NavLink className={({isActive})=>`sidebar-btn ${isActive ? "sidebar-active-btn" : ""}`} to={'/user/dashboard'}>
							<p className='sidebar-btn-text'>
								Dashboard
							</p>
						</NavLink>
						<NavLink className={({isActive})=>`sidebar-btn ${isActive ? "sidebar-active-btn" : ""}`} to={'/user/analysis'}>
							<p className='sidebar-btn-text'>
								Analytics
							</p>
						</NavLink>
						<button className='sidebar-btn' onClick={()=>openModal(0)}>
							<p className='sidebar-btn-text'>
								Create Quiz
							</p>
						</button>
					</div>
					<div className='sidebar-logout-container'>
						<hr className='sidebar-hr' />
						<p className='sidebar-logout' onClick={logoutUser}>
							Logout
						</p>
					</div>
				</div>
			</div>

			{isCreateModalOpen && <CreateQuiz isCreateQuizOpen={isCreateModalOpen} closeCreateQuiz={closeModal} openEditQuiz={openModal} setQuizName={setQuizName} setQuizType={setQuizType} quizName={quizName} quizType={quizType} />}
			{isEditModalOpen && <EditQuiz isEditQuizOpen={isEditModalOpen} closeEditQuiz={closeModal} isNew={1} quizType={quizType} quizName={quizName} openCopyQuiz={openModal} setQuizId={setQuizId} />}
			{isCopyModalOpen && <CopyQuiz isCopyQuizOpen={isCopyModalOpen} closeCopyQuiz={closeModal} quizId={quizId} />}
		</>
	)
}

export default Sidebar