# 问题总结
* 通过内网穿透，浏览器白屏 报错"Invalid Host header"--->/config/webpackDevServer.config.js下，
```
disableHostCheck:                                                         ====》 disableHostCheck: true ,
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',  
```
* nginx代理静态页面，图片、接口代理，/conf/vhost/*.conf
```
location ~*.do$ {
      proxy_pass http://localhost:8000;
      proxy_set_header Host $host;                          
      proxy_set_header X-Real-IP $remote_addr;              //nginx做反向代理时，默认的配置后端获取到的ip都是来自于nginx
      proxy_set_header REMOTE-HOST $remote_addr;             //转发用户的真实IP到后端程序     
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
      proxy_pass http://localhost:8000;          //nginx代理静态页面，图片、接口代理
}
location / {
      try_files $uri $uri/ /index.html;         //如果不存在着内部重定向到index.html
}
```
* 使用Node.js中间层做服务端渲染,server.js
> 1. 跨域 代理
```
const proxy = require('http-proxy-middleware')
const proxyPath = 'http://localhost:8000'

app.use(['/img/*','*.do'], proxy({target: proxyPath, changeOrigin: true}))
```
![img](https://upload-images.jianshu.io/upload_images/4145295-df8e7f9aa01f3448.png)
> 2. ReferenceError: window is not defined
```
服务端渲染的页面，没有window、document，注意避免渲染时使用（放在mount之中），或对其判断是否存在
```

* axios
> 1. 处理二进制流图片的乱码
```
axios.get('/url', {
      responseType: 'arraybuffer'
}).then(response => {
      return 'data:image/png;base64,' + btoa( new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
}).then(data => {
      this.src = data
})
```
> 2. 设置拦截器
```
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
axios.interceptors.request.use(config => {
    return config
})
axios.interceptors.response.use(response => {
     // 在这里你可以判断后台返回数据携带的请求码
     if (response.status === 200 || response.status === '200') {
        return response
    }else {
        // 非200请求抱错
        throw Error(response.data.data || '服务异常')
    }
})
```
* 单页应用（SPA）前端javascript如何阻止按下返回键页面回退
```
componentDidMount() {
      this.addEventHandler();
}
componentWillUnmount() {
      this.removeEventHandler();
}
addEventHandler() {
      window.addEventListener('popstate', this.closePopstate, false);
      window.history.pushState({}, '')
}
removeEventHandler() {
      window.removeEventListener('popstate', this.closePopstate, false);
}
closePopstate = (e) => {
      window.removeEventListener('popstate', this.closePopstate, false);
}
```