import React from 'react'
import { Form, Input, Button } from 'antd'
import TagsSelector from '@/Components/TagsSelector'
import RichTextor from '@/Components/RichTextor'

interface IProps {
  data: any
  onSubmit: (value: any) => void
  onCancel: () => void
}

const PostForm = (props: Partial<IProps>) => {
  const onFinish = async (value: any) => {
    props.onSubmit?.(value)
  }

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
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>

      <Form.Item label="标签" name={['post', 'tags']}>
        <TagsSelector />
      </Form.Item>

      <Form.Item
        label="内容"
        name={['post', 'content']}
        style={{ height: 240 }}
        rules={[{ required: true, message: '请输入内容' }]}
      >
        <RichTextor style={{ height: 200 }} placeholder="请输入内容" />
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
