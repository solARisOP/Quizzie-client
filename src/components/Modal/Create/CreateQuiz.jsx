import Modal from '../Modal.jsx'
import './index.css'

function CreateQuiz({ isCreateQuizOpen, closeCreateQuiz, setQuizName, setQuizType, openEditQuiz, quizName, quizType }) {

    return (
        <Modal isOpen={isCreateQuizOpen}>
            <div className='create-layout'>
                <input type="text" className='create-quiz-text' placeholder='Quiz name' value={quizName} onChange={(e) => setQuizName(e.target.value)} />

                <div className='create-quiz-type-container'>
                    <p className='create-quiz-type-text'>Quiz Type</p>
                    <button className={`create-quiz-type-btn ${quizType == 'q&a' ? "create-quiz-type-btn-selected" : "create-unselect-btn"} create-quiz-type-btn-unselected`} onClick={() => setQuizType("q&a")} >Q&A</button>
                    <button className={`create-quiz-type-btn ${quizType == 'poll' ? "create-quiz-type-btn-selected" : "create-unselect-btn"} create-quiz-type-btn-unselected`} onClick={() => setQuizType("poll")} >Poll Type</button>
                </div>
                <div className='create-quiz-btn-container'>
                    <button className='create-quiz-btn-abort' onClick={closeCreateQuiz}>Cancel</button>
                    <button className='create-quiz-btn-continue' onClick={() => openEditQuiz(1)}>Continue</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateQuiz