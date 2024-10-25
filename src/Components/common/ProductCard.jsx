import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';

export default function ProductCard({ product, buttons }) {
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        const checkUrl = async () => {
            try {
                await fetch(product.img)
            } catch (error) {
                setError(error)
            }
        }
        checkUrl()
    }, [product])

    return (
        <Card sx={{ maxWidth: 250, minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
            {
                product.img && !error ? (
                    <CardMedia
                        sx={{ height: 140 }}
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
                        textOverflow: 'ellipsis'
                    }}>
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {product.price}
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}>
                        {product.description}
                    </Typography>
                </Box>
                <CardActions sx={{ alignSelf: 'flex-start', padding: 0 }}>
                    <Stack direction={'column'} spacing={1} ml={'auto'}>
                        {buttons && buttons.map((b, index) => (
                            <div key={index}>
                                {b}
                            </div>
                        ))}
                    </Stack>
                </CardActions>
            </CardContent>


        </Card>
    );
}
