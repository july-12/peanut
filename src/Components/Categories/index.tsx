import React from 'react'
import { map } from 'lodash'
import { useStore } from '@/store'
import { Tag } from 'antd'

import './index.scss'

const Categories = () => {
  const {
    tag: { list }
  } = useStore('tag')
  return (
    <div className="categories">
      <span className="categories-label">标签: </span>
      {map(list, (tag) => (
        <div className="category-item">
          <Tag key={tag.id} color={tag.color}>
            {tag.name}
          </Tag>
          <div className="count">{tag.posts.length}</div>
        </div>
      ))}
    </div>
  )
}

export default Categories
