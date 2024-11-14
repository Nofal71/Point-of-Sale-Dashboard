import React, { useEffect } from 'react'
import Dashboard from '../Components/dashboard/Dashboard'


const Home = () => {
useEffect(() => {
    fetch('http://127.0.0.1:3000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
},[])
      
    return <Dashboard />
}

export default Home
