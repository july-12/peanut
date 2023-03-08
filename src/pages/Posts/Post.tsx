import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import CommentList from './Comments'

import './post.scss'

const Post = () => {
  const params = useParams()

  const {
    post: { post },
    comment: { list: comments }
  } = useStore(['post', 'comment'])

  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (params.id) {
      dispatch.post.getPost(params.id)
    }
  }, [params.id])

  // const handleCommentSubmit = (value: any) => {
  //   value.comment.post_id = params.id
  //   dispatch.comment.createComment(value)
  // }

  return (
    <div className="post-wrap">
      <div className="post-content main-content-area">
        <h1>{post?.title}</h1>
        <div className="post-detail">
          <span>{post?.creator.name}</span>
          <span>{dayjs(post?.created_at).fromNow()} 创建</span>
        </div>
        <div className="post-text">
          {post?.content && <div dangerouslySetInnerHTML={{ __html: post.content }}></div>}
        </div>
      </div>

      <CommentList />
    </div>
  )
}

export default Post
