import React, { useEffect, useState } from 'react'
import { Avatar, Box, Divider, IconButton, Skeleton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { persistor } from '../../redux/Store/Store';
import { useInfo } from '../../Hooks/useInfo';
import { useCustoms } from '../../Hooks/useCustom';
import { makeRequest } from '../../Server/api/instance';


const UserProfile = ({ Height }) => {
    const { setAlert, setConfirm, setLoader } = useInfo()
    const { getUser, updateUser } = useCustoms()
    const [profileImage, setImage] = useState(null)
    const handleLogout = () => {
        setConfirm('Are You Sure to Logout Your Account ?', () => {
            updateUser(false)
            persistor.purge(['user'])
            setAlert('Logout Success', 'success')
        })
    }
    useEffect(() => {
        const getImage = async () => {
            try {
                setLoader(true)
                const image = await makeRequest('GET', '/assets')
                setImage(image.profilePhoto)
            } catch (error) {
                setAlert('Failed to Load Image', 'error')
                console.log('Failed', error)
            } finally {
                setLoader(false)
            }
        }
        getImage()
    }, [])

    return (
        <Box sx={{ position: { xs: 'sticky', sm: 'sticky' }, bottom: '0', left: '0', p: 4, width: '100%', height: Height }}>
            <Divider />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 3 }}>
                {
                    profileImage ? (
                        <Avatar
                            variant="outlined"
                            size="sm"
                            src={profileImage && profileImage}
                        />
                    ) : (
                        <Skeleton variant="rectangular" width={250} height={150} />
                    )
                }
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

export default UserProfile
