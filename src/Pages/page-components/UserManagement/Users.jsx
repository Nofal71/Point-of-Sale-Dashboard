import { Box, Button, Checkbox, CircularProgress, Collapse, Divider, FormControl, InputAdornment, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TransitionGroup } from 'react-transition-group';
import { makeRequest } from '../../../Server/api/instance';
import { useCommon } from '../../../Hooks/common/useCommon';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useUser } from '../../../Hooks/custom/useUser';


const Users = ({ setValues, setCurrentComponent }) => {

  const { setAlert, setLoader, setConfirm } = useCommon()
  const [users, setUsers] = useState(null)
  const [saveUsers, setSave] = useState(null)
  const [childLoader, setChildLoader] = useState(null)
  const [progress, setProgress] = useState(false)
  const [filter, setFilter] = useState('');
  const { getUser } = useUser()

  const handleFilter = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    if (!saveUsers.length) return;
    let filteredUsers;
    if (selectedFilter === 'Blocked Users') {
      filteredUsers = saveUsers.filter(user => user.status === 'Blocked Users');
    } else if (selectedFilter === 'Admin') {
      filteredUsers = saveUsers.filter(user => user.role === 'admin');
    } else {
      filteredUsers = saveUsers;
    }
    setUsers(filteredUsers);
  };

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
      setSave((prevUsers) =>
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
      setSave((prevUsers) =>
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
        setSave((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      } catch (error) {
        console.log(error, 'Error in Deleting user')
      } finally {
        setChildLoader(false)
      }
    }

    setConfirm('Are You Sure to Delete this User', process)
  }

  const viewProfile = async (userId) => {
    try {
      setChildLoader(true)
      const user = await makeRequest('GET', `/user/${userId}`)
      setCurrentComponent('User Profile', -1, true)
      setValues(user)
    } catch (error) {
      console.log(error, 'Error in Getting user')
    } finally {
      setChildLoader(false)
    }
  }

  const searchData = async (inputValue) => {
    try {
      setProgress(true)
      const search = await makeRequest('GET', '/user');
      const filteredData = search?.filter((e) => e.name.toLowerCase().includes(inputValue) || e.name.toLowerCase() === inputValue);
      return filteredData;
    } catch (error) {
      console.log(error, 'error');
      return [];
    } finally {
      setProgress(false)
    }
  };

  const searchUser = async (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue === '') return setUsers(saveUsers)
    searchData(inputValue).then((filteredData) => {
      setUsers(filteredData);
    });
  }

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoader(true)
        const data = await makeRequest('GET', '/user')
        const page = data.slice(0, 20)
        setUsers(page)
        setSave(page)
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
          onChange={searchUser}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {progress ? <CircularProgress size={20} color="primary" /> : <CircularProgress size={20} sx={{ opacity: 0 }} color="primary" />}
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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', px: 4 }} >
          <LinearProgress sx={{ opacity: !childLoader && 0, flex: 1 }} />
          <FormControl
            sx={{ minWidth: '7rem', ml: 'auto' }}
          >
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter"
              value={filter}
              onChange={handleFilter}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'Blocked Users'}>Blocked Users</MenuItem>
              <MenuItem value={'Admin'}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            p: 3,
            gap: 3,
          }}
        >
          <Typography variant="subtitle1">Names</Typography>
          <Typography variant="subtitle1">Contact</Typography>
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
                  <Collapse
                    timeout={{ enter: 700, exit: 700 }}
                    sx={{
                      transitionTimingFunction: 'ease-in-out',
                    }}
                    key={i}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        p: 3,
                        gap: 3,
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body2">{e.name}</Typography>
                      <Typography variant="body2">{e.contact}</Typography>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          maxWidth: '15rem',
                          textWrap: 'nowrap',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                        onClick={() => viewProfile(e.id)}
                        endIcon={<NorthEastIcon />}
                      >
                        View Profile
                      </Button>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', justifyContent: 'center' }}>
                        <Checkbox disabled={getUser.role !== 'admin'} checked={e.role === 'admin'} onClick={() => setRole(e.role === 'admin' ? 'customer' : 'admin', e.id)} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', justifyContent: 'center' }}>
                        <Checkbox disabled={getUser.role !== 'admin'} checked={e.status === 'blocked'} onClick={() => setStatus(e.status === 'active' ? 'blocked' : 'active', e.id)} />
                      </Box>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          maxWidth: '8rem',
                          textWrap: 'nowrap',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          mx: 'auto',
                          ":hover": {
                            backgroundColor: 'red ',
                            color: 'white'
                          }

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
