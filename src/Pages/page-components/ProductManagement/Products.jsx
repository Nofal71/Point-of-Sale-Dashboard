import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductCard from '../../../Components/common/ProductCard'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useProducts } from '../../../Hooks/custom/useProducts.js';
import { Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

const Products = ({ setCurrentComponent, setValues }) => {

  const {
    products,
    progress,
    input,
    sort,
    displaySearchText,
    handleSorting,
    searchProducts,
    loadProducts,
    deleteProduct,
  } = useProducts()

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => {
          setValues(null)
          setCurrentComponent('Add Product', -1, true)
        }} sx={{ mb: 2 }} >Add Product</Button>
        <RefreshIcon onClick={loadProducts} sx={{ ml: 'auto', cursor: 'pointer' }} />
      </Box>
      <Box sx={{
        mr: 4,
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
      }}>
        <TextField
          label="Search"
          variant="standard"
          size="small"
          defaultValue={localStorage.getItem('cached') && JSON.parse(localStorage.getItem('cached'))}
          onChange={searchProducts}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {progress ? <CircularProgress size={20} color="primary" /> : <CircularProgress size={20} sx={{ opacity: 0 }} color="primary" />}
              </InputAdornment>
            ),
          }}
        />
        <FormControl >
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Filter"
            onChange={handleSorting}
            sx={{ minWidth: '7rem' }}
          >
            <MenuItem value={'Price'}>Price</MenuItem>
            <MenuItem value={'Name'}>Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant='body1' component='h4' ref={displaySearchText} ></Typography>


      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
        {
          products && products.map((product, index) => (
            <ProductCard key={index} product={product} buttons={[
              (<Button onClick={() => {
                setCurrentComponent('Edit Product', -1, true)
                setValues(product)
                localStorage.setItem('cached', JSON.stringify(input))
              }} ><EditIcon /></Button>),
              (<Button onClick={() => deleteProduct(product.id)}
                variant='contained' color='error'
                sx={{
                  ":hover": {
                    backgroundColor: 'red !important'
                  }
                }}  > <DeleteIcon /> </Button>),
            ]} />
          ))
        }
      </Box >
    </>
  )
}

export default Products
