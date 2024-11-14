import React from 'react'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { persistor } from '../../redux/Store/Store';
import { useCommon } from '../../Hooks/common/useCommon';
import { useUser } from '../../Hooks/custom/useUser';


const AdminProfile = ({ Height }) => {
    const { setAlert, setConfirm, setLoader } = useCommon()
    const { getUser, updateUser } = useUser()
    const handleLogout = () => {
        setConfirm('Are You Sure to Logout Your Account ?', () => {
            updateUser(false)
            persistor.purge(['user'])
            setAlert('Logout Success', 'success')
        })
    }

    return (
        <Box sx={{ position: { xs: 'sticky', sm: 'sticky' }, bottom: '0', left: '0', p: 4, width: '100%', height: Height }}>
            <Divider />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 3 }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s'
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="subtitle2" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '20ch',
                    }}> {getUser.name} </Typography>
                    <Typography level="body-xs" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '20ch',
                    }} >{getUser.email} </Typography>
                </Box>
                <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={handleLogout}
                >
                    <LogoutIcon />
                </IconButton>
            </Box>

        </Box>
    )
}

export default AdminProfile
