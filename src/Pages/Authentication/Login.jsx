import { Button, Card, CardContent, Container, Stack, TextField, Typography, Divider, Box, InputLabel, OutlinedInput, IconButton, InputAdornment, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authUser, getUserDetials } from '../../Server/Authentication/Login';
import { AuthTheme } from '../../MUI_Theme/themeConfig';
import { useCommon } from '../../Hooks/common/useCommon';
import { useUser } from '../../Hooks/custom/useUser';
import { motion } from 'framer-motion';



const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const { updateUser, getUser } = useUser()
    const { setAlert, theme } = useCommon()

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()
    const onSubmit = async (data) => {
        try {
            const signIn = await authUser(data.email, data.password);

            if (!signIn) {
                throw new Error();
            } else {
                const userDetails = await getUserDetials(data.email)
                updateUser(userDetails)
                console.log(userDetails)
                setAlert('Login Success', 'success')
                navigate('/')
            }
        } catch (error) {
            setError('root', { message: `Email or Password is Incorrect` })
        }
    }

    useEffect(() => {
        if (getUser) {
            navigate('/');
        }
    }, [getUser, navigate]);

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
                        <Typography variant='h4' align='center' gutterBottom>Login</Typography>
                        <CardContent>
                            <Stack spacing={3} direction='column'>
                                <Stack direction={'column'} spacing={1}>
                                    <InputLabel>Email</InputLabel>
                                    <TextField
                                        {...register('email', {
                                            required: "Email is Required",
                                        })}
                                        placeholder='Enter Your Email'
                                        variant='outlined'
                                        fullWidth
                                    />
                                    {
                                        errors.email && (
                                            <Typography color="error" variant="body2">
                                                {errors.email.message}
                                            </Typography>
                                        )
                                    }
                                </Stack>
                                <Stack direction={'column'} spacing={1}>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder='Enter Password'
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password", { required: "Password must contain 4 Letters", minLength: 4 })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {
                                        errors.password && (
                                            <Typography color="error" variant="body2">
                                                {errors.password.message}
                                            </Typography>
                                        )
                                    }
                                </Stack>
                                {
                                    errors.root && (
                                        <Typography color="error" variant="body2">
                                            {errors.root.message}
                                        </Typography>
                                    )
                                }
                                <Divider />
                                <Typography variant='subtitle2' align='center'>
                                    Don't have an account? <Link to='/register'>Signup</Link>
                                </Typography>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    size='large'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </Button>
                                {isSubmitting && <Box display={'flex'} justifyContent={'center'}><l-dot-stream style={{ flexGrow: '1' }} size="90" speed="1" color="black" /></Box>}
                            </Stack>


                        </CardContent>
                    </Card>
                </Container>
            </motion.form>
        </ThemeProvider>
    )
}

export default LoginForm
