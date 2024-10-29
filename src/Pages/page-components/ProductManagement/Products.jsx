import React, { useEffect, useState } from 'react'
import ProductCard from '../../../Components/common/ProductCard'
import { makeRequest } from '../../../Server/api/instance'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useCommon } from '../../../Hooks/common/useCommon';

const Products = ({ setCurrentComponent, setValues, setNestaion }) => {
  const [products, setProducts] = useState(null)
  const { setLoader, setAlert, setConfirm } = useCommon()
  const [filteredData, setFilterData] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const searchProducts = async (e) => {
    const value = e.target.value.trim();
    if (value === '') {
      setFilterData(products);
      return;
    }
  
    try {
      const data = await makeRequest('GET', `products?name=${value}&description=${value}`);
      setFilterData(data || []);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setFilterData([]);
    }
    console.log(filteredData, 'Filtered Data');
  };
  


  const loadProducts = async () => {
    try {
      setLoader(true)
      const data = await makeRequest('GET', '/products')
      setProducts(data)
    } catch (error) {
      console.log(error, "Error in Fetching Data")
      setAlert('Data Load failed', 'error')
    } finally {
      setLoader(false)
    }
  }

  const deleteProduct = (productId) => {
    setConfirm('Are You Sure To Delete This Product ?', async () => {
      try {
        await makeRequest('DELETE', `products/${productId}`)
        setAlert('Product Deleted', 'info')
        loadProducts()
      } catch (error) {
        console.log(error, 'Error in Deleting Product')
      } finally {
        setLoader(false)
      }
    })
  }

  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => {
          setValues(null)
          setNestaion(true)
          setCurrentComponent('Add Product')
        }} sx={{ mb: 2 }} >Add Product</Button>
        <RefreshIcon onClick={loadProducts} sx={{ ml: 'auto', cursor: 'pointer' }} />
      </Box>
      <Box sx={{
        mr: 4,
        mb: 3,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2
      }}>
        <TextField label="Search"  variant="standard" size='small' />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Select Filter"
            onChange={handleFilter}
          >
            <MenuItem value={'Price'}>Price</MenuItem>
            <MenuItem value={'Name'}>Name</MenuItem>
            <MenuItem value={'Category'}>Category</MenuItem>
          </Select>
        </FormControl>
      </Box>


      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
        {
          products && products.map((product, index) => (
            <ProductCard key={index} product={product} buttons={[
              (<Button onClick={() => deleteProduct(product.id)} > <DeleteIcon /> </Button>),
              (<Button onClick={() => {
                setCurrentComponent('Edit Product')
                setValues(product)
                setNestaion(true)
              }} ><EditIcon /></Button>)
            ]} />
          ))
        }
      </Box >
    </>
  )
}

export default Products
