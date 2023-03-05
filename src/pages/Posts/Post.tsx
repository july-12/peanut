import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'

import './post.scss'

const Post = () => {
  const params = useParams()

  const {
    post: { post }
  } = useStore('post')
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (params.id) {
      dispatch.post.getPost(params.id)
    }
  }, [params.id])

  return (
    <div className="post-wrap">
      <h2>{post?.title}</h2>
      {post?.content && <div dangerouslySetInnerHTML={{ __html: post.content }}></div>}
    </div>
  )
}

export default Post
