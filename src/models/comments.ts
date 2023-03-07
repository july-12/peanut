import { createModel } from '@rematch/core'
import { RootModel } from '.'
import * as api from '@/api'

export interface IComment {
  id: number
  content: string
}

interface ICommentstate {
  list: IComment[]
  total: number
  currentPostId?: number
  comment?: IComment
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
    async getComments(params: Record<string, any>, state) {
      const postId = state.comment.currentPostId
      if (postId) {
        const { list, total } = await api.comments.list<{ list: IComment[]; total: number }>(
          { postId },
          params
        )
        dispatch.comment.update({ list, total })
      }
    },
    async getComment(id: string | number, state) {
      const postId = state.comment.currentPostId
      if (postId) {
        const res = await api.comments.get<IComment>({ postId }, id)
        dispatch.comment.update({ comment: res })
      }
    },
    async createComment(value: Omit<IComment, 'id'>, state) {
      const postId = state.comment.currentPostId
      if (postId) {
        await api.comments.create<Omit<IComment, 'id'>>({ postId }, value)
      }
    },
    async updateComment(value: IComment, state) {
      const postId = state.comment.currentPostId
      if (postId) {
        await api.comments.update<IComment>({ postId }, value.id, value)
      }
    },
    async deleteComment(id: number, state) {
      const postId = state.comment.currentPostId
      if (postId) {
        await api.comments.remove({ postId }, id)
      }
    }
  })
})
