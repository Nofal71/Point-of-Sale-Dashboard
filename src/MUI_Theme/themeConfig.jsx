import { createTheme } from "@mui/material";


export const DashboardTheme = (mode) => createTheme({
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    transitionDuration: '0.5s',
                    transitionProperty: 'background-color, transform',
                    ":hover": {
                        backgroundColor: 'lightBlue',
                        color: '#0000f5',
                        fontWeight: '900',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'lightblue',
                    color: 'black'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {

                }
            }
        }
    },
    palette: {
        mode: mode
    }
});


export const AuthTheme = (mode) => createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    minWidth: '50%',
                    boxShadow: '1px 1px 8px gray',
                    padding: 20,
                    borderRadius: 20,
                    // backgroundColor: '#000',
                    // color: '#fff'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    height: '3rem',
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#add8e6',
                    },
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#87ceeb',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1e90ff',
                    },
                    '& .MuiInputBase-root:before': {
                        borderBottom: 'none',
                    },
                    '& .MuiInputBase-root:after': {
                        borderBottom: 'none',
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '0.85rem', // Change this value for different text sizes
                    },
                    // '& .MuiInputBase-input': {
                    //     color: '#ffffff', // Change input text color to white
                    // },
                },
            },
        },
        // MuiCssBaseline: {
        //     styleOverrides: {
        //         body: {
        //             backgroundColor: '#000',
        //             color: '#fff',
        //         },
        //     },
        // },
    },
    palette: {
        mode: mode
    }
})
