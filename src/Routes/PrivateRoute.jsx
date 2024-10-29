import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.user)
    
    if (user && user.role === 'admin') {
        return children;
    } else {
        return <Navigate to='/login' />
    }
}
export default PrivateRoute
