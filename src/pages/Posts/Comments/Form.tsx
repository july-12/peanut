import React from 'react'
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
  const {
    user: { currentUser }
  } = useStore(['user'])

  const onFinish = (value: any) => {
    props.onSubmit?.(value)
  }

  return (
    <div className="comment-form-area comment-box">
      <Avatar url={currentUser?.avatar} />
      <Form onFinish={onFinish} autoComplete="off" className="comment-form right-area">
        <Form.Item
          name={['comment', 'content']}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.TextArea rows={8} placeholder="请输入内容" />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: 140 }} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CommentForm
