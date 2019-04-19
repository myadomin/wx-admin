import axios from 'axios'
import { HashRouter } from 'react-router-dom'
import utils from './index'
import { message } from 'antd'
const router = new HashRouter()

// 如果前后台非同域部署需要用
// axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const csrftoken = utils.getCookie('csrfToken')
  // egg csrf防范
  // https://eggjs.org/zh-cn/core/security.html#%E5%AE%89%E5%85%A8%E5%A8%81%E8%83%81-csrf-%E7%9A%84%E9%98%B2%E8%8C%83
  config.headers['x-csrf-token'] = csrftoken
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  if (response.data.ret === 1001) {
    // 没有cookie或者非法cookie
    router.history.push('/login')
  } else {
    return response.data
  }
}, error => {
  // 400等错误
  message.error('后台错误：' + error)
  // throw后 axios走catch
  throw error
})

export default axios
