import { createModel } from '@rematch/core'
import { RootModel } from '.'
import * as api from '@/api'
import { IUser } from './user'

export interface IComment {
  id: number
  content: string
  created_at: string
  updated_at: string
  creator: IUser
  replies: IComment[]
}

interface ICommentstate {
  list: IComment[]
  total: number
  currentPostId?: number
  comment?: IComment
}

export interface ICommentFormValue {
  content: string
  comment_id?: number
  post_id?: number
}

export const comment = createModel<RootModel>()({
  state: {
    list: [],
    total: 0,
    currentPostId: undefined,
    comment: undefined
  } as ICommentstate,
  reducers: {
    update(state, payload: Partial<ICommentstate>) {
      return { ...state, ...payload }
    }
  },
  effects: (dispatch) => ({
    // async getComments(params: Record<string, any>) {
    //     const { list, total } = await api.comments.list<{ list: IComment[]; total: number }>(params)
    //     dispatch.comment.update({ list, total })
    // },
    // async getComment(id: string | number) {
    //     const res = await api.comments.get<IComment>(id)
    //     dispatch.comment.update({ comment: res })
    // },
    async createComment(value: ICommentFormValue) {
        await api.comments.create<{ comment: ICommentFormValue }>({ comment: value })
    },
    async updateComment(value: ICommentFormValue & { id: number }) {
        await api.comments.update<{ comment: ICommentFormValue & { id: number } }>(
          value.id,
          { comment: value }
        )
    },
    async deleteComment(id: number) {
        await api.comments.remove(id)
    }
  })
})
