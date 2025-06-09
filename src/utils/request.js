import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from '@/router'

//创建axios实例对象
const request = axios.create({
  baseURL: '/api',
  timeout: 600000
})

//axios的请求 request 拦截器 - 获取localStorage中的token，在请求头中增加token请求头
request.interceptors.request.use(
  (config) => { //成功回调
    const loginUser = JSON.parse(localStorage.getItem('loginUser'))
    if (loginUser && loginUser.token) { //判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = loginUser.token;
    }
    return config;
  }, 
  (error) => { //失败回调
    return Promise.reject(error)
  }
)

//axios的响应 response 拦截器
request.interceptors.response.use(
  (response) => { //成功回调
    return response.data
  },
  (error) => { //失败回调
    if (error.response.status == 401) {
      ElMessage.error('登录状态已过期，请重新登录');
      router.push('/');
    }
    return Promise.reject(error)
  }
)

export default request