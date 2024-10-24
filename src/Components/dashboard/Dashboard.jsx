import React, { useEffect, useState } from 'react';
import AppBarComponent from './AppBarComponent';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Breadcrumbs } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { tabs } from '../Tabs/DashboardTabs';
import { Loader } from '../common/Loader';
import { useComponent } from '../../Hooks/useComponent';
import CompanyLogo from './CompanyLogo';

const drawerWidth = 240;
const drawerHeight = 500;
const companyLogoHeight = 100

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = useState(defaultExpanded);
    useEffect(() => {
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [color, setColor] = useState('#0000f5');
    const { getCurrentComponent, setCurrentComponent, currentComponentName, nestedComponent } = useComponent();
    const lastIndex = localStorage.getItem('lastIndex')
    const [selectedIndex, setSelectedIndex] = useState(() => lastIndex ? JSON.parse(localStorage.getItem('lastIndex')) : 0);

    const setListItemColor = (index) => {
        setSelectedIndex(index);
        localStorage.setItem('lastIndex', JSON.stringify(index))
        setColor('#0000f5');
    };

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
        <Box sx={{ overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'none', position: 'relative', mb: 'auto' }}>
            <List>
                {tabs.map((item, index) => (
                    <div key={index}>
                        {!item.subItems || item.subItems.length === 0 ? (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        setCurrentComponent(item.name)
                                        handleDrawerClose();
                                        setListItemColor(index);
                                    }}
                                >
                                    <ListItemText sx={{ color: selectedIndex === index ? color : 'inherit' }} primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            <Toggler
                                renderToggle={({ open, setOpen }) => (
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            setOpen(!open)
                                        }}
                                        >
                                            <ListItemText sx={{ color: selectedIndex === index ? color : 'inherit' }} primary={item.name} />
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            >
                                {item.subItems?.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                setCurrentComponent(subItem)
                                                handleDrawerClose();
                                                setListItemColor(index);
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
        </Box >
    );

    useEffect(() => {

    }, [])

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
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
                    <CompanyLogo companyLogoHeight={companyLogoHeight} />
                    {drawer}
                    <UserProfile Width={drawerWidth} Height={150} />
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        position: 'relative',
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, minHeight: drawerHeight },
                    }}
                    open
                >
                    <CompanyLogo companyLogoHeight={companyLogoHeight} />
                    {drawer}
                    <UserProfile Width={drawerWidth} Height={`100% - ${drawerHeight}px)`} />
                </Drawer>
            </Box>


            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, position: 'relative' }}
            >
                <Toolbar />
                <Loader />
                <div role="presentation"
                    key={Math.random()}
                    onClick={handleClickBreadcrumbs}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }} >
                        <Typography color="inherit" sx={{ cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}>
                            Dashboard
                        </Typography>
                        <Typography sx={{ color: 'text.primary', cursor: 'pointer' }} onClick={() => setCurrentComponent(currentComponentName)}> {currentComponentName} </Typography>
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
                {getCurrentComponent()}
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
