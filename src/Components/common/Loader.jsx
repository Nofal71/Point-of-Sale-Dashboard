import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export function Loader() {
    const loader = useSelector(state => state.loader);

    return (
        <>
            {loader && (
                <>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                            backdropFilter: 'blur(10px)', 
                            zIndex: 20, 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: 'all',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </>
            )}
        </>
    );
}
