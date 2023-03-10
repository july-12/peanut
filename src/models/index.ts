import { Models } from '@rematch/core'
import { user } from './user'
import { classes } from './class'
import { post } from './post'
import { comment } from './comments'
import { tag } from './tag'

export interface RootModel extends Models<RootModel> {
  user: typeof user
  class: typeof classes
  post: typeof post
  comment: typeof comment
  tag: typeof tag
}

export const allModels = {
  user,
  post,
  comment,
  class: classes,
  tag
}

export const models: RootModel = allModels
