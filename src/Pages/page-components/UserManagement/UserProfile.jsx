import { Box, Button, Container, IconButton, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCommon } from '../../../Hooks/common/useCommon';
import { makeRequest } from '../../../Server/api/instance';

const PaperMotion = motion(Paper)

const UserProfile = ({ value }) => {

  const [hidePassword, setHide] = useState(true)
  const { setAlert, setLoader } = useCommon()

  const defaultValues = {
    email: value?.email,
    username: value?.username,
    name: value?.name,
    contact: value?.contact,
    password: value?.password,
    role: value?.role,
  }

  const { reset, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: value && defaultValues
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true)
      const userDetails = {
        email: data.email,
        username: data.username,
        name: data.name,
        password: data.password,
        contact: data.contact,
        role: 'customer'
      }
      await makeRequest('PATCH', `/user/${value.id}`, userDetails)
      setAlert('User Updated Successfully', 'success')
    } catch (error) {
      setAlert("Failed to Update User", 'error')
      reset(defaultValues)
      console.log(error, 'error in saving user')
    } finally {
      setLoader(false)
    }
  };

  return (
    <Box>
      <PaperMotion
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .5 }}
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          flex: 1,
          minWidth: { xs: '100%', md: 1 / 2 },
          borderRadius: '20px'
        }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container sx={{ paddingBottom: '10px' }}>
            <InputLabel shrink>Name</InputLabel>
            <TextField
              {...register('name', { required: "First Name is Required" })}
              type='text'
              fullWidth
              placeholder='Enter Your First Name'
            />
            {errors.name && (
              <Typography color="error" variant="body2">
                {errors.name.message}
              </Typography>
            )}
          </Container>

          <Container sx={{ paddingBottom: '10px' }}>
            <InputLabel shrink>Username</InputLabel>
            <TextField
              {...register('username', { required: "Username is required" })}
              fullWidth
              placeholder='Enter Username here'
            />
            {errors.username && (
              <Typography color="error" variant="body2">
                {errors.username.message}
              </Typography>
            )}
          </Container>

          <Container sx={{ paddingBottom: '10px' }}>
            <InputLabel shrink>Contact</InputLabel>
            <TextField
              {...register('contact', { required: "Contact is Required" })}
              fullWidth
              placeholder='Enter Your Contact Number'
            />
            {errors.contact && (
              <Typography color="error" variant="body2">
                {errors.contact.message}
              </Typography>
            )}
          </Container>

          <Container sx={{ paddingBottom: '10px' }}>
            <InputLabel shrink>Email</InputLabel>
            <TextField
              {...register('email', { required: "Email is Required" })}
              fullWidth
              placeholder='Enter Your Email'
            />
            {errors.email && (
              <Typography color="error" variant="body2">
                {errors.email.message}
              </Typography>
            )}
          </Container>

          <Container sx={{ paddingBottom: '10px' }}>
            <InputLabel shrink>Password</InputLabel>
            <TextField
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              fullWidth
              placeholder="Enter Your Password"
              type={hidePassword ? 'password' : 'text'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setHide(!hidePassword)} edge="end">
                      {hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography color="error" variant="body2">
                {errors.password.message}
              </Typography>
            )}
          </Container>

          <Button disabled={isSubmitting} type='submit' variant="contained" color="primary" sx={{ marginTop: '20px', width: '100%' }}>
            {isSubmitting ? 'Loading...' : 'Update User'}
          </Button>
        </form>
      </PaperMotion>
    </Box>
  )
}

export default UserProfile
