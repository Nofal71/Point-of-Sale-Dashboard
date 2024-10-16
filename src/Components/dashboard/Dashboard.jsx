import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Breadcrumbs } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setNestedComponent } from '../../redux/Reducers/currentComponentSlice';
import { tabs } from '../../Pages/Tabs/DashboardTabs';
import { useComponent } from '../../Pages/Tabs/DashBoardComponents';

const drawerWidth = 240;

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = React.useState(defaultExpanded);
    React.useEffect(() => {
        open && setTimeout(() => setOpen(false), 20000)
    }, [open])
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: open ? 'auto' : 0,
                    opacity: open ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
            >
                <Box>
                    {children}
                </Box>
            </motion.div>
        </React.Fragment>
    );
}

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const name = useSelector(state => state.currentSelection.name)
    const nestedComponent = useSelector(state => state.currentSelection.nestedComponent)
    const dispatch = useDispatch()
    const component = useComponent();



    function handleClickBreadcrumbs(event) {
        event.preventDefault();
    }

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {tabs.map((item, index) => (
                    <div key={index}>
                        {!item.subItems || item.subItems.length === 0 ? (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        dispatch(setName(item.name));
                                        handleDrawerClose();
                                    }}
                                >
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            <Toggler
                                renderToggle={({ open, setOpen }) => (
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => setOpen(!open)}>
                                            <ListItemText primary={item.name} />
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            >
                                {item.subItems?.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                dispatch(setName(subItem));
                                                handleDrawerClose();
                                            }}
                                        >
                                            <ListItemText primary={subItem} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </Toggler>
                        )}
                    </div>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#424242'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Admin Site
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        position: 'relative',
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                    <Box sx={{
                        position: 'absolute',
                        bottom: 0, right: 0, left: 0,
                    }}>
                        <Avatar
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gukc7EnLg2lXrV35IoDl3SrhFbupHeJhuw&s' />
                    </Box>
                </Drawer>
            </Box>


            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <div role="presentation" onClick={handleClickBreadcrumbs}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="inherit" sx={{ cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}>
                            Dashboard
                        </Typography>
                        <Typography sx={{ color: 'text.primary', cursor: 'pointer' }} onClick={() => dispatch(setName(name))}> {name} </Typography>
                        {nestedComponent && nestedComponent.map((c, index) => (
                            <Typography
                                key={index}
                                sx={{ color: 'text.primary', cursor: 'pointer' }}
                            >
                                {c}
                            </Typography>
                        ))}
                    </Breadcrumbs>
                </div>
                {component}
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
