import React, { useState } from 'react'
import CreateQuiz from '../../../Modal/Create/CreateQuiz.jsx';
import './index.css'

function Sidebar() {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

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
						<div className='sidebar-btn sidebar-active-btn'>
							<p className='sidebar-btn-text'>
								Dashboard
							</p>
						</div>
						<div className='sidebar-btn'>
							<p className='sidebar-btn-text' >
								Analysis
							</p>
						</div>
						<div className='sidebar-btn'>
							<button className='sidebar-btn-text' onClick={openModal}>
								Create Quiz
							</button>
						</div>
					</div>
					<div className='sidebar-logout-container'>
						<hr className='sidebar-hr' />
						<p className='sidebar-logout'>
							Logout
						</p>
					</div>
				</div>
			</div>
			<CreateQuiz isCreateQuizOpen={isModalOpen} closeCreateQuiz={closeModal}/>
		</>
	)
}

export default Sidebar