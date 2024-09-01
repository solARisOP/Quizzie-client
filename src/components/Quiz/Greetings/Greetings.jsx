import scoreImage from '../../../assets/scoreImage.png'
import './index.css'

function Greetings({score, type, length}) {
    return (
        <div className='greet-layout'>
            {type ? <>
                <div className='greet-title-container'>
                    <p className='greet-title'>Congrats Quiz is completed</p>
                </div>
                <div className='greet-img-container'>
                    <img className="greet-img" src={scoreImage} alt="" />
                </div>
                <div className='greet-score-container'>
                    <p style={{color: "#474444"}}>Your Score is</p>
                    <p style={{color: "#60B84B"}}>{`0${score ? score : ""}/0${length}`}</p>
                </div>
            </> : 
            <>
                <p className='greet-poll-text'>Thank you for participating in the Poll</p>
            </>}
        </div>
    )
}

export default Greetings