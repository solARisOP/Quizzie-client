import { useRef, useState } from 'react'
import Modal from '../Modal.jsx'
import { BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../../../features/quizSlice.js';
import './index.css'

function EditQuiz({ isEditQuizOpen, closeEditQuiz, isNew, quizType, quizName, openCopyQuiz, setQuizId, quiz }) {
    const newObj = {
        question: "",
        timer: 0,
        type: "text",
        options: [
            {},
            {},
        ]
    };

    const deepCopy = (x) => {
        return JSON.parse(JSON.stringify(x));
    }

    const dispatch = useDispatch()
    const [id, setId] = useState(0)
    const [questions, setQuestions] = useState(() => isNew ? [{ ...newObj }] : deepCopy(quiz.relatedQuestions));
    const [currQuestion, setCurrQuestion] = useState(() => isNew ? { ...newObj } : deepCopy(quiz.relatedQuestions[0]));

    const [editQuestions, setEditQuestions] = useState({})
    const [editOptions, setEditOptions] = useState({})

    const Modalref = useRef(null)

    const quizEdit = {

        editOption: (e) => {
            const Oind = e.target.dataset.id
            const Oid = e.target.dataset.okey
            const type = e.target.dataset.type       

            setEditOptions(ele => {
                var obj = deepCopy(ele)
                if(!obj[Oid]) {
                    obj[Oid] = {}
                }
                obj[Oid][type] = e.target.value
                return obj
            })
            setCurrQuestion(ele => {
                var que = deepCopy(ele)
                que.relatedOptions[Oind][type] = e.target.value
                return que
            })
        },

        editQuestion: (e) => {
            const time = parseInt(e.target.value)
            setEditQuestions(ele => {
                var obj = deepCopy(ele)
                obj.Qid.timer = time
                return obj
            })

            setCurrQuestion(ele => {
                var que = deepCopy(ele)
                que.timer = time
                return que
            })
        },

        changeCurrQue: (e) => {
            setQuestions(ele => {
                var arr = deepCopy(ele)
                arr[id] = currQuestion
                return arr
            })
            const idx = parseInt(e.currentTarget.dataset.id)
            setId(idx)
            setCurrQuestion(deepCopy(questions[idx]))
        },

        editTimer: (e) => {
            const time = parseInt(e.target.value)
            setEditQuestions(ele => {
                var obj = deepCopy(ele)
                if(!obj[currQuestion._id]) {
                    obj[currQuestion._id] = {}
                }
                obj[currQuestion._id].timer = time
                return obj
            })
            setCurrQuestion(ele => {
                var obj = deepCopy(ele)
                obj.timer = time
                return obj
            })
        },

        updateQuiz: async() => {
            const finalquestions = questions;
            finalquestions[id] = currQuestion

            let idx = 0
            for (let question of finalquestions) {
                let jdx = 0
                for (let option of question.relatedOptions) {
                    if (question.questiontype == 'both') {
                        if (!option.text || !option.text.trim()) {
                            toast.error(`text feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                            return
                        }
                        else if (!option.image || !option.image.trim()) {
                            toast.error(`image feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                            return
                        }
                    }
                    else if (question.questiontype == 'text') {
                        if (!option.text || !option.text.trim()) {
                            toast.error(`text feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                            return
                        }
                    }
                    else {
                        if (!option.image || !option.image.trim()) {
                            toast.error(`image feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                            return
                        }
                    }
                }
            }

            try {
                Modalref.current.style.pointerEvents = 'none';
                await axios.patch(`http://localhost:8000/api/v1/quiz/update-quiz/${quiz._id}`, {
                    questions: editQuestions,
                    options: editOptions
                }, {
                    withCredentials: true
                })
                toast.error("quiz updated successfully")
                closeEditQuiz()
            } catch (error) {
                Modalref.current.style.pointerEvents = 'auto';
                console.error(error);
                toast.error(error?.response?.data?.message || error.message)
            } 
        }
    }
    
    const modifyQuestion = {

        editQuestion: (e) => {
            const question = e.target.value
            setCurrQuestion(ele => {
                var obj = deepCopy(ele)
                obj.question = question;
                return obj
            })
        },

        editQuestionType: (e) => {
            const type = e.target.value;
            setCurrQuestion(ele => {
                var obj = deepCopy(ele)
                obj.type = type;
                obj.options = [{}, {}];
                return obj
            })
        },

        addOption: () => {
            setCurrQuestion(ele => {
                var obj = deepCopy(ele)
                obj.options.push({});
                return obj;
            })
        },

        editCorrect: (e) => {
            const idx = parseInt(e.target.value);
            setCurrQuestion(ele => {
                var obj = deepCopy(ele)
                obj.correct = idx
                return obj;
            })
        },

        editOptionText: (e) => {
            const idx = parseInt(e.target.dataset.id);
            setCurrQuestion(ele => {
                var obj = { ...ele }
                obj.options[idx].text = e.target.value;
                return obj;
            })
        },

        editOptionImage: (e) => {
            const idx = parseInt(e.target.dataset.id);
            setCurrQuestion(ele => {
                var obj = { ...ele }
                obj.options[idx].image = e.target.value;
                return obj;
            })
        },

        removeOption: (e) => {

            const idx = parseInt(e.currentTarget.dataset.id);
            setCurrQuestion(ele => {
                var obj = deepCopy(ele)
                if (obj.correct) {
                    if (obj.correct == idx) {
                        delete obj.correct
                    }
                    else if (obj.correct > idx) {
                        obj.correct -= 1;
                    }
                }
                obj.options.splice(idx, 1);
                return obj;
            })
        },

        editTimer: (e) => {
            setCurrQuestion(ele => {
                const time = parseInt(e.target.value);
                var obj = deepCopy(ele)
                obj.timer = time
                return obj;
            })
        }
    }

    const modifyQuiz = {

        updateQuestions: () => {
            setQuestions(ele => {
                var arr = deepCopy(ele)
                arr[id] = deepCopy(currQuestion)
                return arr;
            })
        },

        addQuestion: () => {
            modifyQuiz.updateQuestions()
            if (questions.length < 5) {
                const obj = { ...newObj }
                setId(questions.length)
                setQuestions(ele => [...deepCopy(ele), obj])
                setCurrQuestion(obj)
            }
        },

        changeCurrQue: (e) => {
            const idx = parseInt(e.currentTarget.dataset.id)
            if ((e.target.nodeName == 'P' || e.currentTarget === e.target) && idx != id) {
                modifyQuiz.updateQuestions();
                setId(idx)
                setCurrQuestion(deepCopy(questions[idx]))
            }
        },

        removeQuestion: (e) => {

            const idx = parseInt(e.currentTarget.id);

            if (idx == id) {
                if (idx == questions.length - 1) {
                    setId(idx - 1)
                    setCurrQuestion(deepCopy(questions[idx - 1]))
                }
                else setCurrQuestion(deepCopy(questions[idx + 1]))
            }
            else if (id > idx) {
                setId(id - 1)
            }

            setQuestions(ele => {
                var arr = deepCopy(ele);
                arr.splice(idx, 1);
                return arr;
            })
        }
    }

    const postQuiz = async () => {
        const quizzie = { questions: deepCopy(questions), name: quizName, type: quizType }
        quizzie.questions[id] = currQuestion

        for (let [idx, question] of quizzie.questions.entries()) {

            if (!question.question.trim()) {
                toast.error(`question - ${idx + 1} cannot be empty`)
                return
            }
            if (quizType == 'q&a' && question.correct == null) {
                toast.error(`question - ${idx + 1} should contain a correct option`)
                return
            }

            for (let [jdx, option] of question.options.entries()) {
                if (question.type == 'both') {
                    if (!option.text || !option.text.trim()) {
                        toast.error(`text feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                        return
                    }
                    else if (!option.image || !option.image.trim()) {
                        toast.error(`image feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                        return
                    }
                }
                else if (question.type == 'text') {
                    if (!option.text || !option.text.trim()) {
                        toast.error(`text feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                        return
                    }
                }
                else {
                    if (!option.image || !option.image.trim()) {
                        toast.error(`image feild of option - ${jdx + 1}, question - ${idx + 1} cannot be empty`)
                        return
                    }
                }
            }
        }
        try {
            Modalref.current.style.pointerEvents = 'none';
            const res = await axios.post('http://localhost:8000/api/v1/quiz/create-quiz', quizzie, {
                withCredentials: true
            })
            dispatch(addQuiz(res.data.data))
            setQuizId(res.data.data._id)
            openCopyQuiz(2)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || error.message)
        }
        Modalref.current.style.pointerEvents = 'auto';
    }

    return (
        <Modal isOpen={isEditQuizOpen}>
            <div className='edit-quiz-layout' ref={Modalref}>

                {/* questions numbers */}
                <div className='edit-quests-info-container'>
                    <div className='edit-quests-num-container'>
                        {questions.map((ele, idx) =>
                            <div key={idx} className='edit-quests-num'
                            onClick={(e) => isNew ? modifyQuiz.changeCurrQue(e) : quizEdit.changeCurrQue(e)} data-id={idx}>
                                {idx ? <RxCross1 className={`edit-quests-delete ${!isNew ? "edit-btn-hide" : "edit-btn-show"}`} size={10} color={"#000000"} onClick={modifyQuiz.removeQuestion} id={idx} /> : null}
                                <p className='edit-quests-num-text'>{idx + 1}</p>
                            </div>
                        )}
                        {questions.length < 5 ? <BsPlusLg color={'#969696'} size={25} className={` ${!isNew ? "edit-btn-hide" : "edit-btn-show"}`} onClick={modifyQuiz.addQuestion} /> : null}
                    </div>
                    <div className='edit-quests-limit'>
                        <p className='edit-quests-limit-text'>Max 5 questions</p>
                    </div>
                </div>

                {/* question */}
                <div className={`edit-quiz-question-container ${!isNew ? "edit-none" : null}`}>
                    <input type="text"
                        className='edit-quiz-question-container-text edit-input'
                        placeholder='Poll Question'
                        value={currQuestion.question}
                        onChange={(e) => isNew ? modifyQuestion.editQuestion(e) : quizEdit.editQuestion(e)}
                    />
                </div>

                {/* option type */}
                <div className='edit-question-option-type-container'>
                    <p className='edit-question-option-type-text'>OptionType</p>
                    <div className={`edit-question-option-type ${!isNew ? "edit-none" : "edit-pointer"}`}>
                        <input type="radio" name="option" id='text' value={'text'} onChange={modifyQuestion.editQuestionType} checked={currQuestion.type == "text" || currQuestion.questiontype == "text" ? 1 : 0} />
                        <label className='edit-question-option-type-text' htmlFor="text">Text</label>
                    </div>
                    <div className={`edit-question-option-type ${!isNew ? "edit-none" : "edit-pointer"}`}>
                        <input type="radio" name="option" id='image' value={'image'} onChange={modifyQuestion.editQuestionType} checked={currQuestion.type == "image" || currQuestion.questiontype == "image" ? 1 : 0} />
                        <label className='edit-question-option-type-text' htmlFor="image" >Image URL</label>
                    </div>
                    <div className={`edit-question-option-type ${!isNew ? "edit-none" : "edit-pointer"}`}>
                        <input type="radio" name="option" id='both' value={'both'} onChange={modifyQuestion.editQuestionType} checked={currQuestion.type == "both" || currQuestion.questiontype == "both" ? 1 : 0} />
                        <label className='edit-question-option-type-text' htmlFor="both">Text & Image URL</label>
                    </div>
                </div>

                {/* options and timer */}
                <div className='edit-question-options-timer-container'>

                    {/* options */}
                    <div className={`edit-question-options-container ${quizType == 'poll' ? "edit-cstm-pad" : null}`}>

                        {/* select answer */}
                        {quizType == 'q&a' ? <div className='edit-question-options-select-container'>
                            {isNew ? currQuestion.options.map((ele, idx) =>
                                <input key={idx} type="radio" name="correct" value={idx} onChange={modifyQuestion.editCorrect} className={`custom-radio ${!isNew ? "edit-none" : "edit-pointer"}}`} checked={currQuestion.correct == idx} />
                            ) : currQuestion.relatedOptions.map((ele, idx) =>
                                <input key={idx} type="radio" name="correct" value={idx} className={`custom-radio ${!isNew ? "edit-none" : "edit-pointer"}}`} checked={currQuestion.correct == ele._id} />
                            )}
                        </div> : null}

                        {/* texts */}
                        {(isNew && (currQuestion.type == "text" || currQuestion.type == "both")) || (!isNew && (currQuestion.questiontype == "text" || currQuestion.questiontype == "both")) ? <div className='edit-question-options-texts-container'>
                            {isNew ? currQuestion.options.map((ele, idx) =>
                                <input key={idx}
                                    type="text"
                                    className={`edit-question-options-text edit-input ${currQuestion.correct == idx ? "select-option" : null }`}
                                    placeholder='Text'
                                    style={{ boxShadow: "0px 0px 25px 0px #00000026" }}
                                    value={ele.text || ""}
                                    onChange={ modifyQuestion.editOptionText}
                                    data-id={idx}/>
                            ) : currQuestion.relatedOptions.map((ele, idx) =>
                                <input key={idx}
                                    type="text"
                                    className={`edit-question-options-text edit-input ${currQuestion.correct == ele._id ? "select-option" : null }`}
                                    placeholder='Text'
                                    style={{ boxShadow: "0px 0px 25px 0px #00000026" }}
                                    value={ele.text || ""}
                                    onChange={quizEdit.editOption}
                                    data-id={idx}
                                    data-okey={ele._id}
                                    data-type={"text"} />
                            )}

                            {isNew && currQuestion.options.length < 4 && (currQuestion.type == "both" || currQuestion.type == "text") ? <button className='edit-question-add-option-btn' style={{ boxShadow: "0px 0px 15px 0px #00000040" }} onClick={modifyQuestion.addOption}>
                                Add option
                            </button> : null}
                        </div> : null}

                        {/* images */} 
                        {(isNew && (currQuestion.type == "image" || currQuestion.type == "both")) || (!isNew && (currQuestion.questiontype == "image" || currQuestion.questiontype == "both")) ? <div className='edit-question-options-texts-container'>
                            {isNew ? currQuestion.options.map((ele, idx) =>
                                <input key={idx}
                                    type="text"
                                    className={`edit-question-options-text edit-input ${currQuestion.correct == idx ? "select-option" : null }`} 
                                    placeholder='image URL'
                                    style={{ boxShadow: "0px 0px 25px 0px #00000026" }}
                                    value={ele.image || ""}
                                    onChange={modifyQuestion.editOptionImage}
                                    data-id={idx}/>
                            ) : currQuestion.relatedOptions.map((ele, idx) =>
                                <input key={idx}
                                    type="text"
                                    className={`edit-question-options-text edit-input ${currQuestion.correct == ele._id ? "select-option" : null }`} 
                                    placeholder='image URL'
                                    style={{ boxShadow: "0px 0px 25px 0px #00000026" }}
                                    value={ele.image || ""}
                                    onChange={quizEdit.editOption}
                                    data-id={idx}
                                    data-okey={ele._id}
                                    data-type={"image"} />)}
                            {isNew && currQuestion.options.length < 4 && currQuestion.type == "image" ? <button className='edit-question-add-option-btn' style={{ boxShadow: "0px 0px 15px 0px #00000040" }} onClick={modifyQuestion.addOption}>
                                Add option
                            </button> : null}
                        </div> : null}

                        {/* delete options */}
                        {isNew && currQuestion.options.length > 2 ? <div className='edit-question-del-option-container'>
                            {currQuestion.options.map((ele, idx) => {
                                if(idx>1) {
                                    return <RiDeleteBin6Fill key={idx} size={20} color={"#D60000"} data-id={idx} onClick={modifyQuestion.removeOption} style={{cursor: "pointer"}}/>
                                }
                                else {
                                    return <div key={idx} style={{padding: "12px"}}></div>
                                } 
                            })}
                        </div> : null}
                        
                    </div>

                    {/* timer */}
                    <div className='edit-question-timer-container'>
                        <div className='edit-question-timer-inner-container'>
                            <p className='edit-question-timer-text'>
                                Timer
                            </p>
                            <button className={`edit-question-timer-btn ${!currQuestion.timer ? "edit-question-timer-btn-selected" : "edit-question-timer-btn-unselected"}`} onClick={(e) => isNew ? modifyQuestion.editTimer(e) : quizEdit.editTimer(e)} value={0}>
                                OFF
                            </button>
                            <button className={`edit-question-timer-btn ${currQuestion.timer == 5 ? "edit-question-timer-btn-selected" : "edit-question-timer-btn-unselected"}`} onClick={(e) => isNew ? modifyQuestion.editTimer(e) : quizEdit.editTimer(e)} value={5}>
                                5 sec
                            </button>
                            <button className={`edit-question-timer-btn ${currQuestion.timer == 10 ? "edit-question-timer-btn-selected" : "edit-question-timer-btn-unselected"}`} onClick={(e) => isNew ? modifyQuestion.editTimer(e) : quizEdit.editTimer(e)} value={10}>
                                10 sec
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* confirmation buttons */}
                <div className='edit-question-confirmation-container'>
                    <button className='edit-question-btn btn-abort' onClick={closeEditQuiz}>Cancel</button>
                    <button className='edit-question-btn btn-confirm' onClick={(e) => isNew ? postQuiz(e) : quizEdit.updateQuiz(e)} >Continue</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditQuiz