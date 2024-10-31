import { Box, Button, Checkbox, Collapse, Divider, InputAdornment, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TransitionGroup } from 'react-transition-group';
import { makeRequest } from '../../../Server/api/instance';
import { useCommon } from '../../../Hooks/common/useCommon';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useUser } from '../../../Hooks/custom/useUser';


const Users = () => {

  const { setAlert, setLoader, setConfirm } = useCommon()
  const [users, setUsers] = useState(null)
  const [childLoader, setChildLoader] = useState(null)
  const { getUser } = useUser()

  const setRole = async (role, userId) => {
    try {
      setChildLoader(true)
      await makeRequest('PATCH', `/user/${userId}`, { role })
      const updateUser = await makeRequest('GET', `/user/${userId}`)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? updateUser : user
        )
      );
    } catch (error) {
      console.log(error, 'Error in Changing role')
    } finally {
      setChildLoader(false)
    }
  }

  const setStatus = async (status, userId) => {
    try {
      setChildLoader(true)
      await makeRequest('PATCH', `/user/${userId}`, { status })
      const updateUser = await makeRequest('GET', `/user/${userId}`)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? updateUser : user
        )
      );
      setAlert(`User Succesfully ${status}`, 'info')
    } catch (error) {
      console.log(error, 'Error in Changing status of user')
    } finally {
      setChildLoader(false)
    }
  }

  const handleDeleteUser = (userId) => {
    const process = async () => {
      try {
        setChildLoader(true)
        await makeRequest('DELETE', `/user/${userId}`)
        setAlert(`User Succesfully Deleted`, 'info')
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.log(error, 'Error in Deleting user')
      } finally {
        setChildLoader(false)
      }
    }

    setConfirm('Are You Sure to Delete this User', process)
  }

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoader(true)
        const data = await makeRequest('GET', '/user')
        setUsers(data)
      } catch (error) {
        setAlert('Failed to Fetch Users', 'error')
        console.log('error in getting users data', error)
      } finally {
        setLoader(false)
      }
    }
    getAllUsers()
  }, [])

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 4 },
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'}> 
        <Typography variant="h4">Users</Typography>
        <TextField
          label="Search"
          variant="standard"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* {progress ? <CircularProgress size={20} color="primary" /> : <CircularProgress size={20} sx={{ opacity: 0 }} color="primary" />} */}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          fontWeight: '900',
        }}
      >
        <LinearProgress sx={{ opacity: !childLoader && 0 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            p: 3,
            gap: 3,
          }}
        >
          <Typography variant="subtitle1">Names</Typography>
          <Typography variant="subtitle1">Profile</Typography>
          <Typography variant="subtitle1" align='center'>Admin Access</Typography>
          <Typography variant="subtitle1" align='center'>Block User</Typography>
          <Typography variant="subtitle1" align='center'>Delete User</Typography>
        </Box>

        <TransitionGroup>
          {users &&
            users.map((e, i) => {
              if (e.id !== getUser.id)
                return (
                  <Collapse key={i}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        p: 3,
                        gap: 3,
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body2">{e.name}</Typography>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          maxWidth: '15rem',
                          textWrap: 'nowrap',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                        endIcon={<NorthEastIcon />}
                      >
                        View Profile
                      </Button>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', justifyContent: 'center' }}>
                        <Checkbox checked={e.role === 'admin'} onClick={() => setRole(e.role === 'admin' ? 'customer' : 'admin', e.id)} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', justifyContent: 'center' }}>
                        <Checkbox checked={e.status === 'blocked'} onClick={() => setStatus(e.status === 'active' ? 'blocked' : 'active', e.id)} />
                      </Box>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          maxWidth: '8rem',
                          textWrap: 'nowrap',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          backgroundColor: 'red',
                          mx: 'auto'
                        }}
                        onClick={() => handleDeleteUser(e.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Divider />
                  </Collapse>
                )
            })}
        </TransitionGroup>
      </Paper>
    </Box>

  )
}

export default Users
