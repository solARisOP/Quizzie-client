import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    quizes: [],
    impression: 0,
    questions: 0,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setLoading : (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setQuizes: (state, action) => {
            const quizes = action.payload
            state.quizes = quizes
            for(const quiz of quizes) {
                state.questions+=quiz.questions.length
                state.impression+=quiz.impression
            }
        },
        addQuiz: (state, action) => {
            const quiz = action.payload
            state.quizes.push(quiz)
            state.questions+=quiz.questions.length
        },
        removeQuiz: (state, action) => {
            const id = action.payload
            state.quizes = state.quizes.filter((quiz)=>{
                if(quiz._id == id) {
                    state.questions-=quiz.questions.length
                    state.impression-=quiz.impression
                    state.impression-=quiz.impression
                    return false;
                }
                return true
            })
        }
    }
})

export const {setLoading, setUser, setQuizes, addQuiz, removeQuiz} = quizSlice.actions

export default quizSlice.reducer