import { Models } from '@rematch/core'
import { user } from './user'
import { classes } from './class'
import { post } from './post'

export interface RootModel extends Models<RootModel> {
  user: typeof user
  class: typeof classes
  post: typeof post
}

export const allModels = {
  user,
  post,
  class: classes
}

export const models: RootModel = allModels
