import { createModel } from '@rematch/core'
import { RootModel } from '.'
import * as api from '@/api'
import { IComment } from './comments'
import { ITag } from './tag'
import { IUser } from './user'

export interface IPost {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  creator: IUser
}

type TWeeklyList = Record<string, IPost[]>
interface IPostState {
  list: IPost[]
  weeklyList: TWeeklyList
  post?: IPost
}

export const post = createModel<RootModel>()({
  state: {
    list: [],
    weeklyList: {},
    post: undefined
  } as IPostState,
  reducers: {
    update(state, payload: Partial<IPostState>) {
      return { ...state, ...payload }
    }
  },
  effects: (dispatch) => ({
    async getPostsByWeekly(params, state): Promise<TWeeklyList> {
      const newParams = Object.assign({}, params, { tags: state.tag.selectedQueryTags })
      const res = await api.postsExtra.listByWeekly<TWeeklyList>(newParams)
      dispatch.post.update({ weeklyList: res })
      return res
    },
    async getPost(id: string | number, state) {
      const res = await api.posts.get<IPost & { comments: IComment[]; tags: ITag[] }>(id)
      dispatch.post.update({ post: res })
      dispatch.comment.update({ list: res.comments })
      dispatch.tag.update({ postList: res.tags })
    },
    async createPost(value: Omit<IPost, 'id'>) {
      return await api.posts.create<Omit<IPost, 'id'>>(value)
    },
    async updatePost(value: IPost) {
      await api.posts.update<IPost>(value.id, value)
    },
    async deletePost(id: number) {
      await api.posts.remove(id)
    }
  })
})
