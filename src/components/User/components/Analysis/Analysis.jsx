import { useRef, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdShare } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { EditQuiz } from '../../../Modal';
import DeleteQuiz from '../../../Modal/Delete/DeleteQuiz';
import { useDispatch, useSelector } from 'react-redux';
import { removeQuiz } from '../../../../features/quizSlice';
import './index.css'

function Analysis() {   
    const data = useSelector(state=>state.quizes)
    const tableRef = useRef()
    const [quiz, setQuiz] = useState(null)
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [quizId, setQuizId] = useState(null)
    const dispatch = useDispatch()

    const closeModal = () => {
        setEditModalOpen(false)
        setDeleteModalOpen(false)
    }

    const openModal = (value, e) => {
        if(value) {
            setEditModalOpen(true)
        }
        else {
            const id = e.currentTarget.dataset.id
            setQuizId(id)
            setDeleteModalOpen(true)
        }
    }

	const dateconvert = (value) => {
		const date = new Date(value);
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		let formattedDate = date.toLocaleDateString('en-GB', options);
		const finalDate =  formattedDate.replace(/(\d{2} \w{3}) (\d{4})/, '$1, $2');
		return finalDate
	}

	const numConvert = (value) => {
		return value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value
	}

    const editQuiz = async(e) => {
        const key = e.currentTarget.dataset.id
        try {
            tableRef.current.classList.add('pointer-events-none')
            const res = await axios.get(`http://localhost:8000/api/v1/quiz/get-quiz?key=${key}`, {
                withCredentials: true
            })
            setQuiz(res.data.data)
            openModal(1)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || error.message)
        }
        tableRef.current.classList.remove('pointer-events-none')
    }

    const deleteQuiz = async() => {
        const key = quizId
        
        try {
            closeModal()
            tableRef.current.classList.add('pointer-events-none')
            await axios.delete(`http://localhost:8000/api/v1/quiz/delete-quiz/${key}`, {withCredentials: true})
            dispatch(removeQuiz(quizId))
            toast.success('quiz deleted successfully')
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message)
        }
        tableRef.current.classList.remove('pointer-events-none')
    }

    return (
        <>
        <div className='analysis-layout'>
            <div className='analysis-title-container'>
                <p className='analysis-title'>
                    Quiz Analysis
                </p>
            </div>
            <div className='analysis-table-container' ref={tableRef}>
                <div className='analysis-table analysis-table-header'>
                    <p>S.No</p>
                    <p>Quiz Name</p>
                    <p>Created on</p>
                    <p>Impression</p>
                </div>
                {data.map((quiz, idx)=>
                    <div className={`analysis-table`} style={{color: "#000000", backgroundColor: (idx&1) ? "#B3C4FF" : null }} key={idx}>
                        <p className='analysis-quiz-sno'>{idx+1}</p>
                        <p className='analysis-quiz-name'>{`${quiz.name.substring(0, 20)}${quiz.name.length>20 ? "..." : "" }`}</p>
                        <p className='analysis-quiz-date'>{dateconvert(quiz.createdAt)}</p>
                        <p className='analysis-quiz-impression'>{numConvert(quiz.impression)}</p>
                        <div className='analysis-quiz-update-container'>
                            <BiEdit color={"#854CFF"} size={22} className='analysis-pointer' onClick={editQuiz} data-id={quiz._id}/>
                            <RiDeleteBin6Fill color={"#D60000"} size={22} className='analysis-pointer' onClick={(e)=>openModal(0, e)} data-id={quiz._id}/>
                            <MdShare color={"#60B84B"} size={22} className='analysis-pointer' onClick={()=>{navigator.clipboard.writeText(`http://localhost:5173/take-quiz?key=${quiz._id}`), toast.success("link copied successfully")}} />
                        </div>
                        <NavLink className='analysis-quiz-link' to={`/user/stats?key=${quiz._id}`} >Question Wise Analysis</NavLink>
                    </div>
                )}
            </div>
        </div>

        {isEditModalOpen && <EditQuiz isEditQuizOpen={isEditModalOpen} closeEditQuiz={closeModal} isNew={0} quiz={quiz} quizType={quiz.quiztype} />}
        {isDeleteModalOpen && <DeleteQuiz isDeleteQuizOpen={isDeleteModalOpen} closeDeleteQuiz={closeModal} deleteQuiz={deleteQuiz} />}
        </>
    )
}

export default Analysis