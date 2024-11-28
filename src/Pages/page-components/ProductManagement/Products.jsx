import React from 'react';
import ProductCard from '../../../Components/common/ProductCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useProducts } from '../../../Hooks/custom/useProducts.js';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const Products = ({ setCurrentComponent, setValues }) => {
  const {
    products,
    input,
    sort,
    isPending,
    handleSorting,
    searchProducts,
    loadProducts,
    deleteProduct,
  } = useProducts();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => {
            setValues(null);
            setCurrentComponent('Add Product', -1, true);
          }}
          sx={{ mb: 2 }}
        >
          Add Product
        </Button>
        <RefreshIcon
          onClick={() => {
            loadProducts();
          }}
          sx={{ ml: 'auto', cursor: 'pointer' }}
        />
      </Box>
      <Box
        sx={{
          mr: 4,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          label="Search"
          variant="standard"
          size="small"
          defaultValue={
            localStorage.getItem('cached') &&
            JSON.parse(localStorage.getItem('cached'))
          }
          onChange={searchProducts}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            onChange={handleSorting}
            sx={{ minWidth: '7rem' }}
          >
            <MenuItem value={'LowPrice'}>Lower Price First</MenuItem>
            <MenuItem value={'HighPrice'}>Higher Price First</MenuItem>
            <MenuItem value={'Name'}>Alphabetically Ordered</MenuItem>
            <MenuItem value={'stock'}>Understocked</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: { xs: 'grid', sm: 'flex' },
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 0 },
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: { sm: 3, xs: 0 },
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}
      >

        <Box sx={{ textAlign: 'center', width: '100%', opacity: isPending ? '1' : '0' }}>
          <LinearProgress color="primary" />
        </Box>
        {
          products && products.length > 0 ?
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                buttons={[
                  <Button
                    onClick={() => {
                      setCurrentComponent('Edit Product', -1, true);
                      setValues(product);
                      localStorage.setItem('cached', JSON.stringify(input));
                    }}
                  >
                    <EditIcon />
                  </Button>,
                  <Button
                    onClick={() => deleteProduct(product.id)}
                    variant="contained"
                    color="error"
                    sx={{
                      ':hover': {
                        backgroundColor: 'red !important',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </Button>,
                ]}
              />
            ))
            : (
              <Box >
                <Typography> No Product Found </Typography>
              </Box>
            )
        }
      </Box>
    </>
  );
};

export default Products;
