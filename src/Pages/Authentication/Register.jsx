import { Container, InputLabel, Stack, Input, Typography, Button, Card, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetials } from '../../Server/Authentication/Login';
import { registerUser } from '../../Server/Authentication/Register';
import { userData } from '../../redux/Reducers/userSlice';
import { setAlert } from '../../redux/Reducers/AlertSlice';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthTheme } from '../../MUI_Theme/themeConfig';


const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const userFound = await getUserDetials(data.email);
            console.log(userFound, 'userfound......');
            if (userFound) {
                throw new Error();
            } else {
                const userDetails = {
                    email: data.email,
                    username: data.username,
                    name: `${data.firstname} ${data.lastname}`,
                    password: data.password
                }
                const response = await registerUser(userDetails);
                const updatedUser = await getUserDetials(data.email);
                dispatch(userData(updatedUser));
                dispatch(setAlert({ msg: 'SignUp Successfully', type: 'success' }));
                navigate('/');
            };
        } catch (error) {
            setError('email', { message: "This email is already taken" });
        }
    };

    return (
        <ThemeProvider theme={AuthTheme}>
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            />
                            {errors.username && (
                                <Typography color="error" variant="body2">
                                    {errors.username.message}
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
            </form>
        </ThemeProvider>
    );
};

export default SignupForm;
