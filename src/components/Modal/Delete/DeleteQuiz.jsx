import Modal from '../Modal.jsx'
import './index.css'

function DeleteQuiz({ isDeleteQuizOpen, closeDeleteQuiz, deleteQuiz }) {
	return (
		<Modal isOpen={isDeleteQuizOpen}>
            <div className='delete-modal-layout'>
                <div className='delete-modal-title-container'>
					<p className='delete-modal-title'>
						Are you confirm you want to delete ?
					</p>
				</div>

                <div className='delete-modal-btn-container'>
                    <button className='delete-modal-delete-btn' onClick={deleteQuiz}>Confirm Delete</button>
                    <button className='delete-modal-close-btn' onClick={closeDeleteQuiz}>Cancel</button>
                </div>
            </div>
        </Modal>
	)
}

export default DeleteQuiz
