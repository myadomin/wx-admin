import axios from 'axios'
import {HashRouter} from 'react-router-dom'
import { message } from 'antd'
const router = new HashRouter()

// 如果前后台非同域部署需要用
// axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  if (response.data.ret === 0) {
    // 正常
    return response.data
  } else if (response.data.ret === 1001) {
    // 没有cookie或者非法cookie
    router.history.push('/login')
  } else {
    message.error('错误：' + response.data)
    // throw后就会走到catch
    throw response.data
  }
}, error => {
  // 400等错误
  message.error('后台错误：' + error)
  throw error
})

export default axios
