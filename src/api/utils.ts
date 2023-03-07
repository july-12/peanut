import request from '@/utils/request'

export const baseURL = '/api'

type TDynamiclyResource<T> = (params: T) => string

export function createRestfulDynamiclyApi<R>(resourceFunc: TDynamiclyResource<R>) {
  return {
    list<T>(urlParams: R,  params?: any) {
      const resource = resourceFunc(urlParams)
      return request.get<T>(`${baseURL}/${resource}`, { params }).then((res) => res.data)
    },

    get<T>(urlParams: R, id: number | string) {
      const resource = resourceFunc(urlParams)
      return request.get<T>(`${baseURL}/${resource}/${id}`).then((res) => res.data)
    },

    create<T>(urlParams: R, value: T) {
      const resource = resourceFunc(urlParams)
      return request.post(`${baseURL}/${resource}`, value).then((res) => res.data)
    },

    update<T>(urlParams: R, id: number, value: T) {
      const resource = resourceFunc(urlParams)
      return request.put(`${baseURL}/${resource}/${id}`, value).then((res) => res.data)
    },

    remove(urlParams: R, id: number) {
      const resource = resourceFunc(urlParams)
      return request.delete(`${baseURL}/${resource}/${id}`).then((res) => res.data)
    }
  }
}


export function createRestfulApi(resource: string) {
  return {
    list<T>(params?: any) {
      return request.get<T>(`${baseURL}/${resource}`, { params }).then((res) => res.data)
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
