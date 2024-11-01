import { Avatar, Box, Button, Container, FormControl, Input, InputLabel, MenuItem, Paper, Select, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { makeRequest } from '../../../Server/api/instance';
import { useForm } from 'react-hook-form';
import { uploadImageToCloudinary } from '../../../Server/api/imageDb';
import { useCommon } from '../../../Hooks/common/useCommon';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PaperMotion = motion(Paper)

const UpdateProducts = ({ setCurrentComponent, value, nestation }) => {
    const { setLoader, setAlert, setConfirm } = useCommon();
    const [categories, setCat] = useState(null)
    const [imagePreview, setImagePreview] = useState(() => value?.img || null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: value?.name || '',
            description: value?.description || '',
            price: value?.price || '',
            img: value?.img || '',
            category: value?.category || ''
        }
    });

    const uploadImage = useCallback(async (file) => {
        try {
            const imgUrl = await uploadImageToCloudinary(file);
            setValue('img', imgUrl);
        } catch (error) {
            console.error('Upload failed', error);
        }
    }, [setValue]);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        setHasUnsavedChanges(true);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    }, []);

    const onSubmit = useCallback(async (formData) => {
        try {
            setLoader(true);
            setHasUnsavedChanges(false);
            if (value) {
                await makeRequest('PATCH', `/products/${value.id}`, formData);
                setAlert('Edit Success', 'success');
            } else {
                await makeRequest('POST', '/products', formData);
                setAlert('Add Success', 'success');
            }
            setCurrentComponent('Manage Products');
        } catch (error) {
            setAlert('Failed to Add', 'error');
        } finally {
            setLoader(false);
        }
    }, [value, setLoader, setAlert, setCurrentComponent]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && value) {
            e.preventDefault();
        }
    };

    const handleCancel = useCallback(() => {
        if (JSON.parse(localStorage.getItem('DataLossPrevention'))) {
            setConfirm(`Are You Sure to Cancel ${value ? 'Edit' : 'Add'} Product ?`, () => {
                setHasUnsavedChanges(false);
                setCurrentComponent('Manage Products', 2, false);
            })
        } else {
            setHasUnsavedChanges(false);
            setCurrentComponent('Manage Products', 2, false);
        }
    }, [setCurrentComponent]);

    useEffect(() => {
        if (imagePreview) {
            setValue('img', imagePreview);
        }
    }, [imagePreview, value]);

    useEffect(() => {
        if (hasUnsavedChanges) {
            localStorage.setItem('DataLossPrevention', JSON.stringify(true));
        } else {
            localStorage.setItem('DataLossPrevention', JSON.stringify(false));
        }
    }, [hasUnsavedChanges]);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const cat = await makeRequest('GET', '/categories')
                setCat(cat)
            } catch (error) {
                setAlert('Failed to load Categories', 'error')
            }
        }
        getCategory()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: 2,
                flexWrap: 'wrap'
            }}>
                {/* General Information Box */}
                <PaperMotion
                    initial={{ opacity: 0, x: -500 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .5 }}
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        flex: 1,
                        minWidth: { xs: '100%', md: 1 / 2 },
                        borderRadius: '20px'
                    }}>
                    <Typography variant='body2'>General Information</Typography>
                    <Container sx={{ paddingBottom: '10px' }}>
                        <InputLabel shrink>Product Name</InputLabel>
                        <TextField
                            {...register('name', { required: "Name is Required" })}
                            onChange={() => setHasUnsavedChanges(true)}
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
                            onChange={() => setHasUnsavedChanges(true)}
                            {...register('price', {
                                required: "Price is Required",
                                pattern: {
                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                    message: "Please Enter a Valid Price",
                                },
                            })}
                            type='number'
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
                            onChange={() => setHasUnsavedChanges(true)}
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
                </PaperMotion>
                {/* Image Upload Section */}
                <PaperMotion
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .5 }}
                    elevation={3}
                    sx={{
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
                        {value && value.img || imagePreview ? (
                            <img src={imagePreview} style={{ objectFit: 'cover', width: '100%' }} />
                        ) : (
                            <Skeleton variant="wave" sx={{
                                borderRadius: '10px',
                                height: '12rem',
                                aspectRatio: '4/4',
                            }}>
                                <Avatar />
                            </Skeleton>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}>
                            <Input type="file" onChange={handleImageChange}> Upload Image</Input>
                            {errors.img && (
                                <Typography mt={1} color="error" variant="body2">
                                    {errors.img.message}
                                </Typography>
                            )}
                            <input style={{ display: 'none', width: 0, padding: 0 }} {...register('img', { required: 'Image is Required' })} value={imagePreview || ''} />
                        </Box>
                    </Container>
                    {
                        categories && (
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    {...register('category')}
                                    label="category"
                                    defaultValue={value?.category ? value.category : 'No Category Selected'}
                                >
                                    <MenuItem value=''>None</MenuItem>
                                    {
                                        categories && categories.map((e, i) => (
                                            <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )
                    }
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={3}>
                        <Button onClick={handleCancel} type='button' variant="contained" sx={{ marginTop: '20px', textWrap: 'nowrap' }}>
                            Cancel
                        </Button>
                        <Button disabled={isSubmitting} type='submit' variant="contained" sx={{ marginTop: '20px', textWrap: 'nowrap' }}>
                            {isSubmitting ? 'Loading...' : value ? 'Save Changes' : 'Add Product'}
                        </Button>
                    </Box>
                </PaperMotion>
            </Box>
        </form>
    );
};

export default UpdateProducts;
