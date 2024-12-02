import { Box, Button, Checkbox, CircularProgress, Collapse, Divider, FormControl, InputAdornment, InputLabel, LinearProgress, MenuItem, Paper, Popper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { TransitionGroup } from 'react-transition-group';
import { makeRequest } from '../../../Server/api/instance';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useUser } from '../../../Hooks/custom/useUser';
import { useUsers } from '../../../Hooks/custom/useUsers';
import RefreshIcon from '@mui/icons-material/Refresh';




const Users = ({ setValues, setCurrentComponent }) => {

  const [childLoader, setChildLoader] = useState(null)
  const inputRef = useRef(null)
  const { getUser } = useUser()
  const {
    userList,
    filter,
    searchProgress,
    isPending,
    searchInput,
    loadUsers,
    handleSearch,
    handleFilter,
    handleDeleteUser,
    setStatus,
    setRole
  } = useUsers()

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
          inputRef={inputRef}
          onChange={(e) => {
            handleSearch(e)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchProgress ? <CircularProgress size={20} color="primary" /> : <CircularProgress size={20} sx={{ opacity: 0 }} color="primary" />}
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
          <RefreshIcon onClick={loadUsers} sx={{
            ml: 'auto', cursor: 'pointer', ":hover": {
              scale: 1.2
            }
          }} />
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

        {isPending && (
          <LinearProgress />
        )}

        <TransitionGroup>
          {!isPending && userList &&
            userList?.map((e, i) => {
              if (e.id !== getUser.id) {
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
              }
            })}
        </TransitionGroup>
      </Paper>
    </Box>

  )
}

export default Users
