import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalComponent({ component, lable, buttonVariant, reCall, type, important, setHardOpen }) {
    const [open, setOpen] = React.useState(type === 'confirm' ? true : false);
    const handleOpen = () => setOpen(true);
    const handleClose = (e, reason) => {
        if (reason === 'backdropClick' && important) return;
        setOpen(false);
        reCall && reCall();
    };

    React.useEffect(() => {
        console.log(open)
        if (setHardOpen) {
            setOpen(true)
        }
    }, [setHardOpen])

    return (
        <div>
            <Button variant={buttonVariant} onClick={handleOpen}> {lable} </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ zIndex: '5' }}
            >
                <Box sx={style}>
                    <>
                        {React.cloneElement(component, { handleClose })}
                    </>
                </Box>
            </Modal>
        </div>
    );
}
