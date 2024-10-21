import { Button, Container, InputLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useInfo } from '../../../Hooks/useInfo';
import { makeRequest } from '../../../Server/api/instance';
import { useForm } from 'react-hook-form';

const AddProducts = ({ handleClose }) => {
    const { setLoader, setAlert } = useInfo();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()

    const onSubmit = async (product) => {
        try {
            setLoader(true);
            const data = await makeRequest('POST', '/products',  product );
            setAlert('Add Success', 'success');
            handleClose();
        } catch (error) {
            console.log(error, 'Error in Adding Product');
            setAlert('Failed to Add', 'error');
        } finally {
            setLoader(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Container sx={{ paddingBottom: '10px' }}>
                    <InputLabel shrink>Product Name</InputLabel>
                    <TextField
                        {...register('name', { required: "Name is Required" })}
                        type='text'
                        fullWidth
                        placeholder='Enter Your Product Name'
                    />
                    {errors.name && (
                        <Typography color="error" variant="body2">
                            {errors.name.message}
                        </Typography>
                    )}
                </Container>
                <Container sx={{ paddingBottom: '10px' }}>
                    <InputLabel shrink>Product Description</InputLabel>
                    <TextField
                        {...register('description', { required: "Description is Required" })}
                        type='text'
                        fullWidth
                        placeholder='Enter Description'
                    />
                    {errors.description && (
                        <Typography color="error" variant="body2">
                            {errors.description.message}
                        </Typography>
                    )}
                </Container>
                <Button disabled={isSubmitting} type='submit' variant="contained" color="primary" sx={{ marginTop: '20px', width: '100%' }}>
                    {isSubmitting ? 'Loading...' : 'Add Product'}
                </Button>
            </Stack>
        </form>
    );
};

export default AddProducts;
