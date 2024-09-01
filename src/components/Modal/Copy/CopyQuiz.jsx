import Modal from '../Modal'
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import './index.css'

function CopyQuiz({isCopyQuizOpen, closeCopyQuiz, quizId}) {
    
  return (
    <Modal isOpen={isCopyQuizOpen} >
        <div className='copy-modal-layout'>
            <div className='copy-modal-header'>
                <RxCross1 color={'#474444'} size={30} onClick={closeCopyQuiz} style={{cursor: "pointer"}} />
            </div>
            <div className='copy-modal-title-container'>
                <p className='copy-modal-title'>
                    Congrats your Quiz is Published!
                </p>
            </div>
            <div className='copy-modal-link-container'>
                <p className='copy-modal-link'>your link is here</p>
            </div>
            <button className='copy-modal-share-btn' onClick={() => { navigator.clipboard.writeText(`http://localhost:5173/take-quiz?key=${quizId}`), toast.success("link copied sucessfully")}}>
                Share
            </button>
        </div>
    </Modal>
  )
}

export default CopyQuiz

