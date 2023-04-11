import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, Dispatch } from '@/store'
import { IClass } from '@/models/class'
import { useDispatch } from 'react-redux'
import { Input, Button, Table, Popconfirm, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import ClassForm from './form'

interface DataType extends IClass {}

const ClassList = () => {
  const [visible, setVisible] = useState(false)
  const [editClassItem, setEditClassItem] = useState<any>()
  const navigate = useNavigate()
  const store = useStore('class')
  const dispatch = useDispatch<Dispatch>()

  const getClassList = () => {
    dispatch.class.getClasses()
  }

  const data: DataType[] = store.class.list

  useEffect(() => {
    getClassList()
  }, [])

  const confirmDelete = (id: number) => {
    dispatch.class.deleteClass(id)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '课程名称',
      dataIndex: 'title',
      render: (text, record) => (
        <Button type="text" onClick={() => navigate(`/class/${record.id}`)}>
          {text}
        </Button>
      )
    },
    {
      title: '课程介绍',
      dataIndex: 'desc'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 160,
      render(_value, record) {
        return (
          <div className="list-wrap-column-actions">
            <Button
              size="small"
              onClick={() => {
                setVisible(true)
                setEditClassItem(record)
              }}
            >
              编辑
            </Button>
            <Popconfirm
              placement="bottomRight"
              title="确定删除该课程吗？"
              description="删除课程"
              onConfirm={() => confirmDelete(record.id)}
            >
              <Button size="small" type="primary" danger ghost>
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const closeModal = () => {
    setVisible(false)
    setEditClassItem(undefined)
  }

  const handleSubmit = (value: any) => {
    if (editClassItem) {
      dispatch.class.updateClass({ ...value, id: editClassItem.id })
    } else {
      dispatch.class.createClass(value)
    }
    getClassList()
    closeModal()
  }
  return (
    <div className="list-wrap">
      <header>
        <Input style={{ width: 200 }} placeholder="请输入查询名称!" />
        <Button type="primary" onClick={() => setVisible(true)}>
          添加课程
        </Button>
      </header>
      <main className="list-wrap-content">
        <Table rowKey="id" columns={columns} dataSource={data} />
      </main>
      <Modal
        centered
        destroyOnClose
        title={!!editClassItem ? '编辑课程' : '创建课程'}
        open={visible}
        footer={null}
        onCancel={closeModal}
      >
        <ClassForm data={editClassItem} onCancel={closeModal} onSibmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default ClassList
