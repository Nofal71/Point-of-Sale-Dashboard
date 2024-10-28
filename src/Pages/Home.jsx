import React from 'react'
import Dashboard from '../Components/dashboard/Dashboard'


const Home = () => {
    localStorage.setItem('DataLossPrevention', JSON.stringify(false));
    return <Dashboard />
}

export default Home
