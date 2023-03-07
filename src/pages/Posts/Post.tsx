import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import CommentList from './Comments'
import CommentForm from './Comments/Form'

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
        <h2>{post?.title}</h2>
        {post?.content && <div dangerouslySetInnerHTML={{ __html: post.content }}></div>}
      </div>

      <CommentList postId={params.id} />
      {/* <div className="main-content-area">
        <h3>共 {comments.length} 条评论 </h3>
        <CommentList postId={params.id} />
      </div> */}
      {/* <div className="create-new-comment">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div> */}
    </div>
  )
}

export default Post
