import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'
import Home from '../Pages/Home'

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Typography>Login Page (pending.....)</Typography>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoute
