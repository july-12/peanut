import dayjs from 'dayjs'
import { map } from 'lodash'
import { useStore, Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import Avatar from '@/Components/Avatar'
import Form from './Form'
import { ICommentFormValue } from '@/models/comments'

import './index.scss'
import './comment.scss'
import { useParams } from 'react-router-dom'

const Comments = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const params = useParams()
  const {
    comment: { list: comments }
  } = useStore(['post', 'comment'])

  const dispatch = useDispatch<Dispatch>()

  const handleCommentSubmit = async (value: ICommentFormValue) => {
    await dispatch.comment.createComment(value)
    if (params.id) {
      await dispatch.post.getPost(params.id)
    }
    messageApi.open({
      type: 'success',
      content: '评论成功'
    })
  }

  return (
    <>
      {contextHolder}
      <div className="comments-list">
        <header>
          <span>共 {comments.length} 条评论 </span>
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
          <Form onSubmit={(value) => handleCommentSubmit({ ...value, post_id: params.id })} />
        </footer>
      </div>
    </>
  )
}

export default Comments
