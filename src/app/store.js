import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quizSlice.js';

export const store = configureStore({
    reducer: quizReducer
});