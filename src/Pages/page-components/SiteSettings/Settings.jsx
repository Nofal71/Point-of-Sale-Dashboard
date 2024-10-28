// src/components/Settings.js
import { Box, Button, Container, Input, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useSettings } from '../../../Hooks/custom/useSetting';
import AddIcon from '@mui/icons-material/Add';

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
              <AddIcon onClick={handleAddCategory} />
            </Box>
          </Stack>
          {categories && categories.map((category, index) => (
            <Box display="flex" justifyContent="flex-start" alignItems="center" width={1} key={index}>
              <Typography sx={{
                width: '100%',
                borderRadius: '8px',
                mb: 1,
                cursor: 'pointer',
                flex: 1
              }}>
                {category.name}
              </Typography>
              <Button onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
            </Box>
          ))}
        </Container>
      </Paper>
    </Box>
  );
};

export default Settings;
