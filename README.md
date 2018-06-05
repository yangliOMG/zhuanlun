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
}
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
      proxy_pass http://localhost:8000;
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