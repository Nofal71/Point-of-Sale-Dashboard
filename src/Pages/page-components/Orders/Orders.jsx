import React, { useEffect, useState } from 'react';
import { useOrders } from '../../../Hooks/custom/useOrders';
import { useCommon } from '../../../Hooks/common/useCommon';
import { TransitionGroup } from 'react-transition-group';
import { Box, Collapse, Typography, Button, Divider } from '@mui/material';

const Orders = () => {
  const { allOrders , getUserName} = useOrders(); 
  const { setLoader } = useCommon(); 

  useEffect(() => {
    setLoader(true);
    if (allOrders) {
      setLoader(false);
    }
  }, [allOrders, setLoader]);

  const viewOrderDetails = (orderId) => {
    console.log(`Viewing details for Order ID: ${orderId}`);
  };

  return (
    <TransitionGroup>
      {allOrders &&
        allOrders.map((order) => (
          <Collapse
            key={order.id}
            timeout={{ enter: 700, exit: 700 }}
            sx={{
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                p: 3,
                gap: 2,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                mb: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order ID: {order.id}
              </Typography>
              {order.details.map((detail, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">
                    Product ID: {detail.product.id}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {detail.product.quantity}
                  </Typography>
                  <Typography variant="body2" color={detail.status === 'pending' ? 'warning.main' : 'success.main'}>
                    Status: {detail.status}
                  </Typography>
                </Box>
              ))}
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => viewOrderDetails(order.id)}
              >
                View Order
              </Button>
            </Box>
            <Divider />
          </Collapse>
        ))}
    </TransitionGroup>
  );
};

export default Orders;
