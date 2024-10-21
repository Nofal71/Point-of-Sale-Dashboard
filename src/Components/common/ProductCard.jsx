import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProductCard({ product, buttons }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={product.image && product.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.data}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                {buttons && buttons.map((b) => (
                    <div>
                        {b}
                    </div>
                ))}
            </CardActions>
        </Card>
    );
}
