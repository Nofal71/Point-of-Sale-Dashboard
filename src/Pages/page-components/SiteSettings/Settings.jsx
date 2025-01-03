import React, { useRef, useState } from 'react';
import { useSettings } from '../../../Hooks/custom/useSetting';
import AddIcon from '@mui/icons-material/Add';
import { TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Button, Collapse, Container, Divider, Icon, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import { Add, Delete, Edit, PhotoCamera, Save } from '@mui/icons-material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = useState(0);
  const siteNameRef = useRef(null)
  const setCategoryRef = useRef(null)

  const handleChangeEvent = (event, newValue) => {
    setValue(newValue);
  };

  const {
    logo,
    companyName,
    categories,
    handleAdminSiteName,
    handleDeleteCategory,
    handleAddCategory,
    handleProfileImage,
  } = useSettings();

  return (
    <Paper elevation={4} sx={{ width: '100%', p: 2 }}>
      <Typography variant='h5'>Site Essentials</Typography>
      <Stack spacing={2} direction={'row'} alignContent={'center'} justifyContent={'center'} >
        <Tabs value={value} onChange={handleChangeEvent} aria-label="basic tabs example">
          <Tab label="Admin Site" {...a11yProps(0)} />
          <Tab label="Site Setting" {...a11yProps(1)} />
        </Tabs>
      </Stack>
      <Divider />
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ p: 1 }}>
          <InputLabel>Site Name</InputLabel>
          <TextField
            sx={{ m: 1 }}
            fullWidth
            defaultValue={companyName}
            inputRef={siteNameRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleAdminSiteName(siteNameRef.current.value)} edge="end">
                    <Save />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                height: '40px',
              },
            }}
          />
        </Box>
        <Box sx={{ p: 1 }}>
          <InputLabel>Site Logo</InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
            <img src={logo} alt="Site Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            <Button
              component="label"
              variant="outlined"
              sx={{ background: 'transparent', color: 'white', flex: 1 }}
            >
              <PhotoCamera sx={{ mr: 1 }} /> Upload Logo
              <input
                type="file"
                accept='image/*'
                onChange={handleProfileImage}
                hidden
              />
            </Button>
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ p: 1 }}>
          <InputLabel>Add Category</InputLabel>
          <TextField
            sx={{ m: 1 }}
            fullWidth
            inputRef={setCategoryRef}
            placeholder='Add category here'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCategory(setCategoryRef.current.value)
                setCategoryRef.current.value = ''
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {
                    handleAddCategory(setCategoryRef.current.value)
                    setCategoryRef.current.value = ''
                  }
                  } edge="end">
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                height: '40px',
              },
            }}
          />
        </Box>
        <TransitionGroup style={{ width: '100%', padding: '10px' }} >
          {categories && categories.map((category, index) => (
            <Collapse sx={{ width: 1 }} key={index}>
              <Box display="flex" justifyContent="flex-start" alignItems="center" width={1} sx={{ mt: 2 }}>
                <Typography sx={{
                  borderRadius: '8px',
                  mb: 1,
                  cursor: 'pointer',
                  flex: 1
                }}>
                  {category.name}
                </Typography>
                <Button sx={{ ml: 'auto' }} variant='outlined' color='error' onClick={() => handleDeleteCategory(category.id)}>
                  <Delete />
                </Button>
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
      </CustomTabPanel>
    </Paper>
  );
}
