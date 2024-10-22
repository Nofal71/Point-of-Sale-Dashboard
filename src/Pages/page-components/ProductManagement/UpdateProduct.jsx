import { Button, Container, InputLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useInfo } from '../../../Hooks/useInfo';
import { makeRequest } from '../../../Server/api/instance';
import { useForm } from 'react-hook-form';
import { setName, setValues } from '../../../redux/Reducers/currentComponentSlice';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProducts = () => {
    const { setLoader, setAlert } = useInfo();
    const product = useSelector(state => state.currentSelection.values)
    const dispatch = useDispatch()
    const setDefaultValue = () => {
        return {
            name: product.name,
            description: product.description,
        }
    }
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        defaultValues: product && setDefaultValue()
    })

    const onSubmit = async (value) => {
        try {
            setLoader(true);
            if (product) {
                const data = await makeRequest('PUT', `/products/${product.id}`, value)
                setAlert('Edit Success', 'success');
            } else {
                const data = await makeRequest('POST', '/products', value);
                setAlert('Add Success', 'success');
            }
            dispatch(setName('Products'))
            dispatch(setValues(null))
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
                    {isSubmitting ? 'Loading...' : product ? 'Edit Product' : 'Add Product'}
                </Button>
            </Stack>
        </form>
    );
};

export default UpdateProducts;
