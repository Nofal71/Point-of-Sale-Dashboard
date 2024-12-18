import React, { useEffect, useReducer, useState } from 'react';
import AppBarComponent from './AppBarComponent';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { tabs } from '../Tabs/DashboardTabs';
import { Loader } from '../common/Loader';
import CompanyLogo from './CompanyLogo';
import { CurrentComponent } from '../Tabs/DashBoardComponents';
import { useCommon } from '../../Hooks/common/useCommon';
import BreadcrumbsNav from '../common/BreadcrumbsNav';
import { Divider } from '@mui/material';
import AdminProfile from './AdminProfile';

const drawerWidth = 240;
const drawerHeight = 500;
const companyLogoHeight = 100;

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = useState(defaultExpanded);
    useEffect(() => {
        open && setTimeout(() => setOpen(false), 20000);
    }, [open]);
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
                <Box>{children}</Box>
            </motion.div>
        </React.Fragment>
    );
}

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [value, setValue] = useState(null)
    const { setConfirm, setLoader } = useCommon()

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [nestation, setNestation] = useState(null)

    const initialComponent = 'Dashboard';

    const [currentComponentName, dispatch] = useReducer((state, action) => {
        const { index, name, isNested } = action;
        setLoader(false);
        setMobileOpen(false)
        if (!JSON.parse(localStorage.getItem('DataLossPrevention'))) {
            setNestation(isNested);
            index !== -1 && setSelectedIndex(index);
            if (name !== state) {
                return name;
            }
        } else {
            const process = () => {
                setNestation(isNested);
                localStorage.setItem('DataLossPrevention', JSON.stringify(false));
                setSelectedIndex(index);
                dispatch({ index, name });
            };
            setConfirm('Are You Sure to Lose All Progress', process);
        }
        return state;
    }, initialComponent);

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
                                    onClick={() => { dispatch({ type: 'SET_CURRENT_COMPONENT', name: item.name, index, isNested: false }) }}
                                >
                                    <ListItemText sx={{ color: selectedIndex === index ? '#0000f5' : 'inherit' }} primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            <Toggler
                                renderToggle={({ open, setOpen }) => (
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => setOpen(!open)}>
                                            <ListItemText sx={{ color: selectedIndex === index ? '#0000f5' : 'inherit' }} primary={item.name} />
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            >
                                {item.subItems?.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding>
                                        <ListItemButton
                                            onClick={() => { dispatch({ type: 'SET_CURRENT_COMPONENT', name: subItem, index, isNested: false }) }}
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
        </Box>
    );

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
                    <AdminProfile Width={drawerWidth} Height={150} />
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
                    <AdminProfile Width={drawerWidth} Height={`100% - ${drawerHeight}px)`} />
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, position: 'relative' }}
            >
                <Toolbar />
                <Loader />
                <BreadcrumbsNav currentComponentName={currentComponentName} nesting={nestation} setCurrentComponentName={(name, index, isNested) => dispatch({ type: 'SET_CURRENT_COMPONENT', name, index, isNested })} />
                <Divider sx={{ my: 1 }} />

                <motion.div
                    key={currentComponentName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: .4, ease: 'easeIn' }}
                    style={{ padding: 0 }}
                >
                    <CurrentComponent
                        selectOption={currentComponentName}
                        setCurrentComponent={(name, index, isNested) => dispatch({ type: 'SET_CURRENT_COMPONENT', name, index, isNested })}
                        setValues={setValue}
                        currentComponentName={currentComponentName}
                        value={value}
                    />
                </motion.div>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
