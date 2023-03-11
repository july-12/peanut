import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { map, isEqual } from 'lodash'
import { useStore, useDispatch } from '@/store'
import { Tag, Button } from 'antd'
import Icon from '@/Components/Icon'

import './index.scss'

const Categories = () => {
  const [query] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const {
    tag: { list, selectedQueryTags = [] }
  } = useStore('tag')

  const tagsStr = query.get('tags')

  useEffect(() => {
    const tags = tagsStr ? tagsStr.split(',').map((p) => +p) : undefined
    if (!isEqual(tags, selectedQueryTags)) {
      dispatch.tag.update({ selectedQueryTags: tags as unknown as number[] })
    }
  }, [tagsStr])

  const handleClick = (tag: number) => {
    const checked = selectedQueryTags.some((id) => id === tag)
    const nextSelectedQueryTags = !checked
      ? [...selectedQueryTags, tag]
      : selectedQueryTags.filter((t) => t !== tag)

    query.set('tags', nextSelectedQueryTags.toString())
    navigate({
      pathname: location.pathname,
      search: '?' + query.toString()
    })
  }
  const handleClearTag = () => {
    query.delete('tags')
    navigate({
      pathname: location.pathname,
      search: '?' + query.toString()
    })
  }
  return (
    <div className="categories">
      <span className="categories-label">标签: </span>
      {map(list, (tag) => (
        <div key={tag.id} className="category-item" onClick={() => handleClick(tag.id)}>
          <Tag key={tag.id} color={tag.color}>
            {tag.name}
          </Tag>
          <div className="count">{tag.posts.length}</div>
          {selectedQueryTags?.includes(tag.id) && (
            <span className="selected-tag-icon">
              <Icon symbol="icon-check" />
            </span>
          )}
        </div>
      ))}
      <div className="category-item">
        <Button type="text" size="small" onClick={handleClearTag}>
          清空
        </Button>
      </div>
    </div>
  )
}

export default Categories
