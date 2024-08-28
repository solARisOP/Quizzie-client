import React from 'react'
import './index.css'

function Dashboard() {
	return (
		<div className='dash-layout'>
			<div className='dash-head-container'>
				<div className='dash-head-stat'>
					<div className='dash-head-stat-container'>
						<p className='dash-head-stat-value' style={{ color: "#FF5D01" }}>12</p>
						<p className='dash-head-stat-text' style={{ color: "#FF5D01" }}>Quiz</p>
					</div>
					<div className='dash-head-suff-container'>
						<p className='dash-head-stat-text' style={{ color: "#FF5D01" }}>Created</p>
					</div>
				</div>
				<div className='dash-head-stat'>
					<div className='dash-head-stat-container'>
						<p className='dash-head-stat-value' style={{ color: "#60B84B" }}>110</p>
						<p className='dash-head-stat-text' style={{ color: "#60B84B" }}>Questions</p>
					</div>
					<div className='dash-head-suff-container'>
						<p className='dash-head-stat-text' style={{ color: "#60B84B" }}>Created</p>
					</div>
				</div>
				<div className='dash-head-stat'>
					<div className='dash-head-stat-container'>
						<p className='dash-head-stat-value' style={{ color: "#5076FF" }}>1.4K</p>
						<p className='dash-head-stat-text' style={{ color: "#5076FF" }}>Total</p>
					</div>
					<div className='dash-head-suff-container'>
						<p className='dash-head-stat-text' style={{ color: "#5076FF" }}>Impressions</p>
					</div>
				</div>
			</div>

			<div className='dash-main-container'>
				<div className='dash-main-head'>
					<p className='dash-main-head-text'>Trending Quizs</p>
				</div>
				<div className='dash-main-grid-container'>
					{[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(()=><div className='dash-main-grid-stat'>
						<div className='dash-main-grid-stat-quiz'>
							<p className='dash-main-stat-quiz-text'>Quiz 1</p>
							<div className='dash-main-stat-quiz-value-container'>
								<p className='dash-main-stat-quiz-value'>667</p>
								<p className='icon-park-outline--eyes'></p>
							</div>
						</div>
						<div className='dash-main-stat-quiz-date-container'>
							<p className='dash-main-stat-quiz-date'>Created on : 04 Sep, 2023</p>
						</div>
					</div>)}
				</div>
			</div>
		</div>
	)
}

export default Dashboard