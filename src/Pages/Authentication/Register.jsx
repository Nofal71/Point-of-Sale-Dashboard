import { Button, Stack, TextField, Typography, Box, InputLabel, IconButton, InputAdornment, ThemeProvider, CssBaseline, Paper, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthTheme } from '../../MUI_Theme/themeConfig';
import { useCommon } from '../../Hooks/common/useCommon';
import { useUser } from '../../Hooks/custom/useUser';
import { motion } from 'framer-motion';
import backDrop from '../../../public/Backdrop.png';
import { registerUser } from '../../Server/Authentication/Register';

const MotionForm = motion.form;

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const { updateUser } = useUser();
    const { setAlert, theme } = useCommon();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const userFound = await getUserDetials(data.email);
            if (userFound) {
                throw new Error();
            } else {
                const userDetails = {
                    email: data.email,
                    username: data.username,
                    name: `${data.firstname} ${data.lastname}`,
                    password: data.password,
                    contact: data.contact,
                    role: 'customer',
                    status: 'active'
                }
                await registerUser(userDetails);
                const updatedUser = await getUserDetials(data.email);
                updateUser(updatedUser)
                setAlert('SignUp Successfully', 'success')
                navigate('/');
            };
        } catch (error) {
            setError('email', { message: "This email is already taken" });
        }
    };


    return (
        <ThemeProvider theme={() => AuthTheme(theme)}>
            <Box
                sx={{
                    height: '100dvh',
                    width: '100%',
                    backgroundImage: `url(${backDrop})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                <CssBaseline />

                <Paper
                    component={MotionForm}
                    initial={{ opacity: 0, y: -500 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeIn',
                    }}
                    elevation={3}
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        borderRadius: '20px',
                        height: { xs: '95dvh', sm: '90dvh' },
                        width: { xs: '95vw', sm: '90dvw', md: '40dvw', },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: { xs: 3, md: 4 },
                        overflowY: 'scroll',
                    }}
                >
                    <Avatar sx={{ mb: 3 }} />
                    <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                        <Button
                            startIcon={<Facebook />}
                            variant="outlined"
                            sx={{
                                borderRadius: '30px',
                                p: 1,
                            }}
                        >
                            Sign up with Facebook
                        </Button>
                        <Button
                            startIcon={<Google />}
                            variant="outlined"
                            sx={{
                                borderRadius: '30px',
                                p: 1,
                            }}
                        >
                            Sign up with Google
                        </Button>
                    </Stack>
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            my: 3,
                            color: 'gray',
                        }}
                    >
                        --------------------- OR ---------------------
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
                            <TextField
                                {...register('firstname', { required: "First Name is required" })}
                                placeholder="Enter Your First Name"
                                fullWidth
                                variant="outlined"
                                error={!!errors.firstname}
                                helperText={errors.firstname?.message || ''}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>Last Name</InputLabel>
                            <TextField
                                {...register('lastname', { required: "Last Name is required" })}
                                placeholder="Enter Your Last Name"
                                fullWidth
                                variant="outlined"
                                error={!!errors.lastname}
                                helperText={errors.lastname?.message || ''}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>Contact</InputLabel>
                            <TextField
                                {...register('contact', { required: "Contact number is required" })}
                                placeholder="Enter Your Contact Number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.contact}
                                helperText={errors.contact?.message || ''}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>Username</InputLabel>
                            <TextField
                                {...register('username', { required: "Username is required" })}
                                placeholder="Enter Your Username"
                                variant="outlined"
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username?.message || ''}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                            <TextField
                                {...register('email', { required: "Email is required" })}
                                placeholder="Enter Your Email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message || ''}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>Password</InputLabel>
                            <TextField
                                {...register('password', {
                                    required: "Password must contain 4 letters",
                                    minLength: { value: 4, message: "Password must be at least 4 characters" },
                                })}
                                placeholder="Enter Your Password"
                                variant="outlined"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                error={!!errors.password}
                                helperText={errors.password?.message || ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                        <div>
                            <InputLabel sx={{ mb: 1 }}>Confirm Password</InputLabel>
                            <TextField
                                {...register('confirmPassword', {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch('password') || "Passwords do not match",
                                })}
                                placeholder="Confirm Your Password"
                                variant="outlined"
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message || ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: '30px', mb: 3 }}
                            />
                        </div>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        sx={{
                            borderRadius: '30px',
                            width: '100%',
                            mt: 2,
                        }}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>

                    <Typography variant='body2' sx={{ my: 2 }} >
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default SignupForm;
