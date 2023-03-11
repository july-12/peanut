import { pick } from 'lodash'
import { useSelector } from 'react-redux'
import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel, allModels } from './models'
import { useDispatch as  reduxUseDispatch } from 'react-redux'
export const store = init({
  models
})
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

export function useStore<K extends keyof typeof allModels>(keys?: K | K[]): Pick<RootState, K> {
  if (keys) {
    return useSelector((state: RootState) => pick(state, keys))
  }
  return useSelector((state: RootState) => state)
}

export const useDispatch = () => reduxUseDispatch<Dispatch>()