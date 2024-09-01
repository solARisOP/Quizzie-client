import axios from "axios";

const Loader = async() => {
    try {
        let res = await axios.get('https://quizee-server-edxd.onrender.com/api/v1/analysis/top-trending-quizes', {withCredentials: true})
        return res.data.data
    } catch (error) {
        console.error(error);
        return null
    }
}

export default Loader