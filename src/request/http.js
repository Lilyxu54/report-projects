/*
    封装 axios 请求模块
*/
import axios from 'axios'
// import router from '@/router'

const refreshThonRequest = axios.create({
  baseURL: 'http://api.pc.remnantech.com'
})

/*
  axios.create 方法：复制一个 axios
  axios.create 用于创建一个 axios 实例，该实例和 axios 的功能一模一样
  说白了就是克隆了一个 axios

  为什么要这样做：我们可以拥有多个不同的请求函数，而他们的配置可能是不一样的
  例如有些项目中可能会涉及到使用不用的接口路径
    http://ttapi.research.itcast.cn/
    http://a.con/
    http://b.con/
*/
const request = axios.create({
  // baseURL: 'http://api.pc.remnantech.com' // 基础路径
  // baseURL: ' https://lzypc.xiaomiqiu.com' // 本地接口地址
  baseURL: ' http://192.168.1.35:8193' // 本地接口地址
})

/**
 * 处理后端返回数据中数字超出 JavaScript 安全整数范围
 */
request.defaults.transformResponse = [function (data) {
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]



export default request