import { Button, Stack, TextField, Typography, Box, InputLabel, IconButton, InputAdornment, ThemeProvider, CssBaseline, Paper, Avatar } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { authUser, getUserDetials } from '../../Server/Authentication/Login';
import { AuthTheme } from '../../MUI_Theme/themeConfig';
import { useCommon } from '../../Hooks/common/useCommon';
import { useUser } from '../../Hooks/custom/useUser';
import { motion } from 'framer-motion';


const MotionForm = motion.form


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
            <Box
                sx={{
                    height: '100dvh',
                    width: '100%',
                    backgroundImage: `url(${'/public/Backdrop.png'})`,
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
                        height: {xs:'auto' ,sm: '90dvh'} ,
                        minWidth:'30dvw',
                        maxWidth: '90dvw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        px: 4,
                        py: 2,
                    }}
                >
                    <Stack direction={'column'} spacing={2} my={1} alignItems={'center'} >
                        <Avatar />
                        <Typography variant='h5' align='center'>Login</Typography>
                    </Stack>
                    <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                        <Button
                            startIcon={<Facebook />}
                            variant="outlined"
                            sx={{
                                borderRadius: '30px',
                                p: 1,
                                height: 32
                            }}
                        >
                            Login with Facebook
                        </Button>
                        <Button
                            startIcon={<Google />}
                            variant="outlined"
                            sx={{
                                borderRadius: '30px',
                                p: 1,
                                height: 32
                            }}
                        >
                            Login with Google
                        </Button>
                    </Stack>
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            color: 'gray',
                            py: 1
                        }}
                    >
                        --------------------- OR ---------------------
                    </Box>
                    <Stack spacing={1} direction={'column'} sx={{ width: '100%' }}>
                        <div>
                            <InputLabel>Email</InputLabel>
                            <TextField
                                size='small'
                                {...register('email', {
                                    required: "Email is Required",
                                })}
                                placeholder="Enter Your Email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message || ''}
                            />
                        </div>
                        <div>
                            <InputLabel>Password</InputLabel>
                            <TextField
                                placeholder="Enter Your Password"
                                variant="outlined"
                                fullWidth
                                size='small'
                                type={showPassword ? 'text' : 'password'}
                                {...register("password", {
                                    required: "Password must contain 4 Letters",
                                    minLength: {
                                        value: 4,
                                        message: "Password must be at least 4 characters",
                                    },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message || ''}
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                }}
                                sx={{
                                    borderRadius: '30px',
                                }}
                            />
                        </div>
                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                            <Typography
                                sx={{
                                    opacity: errors.root?.message ? 1 : 0,
                                    height: '20px',
                                }}
                                color="error"
                                variant="body2"
                            >
                                {errors.root?.message || ''}
                            </Typography>
                            <Typography
                                component={Link}
                                variant="body2"
                            >
                                Forgot Password ?
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'column'} pt={2} spacing={2} justifySelf={'flex-end'}>
                        <Button
                            variant="contained"
                            color="primary"
                            type='submit'
                            sx={{
                                borderRadius: '30px',
                                width: '100%',
                            }}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                        <Typography variant='body2' > Don't have account ? Lets
                            <Link to={'/register'}> register</Link> yourself
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </ThemeProvider >
    )
}

export default LoginForm
