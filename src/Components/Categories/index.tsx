import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { map, slice, isEqual, isEmpty } from 'lodash'
import { useStore, useDispatch } from '@/store'
import { Tag, Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import Icon from '@/Components/Icon'

import './index.scss'

const MaxTagCount = 5
const Categories = () => {
  const [query] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const {
    tag: { list: tags, selectedQueryTags = [] }
  } = useStore('tag')
  const list = slice(tags, 0, MaxTagCount)
  const moreList = slice(tags, MaxTagCount)

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
  const items: MenuProps['items'] = map(moreList, (item) => ({
    key: item.id,
    label: item.name
  }))
  const renderMoreTags = () => {
    return (
      <div className="more-tags">
        {map(moreList, (item) => (
          <div key={item.id} className="tag-item">
            {item.color && <span className="spot" style={{ backgroundColor: item.color }} />}
            {item.name}
            <span className="count">{item.posts.length}</span>
          </div>
        ))}
      </div>
    )
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
      {tagsStr && (
        <div className="category-item">
          <Button type="text" size="small" onClick={handleClearTag}>
            清空
          </Button>
        </div>
      )}
      {!isEmpty(moreList) && (
        <Dropdown dropdownRender={renderMoreTags} trigger={['click']} placement="bottomRight">
          <div className="more-tags-icon">
            <Icon symbol="icon-arrow-down-filling" />
          </div>
        </Dropdown>
      )}
    </div>
  )
}

export default Categories
