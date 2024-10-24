import { Box, Divider } from '@mui/material'
import React from 'react'

const CompanyLogo = ({companyLogoHeight}) => {
    return (
        <Box position="sticky" zIndex={200} width={'100%'}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: companyLogoHeight,
                    backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-colored-computer-logo-template_23-2149182751.jpg)',
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    my: 3,
                }}
            />
            <Divider />
        </Box>
    )
}

export default CompanyLogo
