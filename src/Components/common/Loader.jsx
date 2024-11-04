import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const MotionBox = motion(Box)

export function Loader() {
    const loader = useSelector(state => state.feedback.loader);

    return (
        <>
            {loader && (
                <>
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .4 }}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            minHeight: '100vh',
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
                    </MotionBox>
                </>
            )}
        </>
    );
}
