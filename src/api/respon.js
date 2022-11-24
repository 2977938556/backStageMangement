//导入axios请求包
import axios from 'axios'


let $https = axios.create({
  baseURL: '/api',//基础路径cls
  timeout: 5000//请求超时参数
})



//配置请求拦截器
$https.interceptors.request.use((config) => {
  return config
})




//响应拦截器
$https.interceptors.response.use((res) => {
  return res.data;
}, (err) => {
  //响应失败的回调函数
  return Promise.reject(new Error('faile'))
})

export default $https