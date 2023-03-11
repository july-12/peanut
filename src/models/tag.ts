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

type TTagList = (ITag & { posts: IPost[] })[]

interface ITagState {
  list: TTagList  // 所有标签
  postList: ITag[] // 当前帖子的标签
  selectedQueryTags?: number[] // 选择的标签分类查询
}

export const tag = createModel<RootModel>()({
  state: {
    list: [],
    postList: [],
  } as ITagState,
  reducers: {
    update(state, payload: Partial<ITagState>) {
      return { ...state, ...payload }
    }
  },
  effects: (dispatch) => ({
    async getTags(params: any) {
      const res = await api.tags.list<TTagList>(params)
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
