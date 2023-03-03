import React from 'react'
import clns from 'classnames'
import { Collapse, Button, Input } from 'antd'

import './index.scss'

const Panel = Collapse.Panel
interface IPostProps {
  data: any
}
const Post = (props: IPostProps) => {
  const { data } = props
  return (
    <div className={clns('post-item', `post-item-${data.status}`)}>
      <div className="post-item-read-status">x</div>
      <main>
        <div className="title-main">
          <span>label</span>
          <span className="text">{data.title}</span>
        </div>
        <div className="summary">{data.content}</div>
      </main>
      <div className="post-item-actions">x</div>
      <span className="createtime">{data.createTime}</span>
    </div>
  )
}
const PostsNav = () => {
  const data = [
    {
      id: '1',
      title: 'first discussions',
      children: [
        {
          id: '1-1',
          title: 'fdsa',
          content: 'xxfdsa',
          createTime: 'xxx',
          status: 'unread'
        },
        {
          id: '1-2',
          title: 'fdsa',
          content: 'xxfdsa',
          createTime: 'xxx'
        }
      ]
    },
    {
      id: '2',
      title: 'first discussions',
      children: [
        {
          id: '2-1',
          title: 'fdsa',
          content: 'xxfdsa',
          status: 'unanswered',
          createTime: 'xxx'
        },
        {
          id: '2-2',
          title: 'fdsa',
          content: 'xxfdsa',
          createTime: 'xxx'
        }
      ]
    }
  ]
  const onChange = () => {}
  return (
    <div className="posts">
      <header>
        <Button type='primary'>new Post</Button>
        <Input placeholder="请输入查询字段" prefix={<span>i</span>} />
      </header>
      <div className="tags"></div>

      <div className="actions"> show Actions</div>

      <Collapse
        // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        bordered={false}
        className="post-collapse"
        defaultActiveKey={['1']}
        onChange={onChange}
      >
        {data.map((dis) => (
          <Panel header={dis.title} key={dis.id}>
            {dis.children.map((post) => (
              <Post key={post.id} data={post} />
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default PostsNav
