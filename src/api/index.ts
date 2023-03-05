import request from '@/utils/request'

const baseURL = '/api'

export function getUserInfo<T>() {
  return request.get<T>(`${baseURL}/user_info`).then((res) => res.data)
}
