import { Container, InputLabel, Typography, Button, Card, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUserDetials } from '../../Server/Authentication/Login';
import { registerUser } from '../../Server/Authentication/Register';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthTheme } from '../../MUI_Theme/themeConfig';
import { useCommon } from '../../Hooks/common/useCommon';
import { useUser } from '../../Hooks/custom/useUser';
import { motion } from 'framer-motion';


const SignupForm = () => {
    const navigate = useNavigate();
    const { setAlert, theme } = useCommon()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, watch } = useForm();
    const { updateUser } = useUser()


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
            <CssBaseline />
            <motion.form
                initial={{ opacity: 0, y: -500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: 'easeIn',
                }}
                onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ width: '100%', height: '100vh', placeItems: 'center', display: 'grid' }}>
                    <Card>
                        <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                            Sign Up
                        </Typography>
                        <Container sx={{ paddingBottom: '10px' }}>
                            <InputLabel shrink>First Name</InputLabel>
                            <TextField
                                {...register('firstname', { required: "First Name is Required" })}
                                type='text'
                                fullWidth
                                placeholder='Enter Your First Name'
                            />
                            {errors.firstname && (
                                <Typography color="error" variant="body2">
                                    {errors.firstname.message}
                                </Typography>
                            )}
                        </Container>

                        <Container sx={{ paddingBottom: '10px' }}>
                            <InputLabel shrink>Last Name</InputLabel>
                            <TextField
                                {...register('lastname', { required: "Last Name is Required" })}
                                fullWidth
                                placeholder='Enter Your Last Name'
                            />
                            {errors.lastname && (
                                <Typography color="error" variant="body2">
                                    {errors.lastname.message}
                                </Typography>
                            )}
                        </Container>

                        <Container sx={{ paddingBottom: '10px' }}>
                            <InputLabel shrink>Username</InputLabel>
                            <TextField
                                {...register('username', { required: "Username is required" })}
                                fullWidth
                                placeholder='Enter Username here'
                                type='text'
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
                                type='number'
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
                                type='email'
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
                                    required: "Password is Required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                                fullWidth
                                placeholder='Enter Your Password'
                                type='password'
                            />
                            {errors.password && (
                                <Typography color="error" variant="body2">
                                    {errors.password.message}
                                </Typography>
                            )}
                        </Container>

                        <Container sx={{ paddingBottom: '10px' }}>
                            <InputLabel shrink>Confirm Password</InputLabel>
                            <TextField
                                {...register('confirmPassword', {
                                    required: "Confirm Password is Required",
                                    validate: (value) =>
                                        value === watch('password') || "Passwords do not match",
                                })}
                                fullWidth
                                placeholder='Confirm Your Password'
                                type='password'
                            />
                            {errors.confirmPassword && (
                                <Typography color="error" variant="body2">
                                    {errors.confirmPassword.message}
                                </Typography>
                            )}
                        </Container>

                        <Button disabled={isSubmitting} type='submit' variant="contained" color="primary" sx={{ marginTop: '20px', width: '100%' }}>
                            {isSubmitting ? 'Loading...' : 'Submit'}
                        </Button>
                    </Card>
                </Container>
            </motion.form>
        </ThemeProvider>
    );
};

export default SignupForm;
