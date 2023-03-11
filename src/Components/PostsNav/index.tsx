import React, { useCallback, useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { keys, isEmpty } from 'lodash'
import clns from 'classnames'
import { Collapse, Button, Input } from 'antd'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Icon from '@/Components/Icon'
import { useStore, useDispatch } from '@/store'
import { IPost } from '@/models/post'

import './index.scss'

const Panel = Collapse.Panel
interface IPostProps {
  data: IPost & Partial<{ status: string }>
  unread?: boolean
  onClick: (id: number) => void
}

const POST_STORAGE_KEY = 'POST_VIEW_STATUS_STORAGE'
const Post = (props: IPostProps) => {
  const { data } = props
  return (
    <div
      className={clns('post-item', { [`post-item-${data.status}`]: !!data.status })}
      onClick={() => props.onClick(data.id)}
    >
      <div className="post-item-read-status">{props.unread && <span className="dot" />}</div>
      <main>
        <div className="post-item-title">
          <div className="title-text">
            {/* <span>{data.label}</span> */}
            <span className="text">{data.title}</span>
          </div>
        </div>
        <div className="summary">{data.content}</div>
      </main>
      <div className="post-item-actions">
        <Icon symbol="icon-Menu" />
      </div>
      <span className="createtime">{dayjs(data.created_at).format('YYYY-MM-DD')}</span>
    </div>
  )
}
const getPostViewStatus = () => {
  try {
    const value = localStorage.getItem(POST_STORAGE_KEY)
    return !!value ? JSON.parse(value) : {}
  } catch (err) {
    return {}
  }
}

const PostsNav = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [search] = useSearchParams()

  const dispatch = useDispatch()
  const [activeKeys, setActiveKeys] = useState<string | string[]>([])

  const {
    tag: { selectedQueryTags },
    post: { weeklyList }
  } = useStore(['post', 'tag'])

  const loadPostByWeekly = useCallback(async () => {
    const res = await dispatch.post.getPostsByWeekly({ course_id: params.classId })
    if (isEmpty(activeKeys)) {
      setActiveKeys(keys(res)?.slice(0, 1))
    }
  }, [selectedQueryTags])

  useEffect(() => {
    loadPostByWeekly()
  }, [loadPostByWeekly])

  const formatWeekly = (timestr: string) => {
    const starttime = dayjs(timestr)
    return `WEEK ${starttime.format('MM/DD')} - ${starttime.add(7, 'day').format('MM/DD')}`
  }
  const data = keys(weeklyList).map((key) => {
    return {
      id: key,
      title: formatWeekly(key),
      children: weeklyList[key]
    }
  })

  const onChange = (key: string | string[]) => {
    setActiveKeys(key)
  }

  const postViewStatus = getPostViewStatus()

  const handlePostClick = (id: number) => {
    postViewStatus[id] = 'view'
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(postViewStatus))
    navigate({
      pathname: `/class/${params.classId}/posts/${id}`,
      search: '?' + search.toString()
    })
  }
  return (
    <div className="posts">
      <header>
        <Button
          style={{ width: 100 }}
          type="primary"
          onClick={() => navigate(`/class/${params.classId}/posts/new`)}
        >
          提 问
        </Button>
        <Input placeholder="请输入查询字段" prefix={<Icon symbol="icon-search" />} />
      </header>
      <div className="tags"></div>

      <div className="actions"> show Actions</div>

      <Collapse
        expandIcon={({ isActive }) => (
          <Icon symbol={isActive ? 'icon-arrow-down-filling' : 'icon-arrow-right-filling'} />
        )}
        bordered={false}
        className="post-collapse"
        activeKey={activeKeys}
        onChange={onChange}
      >
        {data.map((dis) => (
          <Panel header={dis.title} key={dis.id}>
            {dis.children.map((post) => (
              <Post
                key={post.id}
                data={post}
                unread={!postViewStatus[post.id]}
                onClick={handlePostClick}
              />
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default PostsNav
