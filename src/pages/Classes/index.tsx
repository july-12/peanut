import React, { useState } from 'react'
import { Input, Button, Table, Popconfirm, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import ClassForm from './form'

interface DataType {
  id: React.Key
  title: string
  desc: string
}

const ClassList = () => {
  const [visible, setVisible] = useState(false)
  const confirmDelete = () => {}
  const [editClassItem, setEditClassItem] = useState<any>()
  const data = [
    {
      id: 1,
      title: 'title1',
      desc: 'desc'
    },
    {
      id: 2,
      title: 'title2',
      desc: 'desc2'
    }
  ]
  const columns: ColumnsType<DataType> = [
    {
      title: '课程名称',
      dataIndex: 'title'
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
              onConfirm={confirmDelete}
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
    console.log(value)
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
