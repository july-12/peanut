import { createModel } from "@rematch/core";
import { RootModel } from ".";
import * as api from '@/api'

export interface IClass {
    id: number
    name: string
    desc: string
}

interface IClassState {
    list: IClass[]
}

export const classes = createModel<RootModel>()({
  state: {
    list: []
  } as IClassState,
  reducers: {
    update(state, payload: Partial<IClassState>) {
      return { ...state, ...payload};
    },
  },
  effects: (dispatch) => ({
    async getClasses() {
        const res = await api.classes.list<IClass[]>()
        dispatch.class.update({ list: res })
    },
    async createClass(value: Omit<IClass, 'id'>) {
        await api.classes.create<Omit<IClass, 'id'>>(value)
    },
    async updateClass(value: IClass) {
        await api.classes.update<IClass>(value.id, value)
    },
    async deleteClass(id: number) {
        await api.classes.remove(id)
    },
  }),
});