import React from 'react'
import { Form, Input, Button, Space } from 'antd'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

interface IProps {
  data?: any
  onSibmit: (value: any) => void
  onCancel: () => void
}

const ClassForm = (props: IProps) => {
  const onFinish = (value: any) => {
    props.onSibmit(value)
  }
  return (
    <Form
      {...layout}
      style={{ marginTop: 30 }}
      initialValues={{ course: { title: props.data?.title, desc: props.data?.desc } }}
      onFinish={onFinish}
    >
      <Form.Item
        name={['course', 'title']}
        label="课程名称"
        rules={[{ required: true, message: '请输入教室名称!' }]}
      >
        <Input placeholder="请输入课程名称" />
      </Form.Item>
      <Form.Item name={['course', 'desc']} label="课程介绍">
        <Input.TextArea rows={8} placeholder="请输入课程介绍" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ width: 86, marginRight: 20 }}>
          提交
        </Button>
        <Button style={{ width: 86 }}>取消</Button>
      </Form.Item>
    </Form>
  )
}

export default ClassForm
