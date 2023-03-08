import React, { useState } from 'react'
import { useStore } from '@/store'
import { Form, Input, Button } from 'antd'
import Avatar from '@/Components/Avatar'

import './comment.scss'
import './form.scss'

interface IProps {
  data: any
  onSubmit: (value: any) => void
  onCancel: () => void
}
const CommentForm = (props: Partial<IProps>) => {
  const [focusing, setFocusing] = useState(false)
  const {
    user: { currentUser }
  } = useStore(['user'])

  const onFinish = (value: any) => {
    props.onSubmit?.(value)
  }

  const handleFocus = () => {
    setFocusing(true)
  }
  const handleCancel = () => {
    setFocusing(false)
  }

  if (!focusing) {
    return <Input placeholder="回复评论" onFocus={handleFocus} />
  }
  return (
    <div className="comment-form-area comment-box">
      <Avatar url={currentUser?.avatar} />
      <Form
        onFinish={onFinish}
        autoComplete="off"
        className="comment-form right-area"
        name="comment"
      >
        <Form.Item
          name='content'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.TextArea rows={6} placeholder="请输入内容" />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: 100 }} type="primary" htmlType="submit">
            提交
          </Button>
          <Button style={{ marginLeft: 12, width: 80 }} onClick={handleCancel}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CommentForm
