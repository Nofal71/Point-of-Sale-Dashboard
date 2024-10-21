import React from 'react'
import { makeRequest } from '../../../Server/api/instance'
import { useInfo } from '../../../Hooks/useInfo'
import { Box, Button, Stack, Typography } from '@mui/material'

const DeleteProduct = ({ handleClose, productId }) => {
    const { setLoader, setAlert } = useInfo()

    const deleteProduct = async () => {
        try {
            setLoader(true)
            await makeRequest('DELETE', `products/${productId}`)
            setAlert('Product Deleted', 'info')
            handleClose()
        } catch (error) {
            console.log(error, 'Error in Deleting Product')
        } finally {
            setLoader(false)
        }
    }
    return (
        <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Typography variant='h6'>Are You Sure To Delete Selected Product</Typography>
            <Stack direction={'row'} spacing={3} ml={'auto'}>
                <Button variant='contained' onClick={() => handleClose()} >No</Button>
                <Button variant='contained' onClick={deleteProduct} >Yes</Button>
            </Stack>
        </Box>
    )
}

export default DeleteProduct
