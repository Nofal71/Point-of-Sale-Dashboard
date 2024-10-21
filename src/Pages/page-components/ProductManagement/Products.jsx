import React, { useEffect, useState } from 'react'
import ProductCard from '../../../Components/common/ProductCard'
import { makeRequest } from '../../../Server/api/instance'
import { useInfo } from '../../../Hooks/useInfo'
import ModalComponent from '../../../Components/common/ModalComponent'
import AddProducts from './AddProduct'
import DeleteProduct from './DeleteProduct'

const Products = () => {
  const [products, setProducts] = useState(null)
  const { setLoader, setAlert } = useInfo()

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
      <ModalComponent reCall={loadProducts} component={(<AddProducts />)} lable={'Add Product'} buttonVariant={'text'} />
      {
        products && products.map((product, index) => (
          <ProductCard key={index} product={product} buttons={[
            (<ModalComponent reCall={loadProducts} component={(<DeleteProduct productId={product.id} />)} lable={'Delete Product'} buttonVariant={'text'} />)
          ]} />
        ))
      }
    </>
  )
}

export default Products
