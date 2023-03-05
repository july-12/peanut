import request from '@/utils/request'

export const baseURL = '/api'

export function createRestfulApi(resource: string) {
  return {
    list<T>() {
      return request.get<T>(`${baseURL}/${resource}`).then((res) => res.data)
    },

    get<T>(id: number | string) {
      return request.get<T>(`${baseURL}/${resource}/${id}`).then((res) => res.data)
    },

    create<T>(value: T) {
      return request.post(`${baseURL}/${resource}`, value).then((res) => res.data)
    },

    update<T>(id: number, value: T) {
      return request.put(`${baseURL}/${resource}/${id}`, value).then((res) => res.data)
    },

    remove(id: number) {
      return request.delete(`${baseURL}/${resource}/${id}`).then((res) => res.data)
    }
  }
}
