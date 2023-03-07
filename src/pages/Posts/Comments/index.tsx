import React, { useEffect } from 'react'
import { map } from 'lodash'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import Avatar from '@/Components/Avatar'
import Form from './Form'

import './index.scss'
import './comment.scss'

interface IProps {
  postId?: string
}

const Comments = (props: IProps) => {
  const {
    comment: { list: comments, currentPostId }
  } = useStore(['post', 'comment'])

  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (props.postId) {
      dispatch.comment.update({ currentPostId: +props.postId })
    }
  }, [props.postId])

  useEffect(() => {
    dispatch.comment.getComments({})
  }, [currentPostId])

  const handleCommentSubmit = (value: any) => {
    value.comment.post_id = props.postId
    dispatch.comment.createComment(value)
  }

  return (
    <div className="comments-list">
      <header>
        followup discussions, <span>for lingering questions and comments</span>
      </header>
      <main>
        {map(comments, (comment) => (
          <div key={comment.id} className="comment-item comment-box">
            <Avatar url={'https://avatars.githubusercontent.com/u/920487?v=4'} shape="rect" />
            <div className="comment-item-content right-area">
              <header> name</header>
              <main>{comment.content}</main>
              <footer>
                <Form />
              </footer>
            </div>
          </div>
        ))}
      </main>

      <footer>
        <Form onSubmit={handleCommentSubmit} />
      </footer>
    </div>
  )
}

export default Comments
