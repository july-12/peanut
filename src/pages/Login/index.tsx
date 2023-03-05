import React, { useState } from 'react'
import { Form, Input, Button, Alert, Divider } from 'antd'
import * as api from '@/api/common'
import { setToken } from '@/utils/token'
import { getGitHubAuthorizeUrl } from '@/utils/githubAuthURL'
import { useNavigate } from 'react-router-dom'

import './index.scss'

const Login = () => {
  const navigate = useNavigate()
  const [noMatch, setNoMatch] = useState(false)

  const onFinish = async (value: any) => {
    const res: any = await api.login(value)
    if (res?.token) {
      setToken(res.token)
      navigate('/')
    } else {
      setNoMatch(true)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-wrap-area">
        <h2>登录</h2>
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="oauth-area">
          <Divider>
            <a href={getGitHubAuthorizeUrl()}>github</a>
          </Divider>
        </div>
      </div>
    </div>
  )
}

export default Login
