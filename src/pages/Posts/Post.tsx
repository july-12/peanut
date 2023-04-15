import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { map } from 'lodash'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { useStore, Dispatch } from '@/store'
import InnerHTML from '@/Components/InnerHTML'
import { useDispatch } from 'react-redux'
import CommentList from './Comments'

import './post.scss'

const Post = () => {
  const params = useParams()

  const {
    post: { post },
    tag: { postList: tags }
  } = useStore(['post', 'tag'])

  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (params.id) {
      dispatch.post.getPost(params.id)
    }
  }, [params.id])

  const renderTags = () => {
    return (
      <div className="post-tags">
        {map(tags, (tag) => (
          <Tag color={tag.color} key={tag.id}>
            {tag.name}
          </Tag>
        ))}
      </div>
    )
  }

  return (
    <div className="post-wrap">
      <div className="post-content main-content-area">
        <h1>{post?.title}</h1>
        <div className="post-detail">
          <span>{post?.creator.name}</span>
          <span>{dayjs(post?.created_at).fromNow()} 创建</span>
        </div>
        <div className="post-text">
          {post?.content && <InnerHTML html={post?.content} />}
          {renderTags()}
        </div>
      </div>

      <CommentList />
    </div>
  )
}

export default Post
