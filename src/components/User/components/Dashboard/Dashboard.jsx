import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom'
import './index.css'

function Dashboard() {
	const trendingQuizes = useLoaderData()
	
	const questions = useSelector(state => state.questions)
	const impression = useSelector(state => state.impression)
	const quizes = useSelector(state => state.quizes.length)

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

	return (
		<div className='dash-layout'>
			<div className='dash-head-container'>
				<div className='dash-head-stat'>
					<div className='dash-head-stat-container'>
						<p className='dash-head-stat-value' style={{ color: "#FF5D01" }}>{numConvert(quizes)}</p>
						<p className='dash-head-stat-text' style={{ color: "#FF5D01" }}>Quiz</p>
					</div>
					<div className='dash-head-suff-container'>
						<p className='dash-head-stat-text' style={{ color: "#FF5D01" }}>Created</p>
					</div>
				</div>
				<div className='dash-head-stat'>
					<div className='dash-head-stat-container'>
						<p className='dash-head-stat-value' style={{ color: "#60B84B" }}>{numConvert(questions)}</p>
						<p className='dash-head-stat-text' style={{ color: "#60B84B" }}>Questions</p>
					</div>
					<div className='dash-head-suff-container'>
						<p className='dash-head-stat-text' style={{ color: "#60B84B" }}>Created</p>
					</div>
				</div>
				<div className='dash-head-stat'>
					<div className='dash-head-stat-container'>
						<p className='dash-head-stat-value' style={{ color: "#5076FF" }}>{numConvert(impression)}</p>
						<p className='dash-head-stat-text' style={{ color: "#5076FF" }}>Total</p>
					</div>
					<div className='dash-head-suff-container'>
						<p className='dash-head-stat-text' style={{ color: "#5076FF" }}>Impressions</p>
					</div>
				</div>
			</div>

			{trendingQuizes.length ? <div className='dash-main-container'>
				<div className='dash-main-head'>
					<p className='dash-main-head-text'>Trending Quizs</p>
				</div>
				<div className='dash-main-grid-container'>
					{trendingQuizes.map((quiz, idx)=><div className='dash-main-grid-stat' key={idx}>
						<div className='dash-main-grid-stat-quiz'>
							<p className='dash-main-stat-quiz-text'>{`${quiz.name.substring(0, 14)}${quiz.name.length > 14 ? "..." : ""}`}</p>
							<div className='dash-main-stat-quiz-value-container'>
								<p className='dash-main-stat-quiz-value'>{numConvert(quiz.impression)}</p>
								<p className='icon-park-outline--eyes'></p>
							</div>
						</div>
						<div className='dash-main-stat-quiz-date-container'>
							<p className='dash-main-stat-quiz-date'>{`Created on : ${dateconvert(quiz.createdAt)}`}</p>
						</div>
					</div>)}
				</div>
			</div>:
			<div></div>}
		</div>
	)
}

export default Dashboard