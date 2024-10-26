import React, { useEffect } from 'react'
import { useCommon } from '../../../Hooks/common/useCommon'

const Placed = () => {
  const { setLoader } = useCommon()
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
