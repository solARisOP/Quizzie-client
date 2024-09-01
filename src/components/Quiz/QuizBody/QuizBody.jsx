import './index.css'

function QuizBody({setOption, id, questions, attempted, nextQuestion, timer}) {

    return (
        <div className='quiz-body-layout'>
            <div className='quiz-body-quest-container'>
                <div className={"quiz-body-quest-num-timer"}>
                    <p style={{color: '#474444'}}>{`0${id+1}/0${questions.length}`}</p>
                    {questions[id].timer ? <p style={{color: '#D60000'}}>{`00:${timer<10 ? "0" :""}${timer}s`}</p> : ""}
                </div>
                <p className='quiz-body-quest'>{questions[id].question}</p>
            </div>
            <div className='quiz-body-options-container'>
                <div className='quiz-body-options-grid'>
                    {questions[id].relatedOptions.map((ele, idx) => {
                        if (questions[id].questiontype == 'image') {
                            return <div className={`quiz-body-options-box quiz-image-box { ${ele._id == attempted[id].optionId ? "quiz-selected-option" : null}`} onClick={setOption} data-key={ele._id} key={idx}>
                                <img className='quiz-image' src={src} alt="cannot load image" />
                            </div>
                        }
                        else if (questions[id].questiontype == 'text') {
                            return <div className={`quiz-body-options-box quiz-text-box { ${ele._id == attempted[id].optionId ? "quiz-selected-option" : ""}`} onClick={setOption} data-key={ele._id} key={idx}>
                                <p className='quiz-body-options-text'>{ele.text}</p>
                            </div>
                        }
                        else {
                            return <div className={`quiz-both-box ${ele._id == attempted[id].optionId ? "quiz-selected-option" : null}`} onClick={setOption} data-key={ele._id} key={idx}>
                                <p className='quiz-both-text'>{ele.text}</p>
                                <div className='quiz-both-img-box'>
                                    <img src={src} className='quiz-image' alt="cannot load image" />
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
            <div className='quiz-body-btn-container'>
                <button className='quiz-body-btn' onClick={nextQuestion}>
                    {questions.length-1 == id ? "SUBMIT" : "NEXT"}
                </button>
            </div>
        </div>
    )
}

export default QuizBody