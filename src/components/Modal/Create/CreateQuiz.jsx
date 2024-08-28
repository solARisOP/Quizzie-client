import { useState } from 'react'
import Modal from '../Modal.jsx'
import EditQuiz from '../Edit/EditQuiz.jsx';
import './index.css'

function CreateQuiz({ isCreateQuizOpen, closeCreateQuiz }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

    const openEditQuiz = ()=>{
        closeCreateQuiz()
        openModal();
    }

    return (
        <>
            <Modal isOpen={isCreateQuizOpen}>
                <div className='create-layout'>
                    <input type="text" className='create-quiz-text' placeholder='Quiz name'/>

                    <div className='create-quiz-type-container'>
                        <p className='create-quiz-type-text'>Quiz Type</p>
                        <button className='create-quiz-type-btn create-quiz-type-btn-selected' >Q&A</button>
                        <button className='create-quiz-type-btn create-quiz-type-btn-unselected' >Poll Type</button>
                    </div>
                    <div className='create-quiz-btn-container'>
                        <button className='create-quiz-btn-abort' onClick={closeCreateQuiz}>Cancel</button>
                        <button className='create-quiz-btn-continue' onClick={openEditQuiz}>Continue</button>
                    </div>
                </div>
            </Modal>
            <EditQuiz isEditQuizOpen={isModalOpen} closeEditQuiz={closeModal} />
        </>
    )
}

export default CreateQuiz