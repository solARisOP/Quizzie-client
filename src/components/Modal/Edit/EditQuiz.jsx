import { useState } from 'react'
import Modal from '../Modal.jsx'
import { BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import './index.css'

function EditQuiz({ isEditQuizOpen, closeEditQuiz }) {
    const newObj = {
        question: "",
        timer: 0,
        type: "text",
        options: [
            {},
            {},
        ]
    };

    const [id, setId] = useState(0)
    const [questions, setQuestions] = useState([{ ...newObj }]);
    const [currQuestion, setCurrQuestion] = useState({ ...newObj });

    const deepCopy = (x) => {
        return JSON.parse(JSON.stringify(x));
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
    
        addOption : () => {
            setCurrQuestion(ele=>{
                var obj = deepCopy(ele)
                obj.options.push({});
                return obj;
            })
            toast("Wow so easy!");
        },
    
        editCorrect : (e) => {
            const idx = parseInt(e.target.value);
            setCurrQuestion(ele=>{
                var obj = deepCopy(ele)
                obj.correct = idx
                return obj;
            })
        },
    
        editOptionText: (e) => {
            const idx = parseInt(e.target.dataset.id);
            setCurrQuestion(ele=>{
                var obj = {...ele}
                obj.options[idx].text = e.target.value;
                return obj;
            })
        },
    
        editOptionImage: (e) => {
            const idx = parseInt(e.target.dataset.id);
            setCurrQuestion(ele=>{
                var obj = {...ele}
                obj.options[idx].image = e.target.value;
                return obj;
            })
        },
    
        removeOption : (e) => {
            
            const idx = parseInt(e.currentTarget.dataset.id);
            setCurrQuestion(ele=>{
                var obj = deepCopy(ele)
                if(obj.correct) {
                    if(obj.correct == idx) {
                        delete obj.correct
                    }
                    else if(obj.correct > idx) {
                        obj.correct-=1;
                    }
                }         
                obj.options.splice(idx, 1);
                return obj;
            })
        },
    
        editTimer : (e) => {
            setCurrQuestion(ele=>{
                const time = parseInt(e.target.value);
                var obj = deepCopy(ele)
                obj.timer = time
                return obj;
            })
        }
    }
    
    const modifyQuiz = {
    
        updateQuestions : () => {
            setQuestions(ele => {
                var arr = deepCopy(ele)
                arr[id] =  deepCopy(currQuestion)
                return arr;
            })
        },
    
        addQuestion : () => {
            modifyQuiz.updateQuestions()
            if (questions.length < 5) {
                const obj = { ...newObj }
                setId(questions.length)
                setQuestions(ele => [...deepCopy(ele), obj])
                setCurrQuestion(obj)
            }
        },
    
        changeCurrQue : (e) => {
            const idx = parseInt(e.currentTarget.dataset.id)
            if ((e.target.nodeName == 'P' || e.currentTarget === e.target) && idx != id) {
                modifyQuiz.updateQuestions();
                setId(idx)
                setCurrQuestion(deepCopy(questions[idx]))
            }
        },
    
        removeQuestion : (e) => {
    
            const idx = parseInt(e.currentTarget.id);
    
            if (idx == id) {
                if (idx == questions.length - 1) {
                    setId(idx - 1)
                    setCurrQuestion(deepCopy(questions[idx-1]))
                }
                else setCurrQuestion(deepCopy(questions[idx+1]))
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

    const postQuiz = () => {
        const quiz = {questions : deepCopy(questions)}
        quiz.questions[id] = currQuestion
        
        for (let [idx, question] of quiz.questions.entries()) {
            
            if(!question.question.trim()) {
                toast(`question - ${idx+1} cannot be empty`)
                return
            }
            
            for(let [jdx, option] of question.options.entries())
            {
                if(question.type=='both') {
                    if(!option.text || !option.text.trim()) {
                        toast(`text feild of option - ${jdx+1}, question - ${idx+1} cannot be empty`)
                        return
                    }
                    else if(!option.image || !option.image.trim()) {
                        toast(`image feild of option - ${jdx+1}, question - ${idx+1} cannot be empty`)
                        return
                    }
                }
                else if(question.type=='text') {
                    if(!option.text || !option.text.trim()) {
                        toast(`text feild of option - ${jdx+1}, question - ${idx+1} cannot be empty`)
                        return
                    }
                }
                else {
                    if(!option.image || !option.image.trim()) {
                        toast(`image feild of option - ${jdx+1}, question - ${idx+1} cannot be empty`)
                        return
                    }
                }
            }
            
        }
        
    }

    return (
        <Modal isOpen={isEditQuizOpen}>
            <div className='edit-quiz-layout'>

                {/* questions numbers */}
                <div className='edit-quests-info-container'>
                    <div className='edit-quests-num-container'>
                        {questions.map((ele, idx) =>
                            <div key={idx} className='edit-quests-num'
                                onClick={modifyQuiz.changeCurrQue} data-id={idx}>
                                {idx ? <RxCross1 className='edit-quests-delete' size={10} color={"#000000"} onClick={modifyQuiz.removeQuestion} id={idx} /> : null}
                                <p className='edit-quests-num-text'>{idx + 1}</p>
                            </div>
                        )}
                        {questions.length < 5 ? <BsPlusLg color={'#969696'} size={25} style={{cursor: "pointer"}} onClick={modifyQuiz.addQuestion} /> : null}
                    </div>
                    <div className='edit-quests-limit'>
                        <p className='edit-quests-limit-text'>Max 5 questions</p>
                    </div>
                </div>

                {/* question */}
                <div className='edit-quiz-question-container'>
                    <input type="text"
                        className='edit-quiz-question-container-text edit-input'
                        placeholder='Poll Question'
                        style={{ boxShadow: "0px 0px 25px 0px #00000026" }}
                        value={currQuestion.question}
                        onChange={modifyQuestion.editQuestion}
                    />
                </div>

                {/* option type */}
                <div className='edit-question-option-type-container'>
                    <p className='edit-question-option-type-text'>OptionType</p>
                    <div className='edit-question-option-type'>
                        <input type="radio" name="option" id='text' value={'text'} onChange={modifyQuestion.editQuestionType} checked={currQuestion.type == "text" ? 1 : 0} />
                        <label className='edit-question-option-type-text' htmlFor="text">Text</label>
                    </div>
                    <div className='edit-question-option-type'>
                        <input type="radio" name="option" id='image' value={'image'} onChange={modifyQuestion.editQuestionType} checked={currQuestion.type == "image" ? 1 : 0} />
                        <label className='edit-question-option-type-text' htmlFor="image" >Image URL</label>
                    </div>
                    <div className='edit-question-option-type'>
                        <input type="radio" name="option" id='both' value={'both'} onChange={modifyQuestion.editQuestionType} checked={currQuestion.type == "both" ? 1 : 0} />
                        <label className='edit-question-option-type-text' htmlFor="both">Text & Image URL</label>
                    </div>
                </div>

                {/* options and timer */}
                <div className='edit-question-options-timer-container'>

                    {/* options */}
                    <div className='edit-question-options-container'>

                        {/* select answer */}
                        <div className='edit-question-options-select-container'>
                            {currQuestion.options.map((ele, idx) => {
                                return <input type="radio" name="correct" value={idx} onChange={modifyQuestion.editCorrect} className='custom-radio' checked={currQuestion.correct == idx} />
                            })}
                        </div>

                        {/* texts */}
                        {(currQuestion.type == "text" || currQuestion.type == "both") ? <div className='edit-question-options-texts-container'>
                            {currQuestion.options.map((ele, idx) =>
                                <input type="text" 
                                className={`edit-question-options-text edit-input ${currQuestion.correct == idx ? "select-option" : null }`} 
                                placeholder='Text' 
                                value={currQuestion.options[idx].text || ""} 
                                onChange={modifyQuestion.editOptionText}
                                data-id = {idx}/>
                            )}
                            
                            {currQuestion.options.length<4 && (currQuestion.type=="both" || currQuestion.type=="text") ? <button className='edit-question-add-option-btn' onClick={modifyQuestion.addOption}>
                                Add option
                            </button> : null}
                        </div> : null}

                        {/* images */}
                        {(currQuestion.type == "image" || currQuestion.type == "both") ? <div className='edit-question-options-texts-container'>
                            {currQuestion.options.map((ele, idx) =>
                                <input type="text" 
                                className={`edit-question-options-text edit-input ${currQuestion.correct == idx ? "select-option" : null }`} 
                                placeholder='image URL' 
                                value={currQuestion.options[idx].image || ""} 
                                onChange={modifyQuestion.editOptionImage}
                                data-id = {idx}/>
                            )}
                            {currQuestion.options.length<4 && currQuestion.type=="image" ? <button className='edit-question-add-option-btn' onClick={modifyQuestion.addOption}>
                                Add option
                            </button> : null}
                        </div> : null}

                        {/* delete options */}
                        { currQuestion.options.length > 2 ? <div className='edit-question-del-option-container'>
                            {currQuestion.options.map((ele, idx) => {
                                if(idx>1) {
                                    return <RiDeleteBin6Fill size={20} color={"#D60000"} data-id={idx} onClick={modifyQuestion.removeOption} style={{cursor: "pointer"}}/>
                                }
                                else {
                                    return <div style={{padding: "12px"}}></div>
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
                            <button className={`edit-question-timer-btn ${!currQuestion.timer ? "edit-question-timer-btn-selected" : "edit-question-timer-btn-unselected"}`} onClick={modifyQuestion.editTimer} value={0}>
                                OFF
                            </button>
                            <button className={`edit-question-timer-btn ${currQuestion.timer == 5 ? "edit-question-timer-btn-selected" : "edit-question-timer-btn-unselected"}`} onClick={modifyQuestion.editTimer} value={5}>
                                5 sec
                            </button>
                            <button className={`edit-question-timer-btn ${currQuestion.timer == 10 ? "edit-question-timer-btn-selected" : "edit-question-timer-btn-unselected"}`} onClick={modifyQuestion.editTimer} value={10}>
                                10 sec
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* confirmation buttons */}
                <div className='edit-question-confirmation-container'>
                    <button className='edit-question-btn btn-abort' onClick={closeEditQuiz}>Cancel</button>
                    <button className='edit-question-btn btn-confirm' onClick={postQuiz} >Continue</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditQuiz