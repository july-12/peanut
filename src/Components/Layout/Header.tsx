import { useNavigate, useLocation } from 'react-router-dom'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import clns from 'classnames'
import React from 'react'
import Avatar from '@/Components/Avatar'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import Icon from '@/Components/Icon'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  temp?: string
}

const Header = (props: IProps) => {
  const { className, ...restProps } = props
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<Dispatch>()
  const store = useStore('user')
  const renderUser = () => {
    const items: MenuProps['items'] = [
      {
        key: 'profile',
        label: <span>profile</span>,
        icon: <Icon symbol="icon-user" />
      },
      {
        key: 'logout',
        label: (
          <span
            onClick={() => {
              dispatch.user.logout()
            }}
          >
            logout
          </span>
        ),
        icon: <Icon symbol="icon-logout" />
      }
    ]
    return (
      <Dropdown menu={{ items }} placement="bottomRight">
        <div className="user-info">
          <span>{store.user.currentUser?.name}</span>
          <Avatar url={store.user.currentUser?.avatar} />
        </div>
      </Dropdown>
    )
  }
  return (
    <div {...restProps} className={clns('layout-header', className)}>
      <div id="logo">Peanut</div>
      <div className="extra">
        {store.user.currentUser ? (
          renderUser()
        ) : (
          <span onClick={() => navigate(`/login?from=${location.pathname}`)}>Login</span>
        )}
      </div>
    </div>
  )
}

export default Header
