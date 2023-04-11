import React, { useState, useEffect } from 'react'
import { useStore, Dispatch } from '@/store'
import { IUser } from '@/models/user'
import { useDispatch } from 'react-redux'
import { Input, Button, Table, Popconfirm, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType extends IUser {}

const Users = () => {
  const store = useStore('user')
  const dispatch = useDispatch<Dispatch>()

  const getUserList = () => {
    dispatch.user.getUsers()
  }

  const data: DataType[] = store.user.list

  useEffect(() => {
    getUserList()
  }, [])

  const confirmDelete = (id: number) => {
    dispatch.user.deleteUser(id)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 100,
      render: (text) => text ? <img style={{ width: 40, height: 40, borderRadius: '50%' }} src={text} alt="avatar" /> : ''
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (text) => <b>{text}</b>
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 160,
      render(_value, record) {
        return (
          <div className="list-wrap-column-actions">
            <Popconfirm
              placement="bottomRight"
              title="确定删除该用户吗？"
              description="删除用户"
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

  return (
    <div className="list-wrap">
      <header>
        <Input style={{ width: 200 }} placeholder="请输入查询名称!" />
      </header>
      <main className="list-wrap-content">
        <Table rowKey="id" columns={columns} dataSource={data} />
      </main>
    </div>
  )
}

export default Users