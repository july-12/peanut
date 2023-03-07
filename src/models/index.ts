import { Models } from '@rematch/core'
import { user } from './user'
import { classes } from './class'
import { post } from './post'
import { comment } from './comments'

export interface RootModel extends Models<RootModel> {
  user: typeof user
  class: typeof classes
  post: typeof post
  comment: typeof comment
}

export const allModels = {
  user,
  post,
  comment,
  class: classes
}

export const models: RootModel = allModels
