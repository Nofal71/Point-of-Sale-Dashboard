import React, { useEffect, useState } from 'react';
import ModalComponent from './ModalComponent';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useInfo } from '../../Hooks/useInfo';


const Component = ({ handleClose, handleSubmit, message }) => {

    return (
        <Stack spacing={5} direction={'column'} p={3}>
            <Typography variant="body1" > {message} </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => handleClose()}>No</Button>
                <Button onClick={() => {
                    handleSubmit()
                    handleClose()
                }}>Yes</Button>
            </Box>
        </Stack>
    )
}

const Confirm = () => {
    const { getConfirm, ResetConfirmValue } = useInfo();
    const message = getConfirm.message;
    const process = getConfirm.process;
    const [open, setOpen] = useState(false)
    
    const handleSubmit = () => {
        process()
        ResetConfirmValue()
        setOpen(true)
    }
    
    useEffect(() => {
        console.log('.....', message, '////', process)
        setOpen(true)
    }, [message])

    return (
        <>
            {message && (
                <ModalComponent type="confirm" setHardOpen={open} important={true} component={(<Component handleSubmit={handleSubmit} message={message} />)} />
            )}
        </>
    );
};

export default Confirm;
