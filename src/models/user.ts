import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { getToken } from '@/utils/token'
import * as api from '@/api'

export interface IUser {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    bio: string
}

interface IUserState {
    currentUser?: IUser | null
}

export const user = createModel<RootModel>()({
  state: {
    currentUser: null
  } as IUserState,
  reducers: {
    update(state, payload: IUserState) {
      return { ...state, ...payload};
    },
  },
  effects: (dispatch) => ({
    async getUserInfo() {
        const res = await api.getUserInfo<IUser>()
        dispatch.user.update({ currentUser: res })
    },
    // handle state changes with impure functions.
    // use async/await for async actions
    // async incrementAsync(payload: number, state) {
    //   console.log("This is current root state", state);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   dispatch.count.increment(payload);
    // },
  }),
});