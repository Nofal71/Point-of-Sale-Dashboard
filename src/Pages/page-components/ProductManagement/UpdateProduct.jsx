import { Avatar, Box, Button, Container, Input, InputLabel, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useInfo } from '../../../Hooks/useInfo';
import { makeRequest } from '../../../Server/api/instance';
import { useForm } from 'react-hook-form';
import { setName, setValues } from '../../../redux/Reducers/currentComponentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageToCloudinary } from '../../../Server/api/imageDb';


const UpdateProducts = () => {
    const { setLoader, setAlert } = useInfo();
    const product = useSelector(state => state.currentSelection.values)
    const dispatch = useDispatch()
    const [imagePreview, setImagePreview] = useState(() => {
        return product?.img ? product.img : null
    });
    const setDefaultValue = () => {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            img: product.img
        }
    }
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, setError } = useForm({
        defaultValues: product && setDefaultValue()
    })

    const uploadImage = async (file) => {
        if (imagePreview) {
            try {
                const imgUrl = await uploadImageToCloudinary(file);
                setValue('img', imgUrl);
            } catch (error) {
                console.log('upload failed', error)
            }
        }
    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            uploadImage(file)
        }
    };



    const onSubmit = async (value) => {
        try {
            setLoader(true);
            if (product) {
                await makeRequest('PATCH', `/products/${product.id}`, value)
                setAlert('Edit Success', 'success');
            } else {
                await makeRequest('POST', '/products', value);
                setAlert('Add Success', 'success');
            }
            dispatch(setName('Products'))
            dispatch(setValues(null))
        } catch (error) {
            setAlert('Failed to Add', 'error');
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (imagePreview) {
            setValue('img', imagePreview);
        }
    }, [imagePreview, product])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: 2,
                flexWrap: 'wrap'
            }}>
                {/* General Information Box */}
                <Paper elevation={1}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        flex: 1,
                        minWidth: { xs: '100%', md: 1 / 2 }
                    }}
                >
                    <Typography variant='body2'>General Information</Typography>
                    <Container sx={{ paddingBottom: '10px' }}>
                        <InputLabel shrink>Product Name</InputLabel>
                        <TextField
                            {...register('name', { required: "Name is Required" })}
                            type='text'
                            fullWidth
                            placeholder='Enter Your Product Name'
                        />
                        {errors.name && (
                            <Typography mt={1} color="error" variant="body2">
                                {errors.name.message}
                            </Typography>
                        )}
                    </Container>
                    <Container sx={{ paddingBottom: '10px' }}>
                        <InputLabel shrink>Product Price</InputLabel>
                        <TextField
                            {...register('price', {
                                required: "Price is Required", pattern: {
                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                    message: "Please Enter a Valid Price",
                                },
                            })}
                            type='text'
                            fullWidth
                            placeholder='Enter Price'
                        />
                        {errors.price && (
                            <Typography mt={1} color="error" variant="body2">
                                {errors.price.message}
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
                            multiline
                            rows={3}
                        />
                        {errors.description && (
                            <Typography mt={1} color="error" variant="body2">
                                {errors.description.message}
                            </Typography>
                        )}
                    </Container>

                </Paper>
                <Paper elevation={1} sx={{
                    minWidth: { xs: '100%', md: 1 / 4 },
                    maxWidth: 1 / 3,
                    textAlign: 'center'
                }}>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 5 }}>
                        {
                            product && product.img || imagePreview ? (
                                <img src={imagePreview} style={{ objectFit: 'cover', width: '100%' }} />
                            ) : (
                                <Skeleton variant="wave">
                                    <Avatar sx={{
                                        width: '100%',
                                        height: '12rem',
                                        aspectRatio: '4/4'
                                    }} />

                                </Skeleton>
                            )

                        }
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}>
                            <Input type="file" onChange={handleImageChange} > Upload Image</Input>
                            <input style={{ display: 'none', width: 0, padding: 0 }} {...register('img', { required: 'Image is Required' })} value={imagePreview || ''} />
                            {errors.img && (
                                <Typography mt={1} color="error" variant="body2">
                                    {errors.img.message}
                                </Typography>
                            )}
                        </Box>
                    </Container>
                    <Button disabled={isSubmitting} type='submit' variant="contained" sx={{ marginTop: '20px' }}>
                        {isSubmitting ? 'Loading...' : product ? 'Edit Product' : 'Add Product'}
                    </Button>
                </Paper>
            </Box>
        </form>

    );
};

export default UpdateProducts;
