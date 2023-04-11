import { createModel } from '@rematch/core'
import { RootModel } from '.'
import * as api from '@/api'
import { removeToken } from '@/utils/token'

export interface IUser {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  bio: string
}

interface IUserState {
  fetched: boolean
  list: IUser[]
  total: number;
  currentUser?: IUser
}

export const user = createModel<RootModel>()({
  state: {
    list: [],
    total: 0,
    fetched: false,
    currentUser: undefined
  } as IUserState,
  reducers: {
    update(state, payload: Partial<IUserState>) {
      return { ...state, ...payload }
    }
  },
  effects: (dispatch) => ({
    async getUsers() {
      const res = await api.users.list<IUser[]>()
      dispatch.user.update({ list: res, total: 0 })
    },
    async getUserInfo() {
      const res = await api.getUserInfo<IUser>()
      dispatch.user.update({ currentUser: res, fetched: true })
    },
    async updateUser(value: IUser) {
      await api.users.update<IUser>(value.id, value)
    },
    async deleteUser(id: number) {
      await api.users.remove(id)
    },
    logout() {
      removeToken()
      dispatch.user.update({ currentUser: undefined })
    }
  })
})
