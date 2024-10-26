import { Box, Divider, Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import { makeRequest } from '../../Server/api/instance';
import { useUser } from '../../Hooks/custom/useUser';
import { useCommon } from '../../Hooks/common/useCommon';

const CompanyLogo = ({ companyLogoHeight }) => {
    const { logo , setLogo } = useUser();
    const {setAlert, setLoader} = useCommon();
    useEffect(() => {
        const fetchLogo = async () => {
            try {
                setLoader(true);
                const response = await makeRequest('GET', '/assets');
                if (response && response[0] && response[0].imgData) {
                    setLogo(response[0].imgData);
                }
            } catch (error) {
                setAlert('Failed to Load Image', 'error');
                console.log('Failed to load image', error);
            } finally {
                setLoader(false);
            }
        }
        fetchLogo()
    }, [logo])
    return (
        <Box position="sticky" zIndex={200} width={'100%'}>
            {logo ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: companyLogoHeight,
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100%",
                        my: 3,
                    }}
                />
            ) : (
                <Skeleton variant="rectangular" height={150} />
            )}
            <Divider />
        </Box>
    );
};

export default CompanyLogo;
