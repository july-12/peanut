import { map } from 'lodash'
import clns from 'classnames'
import { Dispatch, useStore } from '@/store'
import { ITag, ITagValue } from '@/models/tag'
import { SketchPicker, TwitterPicker } from 'react-color'
import { Tag, theme, Popover, Modal, Form, Input, Button, message, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'
import Icon from '@/Components/Icon'

import './index.scss'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface ITagProps {
  value: number[]
  onChange: (value: number[]) => void
}

interface IColorPickerProps {
  value: string
  onChange: (value: string) => void
}

const ColorPicker = (props: Partial<IColorPickerProps>) => {
  return (
    <div className="color-picker">
      <TwitterPicker
        color={props.value}
        onChangeComplete={(color) => props.onChange?.(color.hex)}
        triangle="hide"
      />
    </div>
  )
  //   return (
  //     <SketchPicker color={props.value} onChangeComplete={(color) => props.onChange?.(color.hex)} />
  //   )
}
const TagsSelector = (props: Partial<ITagProps>) => {
  const selectedTags = props.value || []
  const [open, setOpen] = useState(false)
  const { token } = theme.useToken()
  const params = useParams()

  const [form] = Form.useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    tag: { list: tags }
  } = useStore()

  const tagPlusStyle = {
    background: token.colorBgContainer,
    cursor: 'pointer',
    borderStyle: 'dashed'
  }

  const handleChange = (tag: number) => {
    const checked = selectedTags.some((id) => id === tag)
    const nextSelectedTags = !checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag)

    props.onChange?.(nextSelectedTags)
  }

  const openTagModal = () => {
    setOpen(true)
  }
  const closeTagModal = () => {
    setOpen(false)
    form.resetFields()
  }

  const onSubmitTag = async (value: any) => {
    const course_id = params.classId
    const data: any = { tag: { ...value, course_id } }
    await dispatch.tag.createTag(data)
    if (params.classId) {
      await dispatch.tag.getTags({ course_id })
    }
    closeTagModal()
  }

  return (
    <div className="tags-selector">
      {map(tags, (tag) => (
        <div
          key={tag.id}
          className={clns('tag-item', { 'tag-item-select': selectedTags.includes(tag.id) })}
          onClick={() => handleChange(tag.id)}
        >
          <Tag className="ant-tag-custom" color={tag.color}>
            {tag.name}
          </Tag>
          {selectedTags.includes(tag.id) && (
            <span className="selected-tag-icon">
              <Icon symbol="icon-check" />
            </span>
          )}
        </div>
      ))}
      <div className="tag-item">
        <Tag className="ant-tag-custom" style={tagPlusStyle} onClick={openTagModal}>
          +添加标签
        </Tag>
      </div>
      <Modal title="创建标签" open={open} footer={null} onCancel={closeTagModal}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={onSubmitTag}
          layout="vertical"
          autoComplete="off"
          form={form}
          name="tag"
        >
          <Form.Item
            label="名称"
            name={'name'}
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>

          <Form.Item label="颜色" name={'color'} className="">
            <ColorPicker />
          </Form.Item>

          <Form.Item>
            <Button style={{ marginRight: 10 }} type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={closeTagModal}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TagsSelector
