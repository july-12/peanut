import { Models } from '@rematch/core'
import { user } from './user'
import { classes } from './class'

export interface RootModel extends Models<RootModel> {
  user: typeof user
  class: typeof classes
}

export const allModels = {
  user,
  class: classes
}

export const models: RootModel = allModels
