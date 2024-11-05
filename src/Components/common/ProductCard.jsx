import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion'

const CardMotion = motion(Card)

export default function ProductCard({ product, buttons }) {
    return (
        <CardMotion
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 5 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            key={{ product }}
            sx={{ width: { xs: '100%', sm: 250 }, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: { xs: 0, sm: '1px 1px 5px black' }, border: { sm: 'none', xs: '1px solid gray' } }}
        >
            {
                product.inventory?.quantity === 0 ? (
                    <Stack direction="row" sx={{ color: 'red', p: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1">Out of Stock</Typography>
                        <Typography variant="body1">{product.inventory?.quantity || 0}</Typography>
                    </Stack>
                ) : (
                    <Stack direction="row" sx={{ color: 'lightgreen', p: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1">Available</Typography>
                        <Typography variant="body1">{product.inventory?.quantity || 'N/A'}</Typography>
                    </Stack>
                )
            }
            {
                product.img ? (
                    <CardMedia
                        sx={{ height: { sm: 140, xs: 120 } }}
                        image={product.img && product.img}
                    />
                ) : (
                    <Skeleton variant="rectangular" width={250} height={150} />
                )
            }
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexGrow: 1 }}>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: { sm: '1.35rem', xs: '1rem' }
                    }}>
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: { sm: '1.35rem', xs: '1rem' }
                    }}>
                        {product.price}
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: { sm: 2, xs: 1 },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: { xs: 0, sm: 'auto' },
                        maxWidth: '100%',
                    }}>
                        {product.description}
                    </Typography>
                </Box>
                <CardActions sx={{ alignSelf: 'flex-end', padding: 0, display: { xs: 'none', sm: 'block' } }}>
                    <Stack direction={{ sm: 'column', xs: 'row' }} spacing={1} ml={'auto'}>
                        {buttons && buttons.map((b, index) => (
                            <div key={index}>
                                {b}
                            </div>
                        ))}
                    </Stack>
                </CardActions>
            </CardContent>
        </CardMotion>
    );
}
