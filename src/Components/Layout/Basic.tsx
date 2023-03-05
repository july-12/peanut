import React, { useCallback, useEffect } from 'react'
import { getToken } from '@/utils/token'
import { Outlet } from 'react-router-dom'

import { store } from '@/store'

const BasicLayout = () => {
  // 获取当前用户信息
  const getUserInfo = useCallback(() => {
    store.dispatch.user.getUserInfo()
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return <Outlet />
}

export default BasicLayout
