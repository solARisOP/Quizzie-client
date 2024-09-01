import { useLoaderData } from 'react-router-dom'
import './index.css'

function Stats() {
    const data = useLoaderData()

    const dateconvert = (value) => {
        const date = new Date(value);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('en-GB', options);
        const finalDate = formattedDate.replace(/(\d{2} \w{3}) (\d{4})/, '$1, $2');
        return finalDate
    }

    const numConvert = (value) => {
        return value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value
    }

    console.log(data.relatedQuestions[1]);
    

    return (
        <div className='stat-layout'>
            <div className='stat-quiz-head'>
                <p className='stat-quiz-name'>
                    {`${data.name} Question Analysis`}
                </p>
                <div className='stat-quiz-info'>
                    <p className='stat-quiz-info-text'>{`Created on : ${dateconvert(data.createdAt)}`}</p>
                    <p className='stat-quiz-info-text'>{`Impressions : ${numConvert(data.impression)}`}</p>
                </div>
            </div>
            <div className='stat-quiz-quest-container'>
                {data.relatedQuestions.map((question, idx) =>
                    <>
                        <div className='stat-quiz-quest'>
                            <p className='stat-quiz-quest-text'>
                                {`Q.${idx + 1} ${question.question}`}
                            </p>
                            <div className='stat-quiz-quest-stat-container'>
                                {data.quiztype == "q&a" ? <>
                                    <div className='stat-quiz-quest-stat'>
                                        <p className='stat-quiz-quest-stat-value'>{`${numConvert(question.impression)}`}</p>
                                        <p className='stat-quiz-quest-stat-text'>people Attempted the question</p>
                                    </div>
                                    <div className='stat-quiz-quest-stat'>
                                        <p className='stat-quiz-quest-stat-value'>{`${numConvert(question.correctimpressions)}`}</p>
                                        <p className='stat-quiz-quest-stat-text'>people Answered Correctly</p>
                                    </div>
                                    <div className='stat-quiz-quest-stat'>
                                        <p className='stat-quiz-quest-stat-value'>{`${numConvert(question.incorrectimpressions)}`}</p>
                                        <p className='stat-quiz-quest-stat-text'>people Answered Incorrectly</p>
                                    </div>
                                </> :
                                    <div className='stat-quiz-poll-container'>
                                        {question.relatedOptions.map((option, idx) =>
                                            <div className='stat-quiz-poll-options'>
                                                <p className='stat-quiz-poll-opt-val'>{`${numConvert(option.impression)}`}</p>
                                                <p className='stat-quiz-poll-opt-text'>{`Option ${idx + 1}`}</p>
                                            </div>
                                        )}
                                    </div>}
                            </div>
                        </div>
                        <hr className='stat-quiz-quest-ruler' />
                    </>
                )}
            </div>
        </div>
    )
}

export default Stats