import React, { useEffect, useState } from 'react'
import ProductCard from '../../../Components/common/ProductCard'
import { makeRequest } from '../../../Server/api/instance'
import { useInfo } from '../../../Hooks/useInfo'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setNestedComponent, setValues } from '../../../redux/Reducers/currentComponentSlice'

const Products = () => {
  const [products, setProducts] = useState(null)
  const { setLoader, setAlert, setConfirm } = useInfo()
  const dispatch = useDispatch()


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
        <Button onClick={() => dispatch(setNestedComponent('Add Product'))} sx={{ mb: 5 }} >Add Product</Button>
        <RefreshIcon onClick={loadProducts} sx={{ ml: 'auto', cursor: 'pointer' }} />
      </Box>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
        {
          products && products.map((product, index) => (
            <ProductCard key={index} product={product} buttons={[
              (<Button onClick={() => deleteProduct(product.id)} > <DeleteIcon /> </Button>),
              (<Button onClick={() => {
                dispatch(setNestedComponent('Edit Product'))
                dispatch(setValues(product))
              }} ><EditIcon /></Button>)
            ]} />
          ))
        }
      </Box >
    </>
  )
}

export default Products
