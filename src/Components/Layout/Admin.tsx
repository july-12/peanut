import React, { useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { RootState } from '@/store'
import { IUser } from '@/models/user'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Content from '@/Components/Layout/Content'
import Slider from '@/Components/Layout/Slider'

interface IProps {
  fetched: boolean
  currentUser?: IUser
}
const AdminLayout = ({ fetched, currentUser }: IProps) => {
  const navigate = useNavigate()
  const authorized = fetched && currentUser
  useEffect(() => {
    if (fetched && !currentUser) {
      navigate('/forbidden')
    }
  }, [fetched, currentUser])

  return (
    <Layout direction="vertical">
      <Header />
      <Content>
        <Slider>Slider</Slider>
        <main className="layout-content-container">{authorized && <Outlet />}</main>
      </Content>
    </Layout>
  )
}

const mapState = (state: RootState) => ({
  currentUser: state.user.currentUser,
  fetched: state.user.fetched
})
export default connect(mapState)(AdminLayout)
