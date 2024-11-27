import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useCommon } from '../../../Hooks/common/useCommon';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { makeRequest } from '../../../Server/api/instance';

const Analytics = () => {
  const { setLoader } = useCommon();
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [analyticsData, setAnalyticsData] = useState([]);

  const cardData = [
    { name: 'Products Sold', detail: 'N/A' },
    { name: 'Product Count', detail: productCount },
    { name: 'User Count', detail: userCount },
    { name: 'Orders', detail: ordersCount },
  ];

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      try {
        const [productResponse, usersResponse , analyticsResponse , ordersDetails] = await Promise.all([
          makeRequest('GET', '/products'),
          makeRequest('GET', '/user'),
          makeRequest('GET' , 'analytics-data'),
          makeRequest('GET' , '/orders')
        ]);

        setProductCount(productResponse.length);
        setUserCount(usersResponse.length);
        setAnalyticsData(analyticsResponse); 
        setOrdersCount(ordersDetails.length)

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  if (analyticsData.length === 0) {
    return <Typography>Loading analytics...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        mt: 5,
      }}
    >
      {cardData.map((e, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="body2">
            {e.name}: {e.detail}
          </Typography>
        </Paper>
      ))}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={analyticsData}  
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" /> 
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="productSold" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Analytics;
