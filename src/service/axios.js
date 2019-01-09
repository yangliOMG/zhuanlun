import axios from 'axios'
import {removeStorage, getStorage, showToast, getQueryString  } from '../util'

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
// // axios拦截器
 axios.interceptors.request.use(config => {
    return config
 })
 
 axios.interceptors.response.use(response => {
     // 在这里你可以判断后台返回数据携带的请求码
     if(response.data.returnCode === 3005 || response.data.returnCode === '3005'){
         // 3005未登录
        const code = getQueryString("code")
        const user = getStorage('user')
        showToast('登录中。。。')
        if(!code||user !== ''){
            removeStorage('user')
            setTimeout(() => window.location.reload(), 100)
        }
        // console.log("axois",response)
        // return response.data
    }else if (response.status === 200 || response.status === '200') {
        return response
    }else {
        // 非200请求抱错
        throw Error(response.data.data || '服务异常')
    }
})

export default axios
