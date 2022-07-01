import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.user && store.state.user.token) {
    config.headers = {
      Authorization: 'Bearer ' + store.state.user.token
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default instance
