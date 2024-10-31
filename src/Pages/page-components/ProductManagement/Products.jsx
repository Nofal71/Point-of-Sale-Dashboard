import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductCard from '../../../Components/common/ProductCard'
import { makeRequest } from '../../../Server/api/instance'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useCommon } from '../../../Hooks/common/useCommon';

const Products = ({ setCurrentComponent, setValues, setNestaion, currentComponentName }) => {
  const [products, setProducts] = useState(null)
  const { setLoader, setAlert, setConfirm } = useCommon()
  const [sort, setSorting] = useState('')
  const [progress, setProgress] = useState(false)
  const [saveProducts, setSave] = useState(null)
  const [input, saveInput] = useState(null)
  const displaySearchText = useRef('')

  const handleSorting = (e) => {
    setSorting(e.target.value);
    const sortedProducts = [...products];
    if (e.target.value === 'Price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (e.target.value === 'Name') {
      sortedProducts.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    setProducts(sortedProducts);
  }


  const searchData = async (inputValue) => {
    try {
      setProgress(true)
      const search = await makeRequest('GET', '/products');
      const nameData = search?.filter((e) => e.name.toLowerCase().includes(inputValue) || e.name.toLowerCase() === inputValue);
      const desData = search?.filter((e) => e.description.toLowerCase().includes(inputValue) || e.description.toLowerCase() === inputValue);
      const filteredData = [...new Set([...nameData, ...desData])];
      return filteredData;
    } catch (error) {
      console.log(error, 'error');
      return [];
    } finally {
      setProgress(false)
    }
  };

  const searchProducts = (e) => {
    const inputValue = JSON.parse(localStorage.getItem('cached')) ? JSON.parse(localStorage.getItem('cached')) : e.target.value.toLowerCase();
    displaySearchText.current.innerText = ''
    if (inputValue === '') return setProducts(saveProducts)
    searchData(inputValue).then((filteredData) => {
      setProducts(filteredData);
      saveInput(inputValue)
      displaySearchText.current.innerText = `Searched results for ${e.target.value} : `
    });
  };

  const loadProducts = useCallback(async () => {
    setSorting('')
    try {
      setLoader(true)
      const data = await makeRequest('GET', '/products')
      setSave(data)
      setProducts(data)
    } catch (error) {
      console.log(error, "Error in Fetching Data")
      setAlert('Data Load failed', 'error')
    } finally {
      setLoader(false)
    }
  }, [setProducts])

  const deleteProduct = useCallback((productId) => {
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
  }, [setProducts])

  useEffect(() => {
    loadProducts();
    JSON.parse(localStorage.getItem('cached')) && searchProducts(JSON.parse(localStorage.getItem('cached')))
    localStorage.clear('cached')
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => {
          setValues(null)
          setNestaion(true)
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
              (<Button onClick={() => deleteProduct(product.id)} > <DeleteIcon /> </Button>),
              (<Button onClick={() => {
                setCurrentComponent('Edit Product', -1, true)
                setValues(product)
                setNestaion(true)
                localStorage.setItem('cached', JSON.stringify(input))
              }} ><EditIcon /></Button>)
            ]} />
          ))
        }
      </Box >
    </>
  )
}

export default Products
