import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import type { SelectProps } from 'antd'

interface IProps {
  data: any
  onSubmit: (value: any) => void
  onCancel: () => void
}

const PostForm = (props: Partial<IProps>) => {
  const onFinish = (value: any) => {
    props.onSubmit?.(value)
  }
  const options: SelectProps['options'] = []
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      autoComplete="off"
      name="post"
    >
      <Form.Item
        label="标题"
        name={['post', 'title']}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>

      <Form.Item label="标签" name={['post', 'tags']}>
        <Select mode="tags" style={{ width: '100%' }} placeholder="请选择标签" options={options} />
      </Form.Item>

      <Form.Item
        label="内容"
        name={['post', 'content']}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.TextArea rows={10} placeholder="请输入内容" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
        <Button style={{ width: 120 }} type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PostForm
