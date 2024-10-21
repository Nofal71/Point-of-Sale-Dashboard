import React from 'react'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../redux/Reducers/userSlice';
import { persistor } from '../../redux/Store/Store';
import { useInfo } from '../../Hooks/useInfo';


const UserProfile = ({ Width }) => {
    const dispatch = useDispatch()
    const { setAlert } = useInfo()
    const userDetails = useSelector(state => state.user)
    const handleLogout = () => {
        dispatch(userData(false))
        persistor.purge(['user'])
        setAlert('Logout Success', 'success')
    }
    return (
        <Box sx={{ position: 'fixed', bottom: '0', left: '0', p: 4, width: Width }}>
            <Divider />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 3 }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="subtitle2" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '20ch',
                    }}> {userDetails.name} </Typography>
                    <Typography level="body-xs" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '20ch',
                    }} >{userDetails.email} </Typography>
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

export default UserProfile
