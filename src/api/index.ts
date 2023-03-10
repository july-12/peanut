import { createRestfulApi } from './utils'

export * from './common'
export const classes = createRestfulApi('classes')
export const posts = createRestfulApi('posts')
export const comments = createRestfulApi('comments')
export const tags = createRestfulApi('tags')
// export const comments = createRestfulDynamiclyApi<{ postId: number }>(({ postId }) => {
//   return `posts/${postId}/comments`
// })
