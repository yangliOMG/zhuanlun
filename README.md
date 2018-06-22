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