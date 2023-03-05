import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
  const location = useLocation()
  console.log(location)
  return <div>this is home page</div>
}

export default HomePage
