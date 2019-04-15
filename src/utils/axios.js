import axios from 'axios'
import { message } from 'antd'
import {HashRouter} from 'react-router-dom'
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
  return response.data
}, error => {
  // message.error('后台接口报错')
  return Promise.reject(error)
})

export default axios
