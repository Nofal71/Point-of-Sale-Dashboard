import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { clearAlert } from '../../redux/Reducers/feedbackSlice';



const AlertComponent = () => {
    const dispatch = useDispatch();
    const severity = useSelector((state) => state.feedback.Alert.severity);
    const message = useSelector((state) => state.feedback.Alert.message);

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => {
                dispatch(clearAlert());
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [message, dispatch]);

    return (
        <Snackbar
            open={!!message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
        >
            {message && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeIn' }}
                >
                    <Alert severity={severity} onClose={() => dispatch(clearAlert())}>
                        {message}
                    </Alert>
                </motion.div>
            )}
        </Snackbar>


    );
};

export default AlertComponent;
