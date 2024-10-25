import { Box, Button, Container, Input, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useInfo } from '../../../Hooks/useInfo'
import { makeRequest } from '../../../Server/api/instance'

const Settings = () => {
  const [file, setFile] = useState(null)
  const { setLoader } = useInfo()
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleProfileImage = async () => {
    if (file) {
      const imgUrl = URL.createObjectURL(file)
      try {
        setLoader(true)
        await makeRequest('POST', '/assets', 'hi')
      } catch (error) {
        console.log('Failed to save Image', error)
      } finally {
        setLoader(false)
      }
    }
  }
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
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 6 }}>
          <Input type="file" onChange={handleChange} > Upload Image</Input>
          <Button onClick={handleProfileImage}>Change Image</Button>
        </Container>
      </Paper>
    </Box>
  )
}

export default Settings
