import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom'

import { useSelector } from 'react-redux';

import {
    Auth,
    Quiz,
    User
} from './components/index.js';

import {
    Dashboard,
    Analysis,
    Stats,
    dashLoader,
    statsLoader
} from './components/User'

import quizLoader from './components/Quiz/Loader.js'

import {
    Register,
    Login
} from './components/Auth'

import App from './App.jsx'
import Loading from './Loading.jsx';


function Router() {
    const user = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)    
    
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route path='' element={loading ? <Loading/> : user ? <Navigate to='/user/dashboard' /> : <Navigate to='/auth/signup' replace />}/>
                <Route path='user' element={loading ? <Loading/> : user ? <User /> : <Navigate to='/auth/signup' replace />}>
                    <Route path='' element={<Navigate to='/user/dashboard' replace />} />
                    <Route path='dashboard' element={<Dashboard />} loader={dashLoader} />
                    <Route path='analysis' element={<Analysis />} />
                    <Route path='stats' element={<Stats />} loader={statsLoader} />
                </Route>
                <Route path='auth' element={loading ? <Loading/> : user ? <Navigate to='/user/dashboard' replace /> : < Auth />}>
                    <Route path='' element={<Navigate to='/auth/signup' replace />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Register />} />
                </Route>
                <Route path='take-quiz' element={<Quiz/>} loader={quizLoader} />
            </Route>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}

export default Router