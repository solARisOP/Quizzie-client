import { useEffect, useRef, useState } from 'react'
import QuizBody from './QuizBody/QuizBody'
import { useLoaderData } from 'react-router-dom'
import Greetings from './Greetings/Greetings';
import axios from 'axios';
import { toast } from 'react-toastify';
import './index.css'

function Quiz() {
	const data = useLoaderData()

	const [attempted, setAttempted] = useState([{ id: data.relatedQuestions[0]._id, optionId: "" }]);
	const [timer, setTimer] = useState(data.relatedQuestions[0].timer)
	const [id, setId] = useState(0)
	const [score, setScore] = useState(null)
	const [sent, setSent] = useState(0)

	const sentRef = useRef(sent);
    const attemptedRef = useRef(attempted);

    useEffect(() => {
        sentRef.current = sent;
    }, [sent]);

    useEffect(() => {
        attemptedRef.current = attempted; 
    }, [attempted]);

	useEffect(() => {
		var obj = {}
		obj[data._id] = [{ id: data.relatedQuestions[0]._id, optionId: "" }];
		window.localStorage.setItem("quiz", JSON.stringify(obj))
		const sendEval = () => {
			if(sentRef.current) {
				return 
			}

			const url = `http://localhost:8000/api/v1/analysis/evaluate-score/${data._id}`
			const payload = JSON.stringify(attemptedRef.current)

    		const blob = new Blob([payload], { type: 'application/json' });
			navigator.sendBeacon(url, blob)
			window.localStorage.removeItem("quiz");
		}

		window.addEventListener('unload', sendEval)
		return () => {
			window.removeEventListener('unload', sendEval)
		}
	}, [])

	useEffect(() => {
		if (id<data.relatedQuestions.length &&  data.relatedQuestions[id].timer) {
			const myInterval = setInterval(() => {
				setTimer(ele => {
					if (ele) {
						return ele - 1
					}
					else {
						nextQuestion()
						clearInterval(myInterval)
						return 0
					}
				})

			}, 1000)
			return () => clearInterval(myInterval);
		}
	}, [id])

	const nextQuestion = async () => {
		if (id < data.relatedQuestions.length - 1) {
			setAttempted(ele =>{ 
				var arr = [...ele, { id: data.relatedQuestions[id + 1]._id, optionId: "" }]
				var obj = {}
				obj[data._id] = arr;
				window.localStorage.setItem("quiz", JSON.stringify(obj))
				return arr
			})
			setTimer(data.relatedQuestions[id + 1].timer)
			setId(ele => ele + 1)
		}
		else if(!sent) {
			try {
				setSent(1)
				const res = await axios.post(`http://localhost:8000/api/v1/analysis/evaluate-score/${data._id}`,
					{
						questions: attempted
					},
					{
						withCredentials: true
					}
				)
				window.localStorage.removeItem("quiz");
				setScore(res.data.data.score)
				setId(ele => ele + 1)
				setSent(2)
			} catch (error) {
				setSent(0)
				toast.error(error?.response?.data?.message || error.message)
			}
			setSent(2)
		}
	}

	const setOption = (e) => {
		const key = e.currentTarget.dataset.key
		setAttempted(ele => {
			var arr = [...ele]
			arr[id].optionId = key
			var obj = {}
			obj[data._id] = arr;
			window.localStorage.setItem("quiz", JSON.stringify(obj))
			return arr;
		})
	}

	return (
		<div className='quiz-layout'>
			{sent == 2 ? <Greetings score={score} type={data.quiztype == 'q&a'} length={data.relatedQuestions.length} /> : id<data.relatedQuestions.length && <QuizBody setOption={setOption} id={id} questions={data.relatedQuestions} attempted={attempted} nextQuestion={nextQuestion} timer={timer} />}
		</div>
	)
}

export default Quiz