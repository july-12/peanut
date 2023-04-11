import React, { useEffect } from 'react'
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '@/store'
import { IUser } from '@/models/user'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'

import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Content from '@/Components/Layout/Content'
import Slider from '@/Components/Layout/Slider'
import Icon from '../Icon'

interface IProps {
  fetched: boolean
  currentUser?: IUser
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const prefix = '/admin'
const defaultSelectedKeys = `${prefix}/dashboard`
const Nav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const items: MenuItem[] = [
    getItem('Dashboard', defaultSelectedKeys, <Icon symbol="icon-dashboard" />),
    getItem('课程', `${prefix}/classes`, <Icon symbol="icon-kechengbiao" />),
    getItem('用户', `${prefix}/users`, <Icon symbol="icon-user" />),
    getItem('设置', `${prefix}/setting`, <Icon symbol="icon-setting" />)
  ]

  const handleClick = (item: any) => {
    navigate(item.key)
  }

  return (
    <Menu
      style={{ height: '100%' }}
      onClick={handleClick}
      selectedKeys={[location.pathname || '']}
      defaultSelectedKeys={['1']}
      mode="inline"
      // inlineCollapsed={collapsed}
      items={items}
    />
  )
}
const AdminLayout = ({ fetched, currentUser }: IProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const authorized = fetched && currentUser
  useEffect(() => {
    if (fetched && !currentUser) {
      navigate('/forbidden')
    }
  }, [fetched, currentUser])

  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate(defaultSelectedKeys)
    }
  }, [location.pathname])

  return (
    <Layout direction="vertical">
      <Header />
      <Content>
        <Slider>
          <Nav />
        </Slider>
        <main className="layout-content-container">
          <div className="main-content-area">{authorized && <Outlet />}</div>
        </main>
      </Content>
    </Layout>
  )
}

const mapState = (state: RootState) => ({
  currentUser: state.user.currentUser,
  fetched: state.user.fetched
})
export default connect(mapState)(AdminLayout)
