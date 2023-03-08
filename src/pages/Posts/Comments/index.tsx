import dayjs  from 'dayjs'
import { map } from 'lodash'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import Avatar from '@/Components/Avatar'
import Form from './Form'
import { ICommentFormValue } from '@/models/comments'

import './index.scss'
import './comment.scss'

const TIME_FORMAT = 'YYYY-MM-DD'

const Comments = () => {
  const {
    comment: { list: comments, currentPostId }
  } = useStore(['post', 'comment'])

  const dispatch = useDispatch<Dispatch>()

  const handleCommentSubmit = (value: ICommentFormValue) => {
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
            <Avatar url={comment.creator.avatar} />
            <div className="comment-item-content right-area">
              <header>
                {comment.creator.name}
                <span>{dayjs(comment.created_at).fromNow()}</span>
              </header>
              <main>{comment.content}</main>
              <div className="replies">
                {map(comment.replies, (reply) => (
                  <div key={reply.id} className="reply-item comment-box">
                    <Avatar url={reply.creator.avatar} />
                    <div className="right-area">
                      <header>
                        {reply.creator.name}
                        <span>{dayjs(reply.created_at).fromNow()}</span>
                      </header>
                      <main>{reply.content}</main>
                    </div>
                  </div>
                ))}
              </div>
              <footer>
                <Form
                  onSubmit={(value) => handleCommentSubmit({ ...value, comment_id: comment.id })}
                />
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
