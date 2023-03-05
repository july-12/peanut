import request from '@/utils/request'

export const baseURL = '/api'

export function login(value: { name: string; password: string }) {
  return request.post<{ token: string }>(`${baseURL}/users/login`, value).then((res) => res.data)
}

export function getUserInfo<T>() {
  return request.get<T>(`${baseURL}/user_info`).then((res) => res.data)
}