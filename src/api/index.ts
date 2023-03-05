import request from '@/utils/request'

export const baseURL = '/api'

export function login(value: { name: string; password: string }) {
  return request.post<{ token: string }>(`${baseURL}/users/login`, value).then((res) => res.data)
}

export function getUserInfo<T>() {
  return request.get<T>(`${baseURL}/user_info`).then((res) => res.data)
}

export function getClassList<T>() {
  return request.get<T>(`${baseURL}/classes`).then((res) => res.data)
}

export function createClass<T>(value: T) {
  return request.post(`${baseURL}/classes`, value).then((res) => res.data)
}

export function updateClass<T>(id: number, value: T) {
  return request.put(`${baseURL}/classes/${id}`, value).then((res) => res.data)
}

export function deleteClass(id: number) {
  return request.delete(`${baseURL}/classes/${id}`).then((res) => res.data)
}
