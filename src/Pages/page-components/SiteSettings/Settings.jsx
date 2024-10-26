import { Box, Button, Container, Input, Paper } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useInfo } from '../../../Hooks/useInfo'
import { makeRequest } from '../../../Server/api/instance'
import { useCustoms } from '../../../Hooks/useCustom';

const Settings = () => {
  const [file, setFile] = useState(null);
  const imageRef = useRef();
  const { setLoader } = useInfo();
  const { setLogo } = useCustoms();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileImage = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        setLoader(true);

        try {
          await makeRequest('PATCH', '/assets/48c4', { imgData: base64String });
          setLogo(base64String)
        } catch (error) {
          console.log('Failed to save image', error);
        } finally {
          setLoader(false);
          setFile(null);
          imageRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{
        borderRadius: '20px',
        minWidth: { xs: '100%', md: 1 / 4 },
        maxWidth: 1 / 3,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        p: 4
      }}>
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 6
        }}>
          <Input
            type="file"
            inputRef={imageRef}
            onChange={handleChange}
            disableUnderline
          />
          <Button variant="contained" onClick={handleProfileImage}>
            Change Image
          </Button>
        </Container>
      </Paper>
    </Box>
  );
};

export default Settings;
