import { createModel } from "@rematch/core";
import { RootModel } from ".";
import * as api from '@/api/common'

export interface IUser {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    bio: string
}

interface IUserState {
    fetched: boolean;
    currentUser?: IUser
}

export const user = createModel<RootModel>()({
  state: {
    fetched: false,
    currentUser: undefined
  } as IUserState,
  reducers: {
    update(state, payload: Partial<IUserState>) {
      return { ...state, ...payload};
    },
  },
  effects: (dispatch) => ({
    async getUserInfo() {
        const res = await api.getUserInfo<IUser>()
        dispatch.user.update({ currentUser: res, fetched: true })
    },
  }),
});