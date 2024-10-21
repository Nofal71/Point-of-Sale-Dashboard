import React, { useEffect } from 'react'
import { useInfo } from '../../../Hooks/useInfo'

const Placed = () => {
  const { setLoader } = useInfo()
  useEffect(() => {
    setLoader(true)
  }, [])
  return (
    <div>
      Placed Orders
    </div>
  )
}

export default Placed
