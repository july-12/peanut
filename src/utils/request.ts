import axios from 'axios'
import { getToken } from '@/utils/token'
// export const BASE_URL = ''

const instance = axios.create({
  //   baseURL: BASE_URL,
})

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 && !location.pathname.includes('forbidden')) {
      window.location.href = '/forbidden'
    }
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = getToken()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
