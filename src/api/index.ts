import { createRestfulApi } from './utils'

export * from './common'
export const classes =  createRestfulApi('classes')
export const posts =  createRestfulApi('posts')