import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getToken } from '@/utils/token'
import request from '@/utils/request'

const HomePage = () => {
  const location = useLocation()
  console.log(location)

  const loaderData = async () => {
    const token = getToken()
    if(token) {
        // const res: any = await request.get('/api/user_info')
        // console.log(res)
    }
  }
  useEffect(() => {
    loaderData()
  }, [])
  return <div>this is home page</div>
}

export default HomePage
