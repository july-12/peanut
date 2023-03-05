import { createModel } from '@rematch/core'
import { RootModel } from '.'
import * as api from '@/api'

export interface IPost {
  id: number
  title: string
  content: string
}

interface IPostState {
  list: IPost[]
  post?: IPost
}

export const post = createModel<RootModel>()({
  state: {
    list: [],
    post: undefined
  } as IPostState,
  reducers: {
    update(state, payload: Partial<IPostState>) {
      return { ...state, ...payload }
    }
  },
  effects: (dispatch) => ({
    async getPosts() {
      const res = await api.posts.list<IPost[]>()
      dispatch.post.update({ list: res })
    },
    async getPost(id: string | number) {
      const res = await api.posts.get<IPost>(id)
      dispatch.post.update({ post: res })
    },
    async createPost(value: Omit<IPost, 'id'>) {
      await api.posts.create<Omit<IPost, 'id'>>(value)
    },
    async updatePost(value: IPost) {
      await api.posts.update<IPost>(value.id, value)
    },
    async deletePost(id: number) {
      await api.posts.remove(id)
    }
  })
})
