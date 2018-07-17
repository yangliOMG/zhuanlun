# 问题总结
* 关于ios兼容性的问题
> 1. ios8,9没有es的一些新方法，比如：symbol，padstart，includes，array.from。
```
使其兼容只用一步，在入口文件index.js顶部添加：
import 'babel-polyfill';
```
> 2. display：flex等样式也不兼容，在webpack的打包文件中配置：
```
loader: require.resolve('postcss-loader'),
。。。。
autoprefixer({
      browsers: [
      。。。。
      'ios >= 7.0',
      ],
      // flexbox: 'no-2009',
}),

postcss可以被理解为一个平台，可以让一些插件在上面跑

它提供了一个解析器，可以将CSS解析成抽象语法树

通过PostCSS这个平台，我们能够开发一些插件，来处理CSS。热门插件如autoprefixer

Autoprefixer是一个后处理程序，它在CSS编译后运行

```

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
location ^~ /static/ {              //在nginx上运行，static/media下的图片在默认情况是找不着的。所以要加这个路径配置，里面的东西并不必须
      gzip_static on;               //压缩
      expires max;                  //缓存最久
      add_header Cache-Control public;    //    可以被任何缓存区缓存
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
> 3. axios的post请求格式书写
```
后台：
@RequestMapping("/save.do")
public boolean save(HttpServletRequest request , Back back){
      back.setUid(uid);                         //back.content字段有传的值
      。。。
}
@RequestMapping("/save2.do")
public boolean save(HttpServletRequest request , String data){
      JSONObject json = JSON.parseObject(data);
      Back back = new Back();
      back.setContent(json.getString("content"));
      。。。
}
@RequestMapping("/create.do")
public Respond create(HttpSession session, String data) {
      JSONObject json = JSON.parseObject(data);
      Pray pray = new Pray();
      pray.setPrayman(json.getString("prayman"));
      ...
}
前台：
import qs from 'qs'

axios({
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({content}),            //qs.stringify序列化：uid=cs11&pwd=000000als&username=cs11&password=000000als
      url:'/back/save.do',
})
axios({
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({data:JSON.stringify({content})}),
      url:'/back/save2.do',
})
axios.get('/pray/create.do',{params: {
      data:JSON.stringify(pray)                 //JSON.stringify序列化：{"uid":"cs11","pwd":"000000als","username":"cs11","password":"000000als"}
}})
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
* react的按需加载   ./dashboard/asyncComponent.js
* 点击图片放大-》在图片的父节点上的事件中，添加
```
e.preventDefault()
```
* 时间ios的兼容格式写法
```
date = 2018-07-06T11:54:43.000+0000  //不识别
date.replace(/(\+\d{2})(\d{2})$/, "$1:$2")
date = 2018-07-06T11:54:43.000+00:00      //ios识别
```
* less的background兼容写法
```
background: url(/static/media/background.bc45e995.png) 0 0 / 100% 100%; //铺满
background:url('./images/background.png') 0 0~"/" 100% 100%;
```
* 单页面应用，微信支付，ios当前页面未注册
```
IOS
微信检测支付授权目录是第一次打开页面的时候顶部出现绿色加载条。而不是location.href，但是我们程序中使用的是location.href，就会造成一种假象链接明明是对的啊
Android
微信检测支付授权目录是location.href

解决方案
使用独立支付页面，通过location.href跳转。稳定
配置多几个授权目录（授权目录上线好像是3个？）
```
* 关于图片
> 1. jpg比png小得多；png支持透明；不用放缩图片的分辨率 对应设备的宽度即可；手机图片控制在100k以下



