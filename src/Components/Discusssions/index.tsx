import React from 'react'

import './index.scss'

interface IDiscussionProps {
  data: any
}
const Discussion = (props: IDiscussionProps) => {
  const { data } = props
  return (
    <div className="discussion-item">
      <header>
        <div className="title">{data.title}</div>
        <div className="createtime">{data.createTime}</div>
      </header>
      <div className="content">
        <div className="read-status">x</div>
        <div className="content-text">{data.content}</div>
        <div className="discussion-status">ii</div>
      </div>
    </div>
  )
}
const Discussions = () => {
  const data = [
    {
      id: '1',
      title: 'first discussions',
      children: [
        {
          id: '1-1',
          title: 'fdsa',
          content: 'xxfdsa',
          createTime: 'xxx'
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
  return (
    <div className="discussions">
      <header>
        <button>new Post</button>
      </header>
      <div className="tags"></div>

      <div className="actions"> show Actions</div>

      <div className="list">
        {data.map((dis) => (
          <Discussion key={dis.id} data={dis} />
        ))}
      </div>
    </div>
  )
}

export default Discussions
