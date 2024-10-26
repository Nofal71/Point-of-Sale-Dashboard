import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { useCommon } from '../../Hooks/common/useCommon';

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
        <React.Fragment>
            <Dialog
                open={getConfirm?.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
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
        </React.Fragment>
    );
}
