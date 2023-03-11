import request from '@/utils/request'
import { createRestfulApi } from './utils'
import { baseURL } from './common'

export * from './common'
export const classes = createRestfulApi('classes')
export const posts = createRestfulApi('posts')
export const postsExtra = {
  listByWeekly<T>(params?: any) {
    return request.get<T>(`${baseURL}/posts/weekly`, { params }).then((res) => res.data)
  }
}
export const comments = createRestfulApi('comments')
export const tags = createRestfulApi('tags')
// export const comments = createRestfulDynamiclyApi<{ postId: number }>(({ postId }) => {
//   return `posts/${postId}/comments`
// })
