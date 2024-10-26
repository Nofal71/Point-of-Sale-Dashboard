import { Box, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../../Server/api/instance'
import { useCommon } from '../../../Hooks/common/useCommon'
// import Graph from '../../../Components/analyticalChart/Graph'

const Analytics = () => {

  const { setLoader } = useCommon()
  const [productCount, setProductCount] = useState(0)
  const [userCount, setUserCount] = useState(0)

  const cardData = [
    { name: 'Product Count', detail: productCount },
    { name: 'User Count', detail: userCount },
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true)
        const productResponse = await makeRequest('GET', '/products')
        setProductCount(productResponse.length)
        const usersResponse = await makeRequest('GET', '/user')
        setUserCount(usersResponse.length)
      } catch (error) {
        console.error('Error in getting response ', error);
      } finally {
        setLoader(false)
      }
    }
    getData()
  }, [])

  return (
    <>
      {/* <Typography variant='h3'>Analytics</Typography> */}
      {/* <Graph xAxis={[0, 1, 2, 3, 4, 5]} yAxis={[0, 1, 2, 3, 4, 5]} /> */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        mt: 5
      }}>
        {
          cardData && cardData.map((e, index) => (
            <Paper key={index} elevation={2} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='body2'> {e.name} : {e.detail} </Typography>
            </Paper>
          ))
        }

      </Box>
    </>
  )
}

export default Analytics
