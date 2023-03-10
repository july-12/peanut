import { createModel } from '@rematch/core'
import request from '@/utils/request'
import { RootModel } from '.'
import * as api from '@/api'

export interface ITag {
  id: number
  color?: string
  name: string
}
interface IPost {
  id: number
  title: string
}
export interface ITagValue {
  name: string
  course_id: string
}

interface ITagState {
  list: (ITag & { posts: IPost[] })[]
  postList: ITag[]
}

export const tag = createModel<RootModel>()({
  state: {
    list: [],
    postList: []
  } as ITagState,
  reducers: {
    update(state, payload: Partial<ITagState>) {
      return { ...state, ...payload }
    }
  },
  effects: (dispatch) => ({
    async getTags(params: any) {
      const res = await api.tags.list<ITag[]>(params)
      dispatch.tag.update({ list: res })
    },
    async createTag(value: ITagValue) {
      await api.tags.create<ITagValue>(value)
    },
    async createTags(value: { tags: ITagValue[] }) {
      const res = await request.post(`${api.baseURL}/tags/batch`, value).then((res) => res.data)
    },
    async updateTag(value: ITag) {
      await api.tags.update<ITag>(value.id, value)
    },
    async deleteTag(id: number) {
      await api.tags.remove(id)
    }
  })
})
