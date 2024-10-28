import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Slide } from '@mui/material';
import { useCommon } from '../../Hooks/common/useCommon';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirm() {

    const { getConfirm, setOpenState } = useCommon()

    const handleClose = () => {
        setOpenState(false);
    };
    const handleSubmit = () => {
        setOpenState(false);
        getConfirm.process()
    };


    return (
        <Dialog
            open={getConfirm?.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >

            <DialogTitle id="alert-dialog-title">
                {getConfirm?.message}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
