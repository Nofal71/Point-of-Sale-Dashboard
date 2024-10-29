// src/components/Settings.js
import { Box, Button, Collapse, Container, Input, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useSettings } from '../../../Hooks/custom/useSetting';
import AddIcon from '@mui/icons-material/Add';
import { TransitionGroup } from 'react-transition-group';

const Settings = () => {
  const {
    categories,
    newCategory,
    setNewCategory,
    imageRef,
    handleChange,
    handleDeleteCategory,
    handleAddCategory,
    handleProfileImage,
  } = useSettings();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={4} sx={{ p: 4 }}>
      <Paper elevation={4} sx={{
        borderRadius: '12px',
        width: { xs: '100%', md: '40%' },
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        p: 4,
        mb: 4,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 4
        }}>
          <Input
            type="file"
            inputRef={imageRef}
            onChange={handleChange}
            disableUnderline
            sx={{ mb: 2, width: '100%' }}
          />
          <Button variant="contained" onClick={handleProfileImage} sx={{ py: 1.2, px: 5 }}>
            Change Image
          </Button>
        </Container>
      </Paper>


      <Paper elevation={4} sx={{
        borderRadius: '12px',
        width: { xs: '100%', md: '40%' },
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 4,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 4
        }}>
          <Stack direction="column" justifyContent="flex-start" sx={{ width: '100%' }}>
            <InputLabel sx={{ fontWeight: 'bold', mb: 1 }}>Add Categories</InputLabel>
            <Box display="flex" justifyContent="center" gap={4} alignItems="center">
              <TextField
                type="text"
                fullWidth
                placeholder="Enter Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button  onClick={handleAddCategory} >
                <AddIcon />
              </Button>
            </Box>
          </Stack>

          <TransitionGroup style={{ width: '100%' }} >
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
                  <Button sx={{ ml: 'auto' }} onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        </Container>
      </Paper>
    </Box>
  );
};

export default Settings;
