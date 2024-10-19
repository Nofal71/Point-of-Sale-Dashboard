import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import LoginForm from '../Pages/Authentication/Login'
import PrivateRoute from './PrivateRoute'
import SignupForm from '../Pages/Authentication/Register'

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PrivateRoute> <Home /> </PrivateRoute>} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoute
