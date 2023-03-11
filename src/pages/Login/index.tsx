import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Form, Input, Button, Alert, Divider } from 'antd'
import * as api from '@/api/common'
import { getToken, setToken } from '@/utils/token'
import { getGitHubAuthorizeUrl } from '@/utils/githubAuthURL'
import { useNavigate } from 'react-router-dom'
import Icon from '@/Components/Icon'
import { useStore, useDispatch } from '@/store'

import './index.scss'

const Login = () => {
  const navigate = useNavigate()
  const [noMatch, setNoMatch] = useState(false)
  const [query] = useSearchParams()

  const {
    user: { currentUser, fetched }
  } = useStore('user')

  const hasLogined = useCallback(async () => {
    const redirect = () => navigate(query.get('from') || '/')
    if (fetched && currentUser) {
      redirect()
    } else if (getToken()) {
      const res = await api.getUserInfo()
      console.log(res)
      if (!!res) {
        redirect()
      }
    }
  }, [])

  useEffect(() => {
    hasLogined()
  }, [hasLogined])

  const onFinish = async (value: any) => {
    const res: any = await api.login(value)
    if (res?.token) {
      setToken(res.token)
      navigate(query.get('from') || '/')
    } else {
      setNoMatch(true)
    }
  }
  location

  return (
    <div className="login-wrap">
      <div className="login-wrap-area">
        <header>登录</header>
        {noMatch && (
          <Alert style={{ marginBottom: 12 }} message="账户或密码输入错误!" type="error" showIcon />
        )}
        <Form
          onFinish={onFinish}
          autoComplete="off"
          onChange={() => {
            if (noMatch) {
              setNoMatch(false)
            }
          }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="请输入名称/电话/邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
        <Divider>
          <span style={{ fontSize: 12, color: '#aaa' }}>其他平台账号登录</span>
        </Divider>
        <div className="oauth-area">
          <span
            className="auth-provider"
            onClick={() => {
              localStorage.setItem('loginFrom', query.get('from') || '/')
              window.location.assign(getGitHubAuthorizeUrl())
            }}
          >
            <span className="icon-image">
              <Icon symbol="icon-github-fill" />
            </span>
            <span className="icon-text">Github</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
