import React, { useEffect, useState } from 'react'
import ProductCard from '../../../Components/common/ProductCard'
import { makeRequest } from '../../../Server/api/instance'
import { useInfo } from '../../../Hooks/useInfo'
import ModalComponent from '../../../Components/common/ModalComponent'
import DeleteProduct from './DeleteProduct'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setNestedComponent, setValues } from '../../../redux/Reducers/currentComponentSlice'

const Products = () => {
  const [products, setProducts] = useState(null)
  const { setLoader, setAlert } = useInfo()
  const name = useSelector(state => state.currentSelection.name)
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
  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <>
      <Button onClick={() => dispatch(setNestedComponent('Add Product'))} >Add Product</Button>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
        {
          products && products.map((product, index) => (
            <ProductCard key={index} product={product} buttons={[
              (<ModalComponent reCall={loadProducts} component={(<DeleteProduct productId={product.id} />)} lable={(<DeleteIcon />)} buttonVariant={'text'} />),
              (<Button onClick={() =>{ 
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
