import { Typography } from '@mui/material'
import React from 'react'
import Graph from '../../../Components/analyticalChart/Graph'

const Analytics = () => {
  return (
    <>
      <Typography variant='h3'>Analytics</Typography>
      <Graph xAxis={[0, 1, 2, 3, 4, 5]} yAxis={[0, 1, 2, 3, 4, 5]} />
    </>
  )
}

export default Analytics
