import axios from 'axios'

const Loader = async({request}) => {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    try {
        const res = await axios.get(`https://quizee-server-edxd.onrender.com/api/v1/analysis/quiz-analysis?key=${key}`, {withCredentials: true})
        return res.data.data
    } catch (error) {
        console.error(error);
        return null
    }

}

export default Loader