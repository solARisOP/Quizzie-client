import React from 'react'
import './index.css'

function Stats() {
    return (
        <div className='stat-layout'>
            <div className='stat-quiz-head'>
                <p className='stat-quiz-name'>
                    Quiz 2 Question Analysis
                </p>
                <div className='stat-quiz-info'>
                    <p className='stat-quiz-info-text'>Created on : 04 Sep, 2023</p>
                    <p className='stat-quiz-info-text'>Impressions : 667</p>
                </div>
            </div>
            <div className='stat-quiz-quest-container'>
                {[0,0,0].map(()=>{
                    return <>
                        <div className='stat-quiz-quest'>
                            <p className='stat-quiz-quest-text'>
                                Q.1 Question place holder for analysis ?
                            </p>
                            <div className='stat-quiz-quest-stat-container'>
                                <div className='stat-quiz-quest-stat'>
                                    <p className='stat-quiz-quest-stat-value'>60</p>
                                    <p className='stat-quiz-quest-stat-text'>people Attempted the question</p>
                                </div>
                                <div className='stat-quiz-quest-stat'>
                                    <p className='stat-quiz-quest-stat-value'>38</p>
                                    <p className='stat-quiz-quest-stat-text'>people Answered Correctly</p>
                                </div>
                                <div className='stat-quiz-quest-stat'>
                                    <p className='stat-quiz-quest-stat-value'>22</p>
                                    <p className='stat-quiz-quest-stat-text'>people Answered Incorrectly</p>
                                </div>
                            </div>
                        </div>
                        <hr className='stat-quiz-quest-ruler' />
                    </>
                })}
            </div>
        </div>
    )
}

export default Stats