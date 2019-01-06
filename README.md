# 问题总结
* 从零开始在linux系统中运行natapp
```
1.下载linux客户端natapp，拷到linux中
2.给权限 chmod u+x natapp （否则permission denied）
3.启动 natapp -authtoken=你的authtoken
（https://natapp.cn/article/nohup）
      =>  nohup ./natapp -authtoken=xxx -log=stdout -loglevel=ERROR &
```
* 从零开始提交项目到码云上
```
1.在码云上新建一个项目，去掉所有文件自动生成的勾选
2.在代码目录中，git init
3.git remote add origin 码云项目路径
4.git add . => git commit -m '注释信息' => git push -u origin master
```
* 从零开始部署
```
1.安装node(https://www.cnblogs.com/liuqi/p/6483317.html)
2.安装pm2(https://my.oschina.net/u/2252639/blog/1798667)
3.安装git    sudo apt-get install git
4.配置deploy_key(https://www.cnblogs.com/yeshaoxiang/p/7839603.html)
      获取linu中的ssh_key:    cat ~/.ssh/id_rsa.pub
```
* 阿里云移除端口的防火墙
```
云服务器ECS/网络和安全/安全组 => 配置规则 => 添加端口号
```
* npm 操作
```
npm init    创建一个package.json
npm install  下载package中的所有依赖
npm install -g <name> 全局安装                   ===  npm i
npm install <name> --save 生产环境依赖           === npm i xxx -S
npm install <name> --save-dev 生产开发环境依赖    === npm i xxx -D
npm update xxxxx -x  更新
npm uninstall  卸载
```
* create-react-app安装步骤
https://github.com/yangliOMG/recruit-app#create-react-app
* 将webpack@3v 升级到 4 (https://segmentfault.com/a/1190000017175671)
```
npm i webpack@4.16.5
npm i webpack-cli@3.1.0                         //加入webpack-cli
npm i html-webpack-plugin@3.2.0                 //升级html-webpack-plugin

npm i react-dev-utils@next                      //升级react-dev-utils（测试版）
npm install extract-text-webpack-plugin@next    //升级extract-text-webpack-plugin（测试版）

npm rm eslint-loader && npm i eslint-loader     //升级eslint-loader

npm install extract-text-webpack-plugin@next     //升级extract-text-webpack-plugin（测试版）

--- 在webpack.config文件中，
。。。
new HtmlWebpackPlugin({       //InterpolateHtmlPlugin放在HtmlWebpackPlugin之后
      inject: true,
      template: paths.appHtml,
    }),
new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),      //引入HtmlWebpackPlugin

module.exports = {
  mode: 'development',                    //添加mode
  。。。    
```
* 实现import 。。。'@/...'指向src根路径
```在webpack.config文件中，
alias: {
      。。。
      '@': paths.appSrc,
},

配置jsconfig.json使vscode代码提示，点击跳转能够识别
```

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

*  sass/less ：预处理——需要函数来编译为CSS
```
> 3. 部分ios系统，对于某种格式的接口，在https或http下（有的http接口可用，https不行；部分系统相反），会报错"ECONNABORTED"
```
接口格式：
@RequestMapping("/info1.do")
public Map<String, Object> info1(String id, HttpServletRequest request) {
      String uid = (String) request.getSession().getAttribute("uid");
      Facility f = facilityService.findById(id);
      List<Price> price = facilityService.priceList(id);                     
      Map<String, Object> map = new HashMap<String, Object>();
      if (f != null) {
            BrowsingHistory newHistory = new BrowsingHistory();
            newHistory.setUid(uid);
            newHistory.setOid(f.getTid());
            browsingHistoryService.saveHistory(newHistory);
      }
      map.put("facility", f);
      map.put("price", price);                              //该行导致错误，new一个priceList也不会出现问题
      return map;                                           
}

==> //最终修改方案：给输出结果套一个格式Response.setSuccess(map)
```


* package.json
```
"scripts": {            //NODE_ENV环境变量；nodemon --exec 以应用程序执行脚本；
      。。。
      "server": "set NODE_ENV=test&&nodemon --exec babel-node server/server.js",
      "server_lx": "export NODE_ENV=test&&nodemon --exec babel-node server/server.js",
      "pm2": "set NODE_ENV=test&&pm2 start server/server_pm2.js",
      "server_pm2": "export NODE_ENV=test&&pm2 start server/server_pm2.js"
      //为了使pm2能够运行es6，在普通Javascript中准备一个入口点，它将在包含非转换源之前调用require('babel-register')。
      //server_pm2.js文件中包含babel-register，其将es6转换为es5的语法
}
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
* nginx做ssl证书配置，使站点通过https访问
```
阿里云上购买免费的证书--->域名解析设置，添加一条TXT的记录值，测试dns配置，等待证书签发->下载公钥私钥->部署到nginx/tomcat下，
server {
      listen 443;                   //http协议默认端口是80，https是443
      server_name www.fuyoufayuan.com;
      ssl on;
      root html;
      index index.html index.htm;
      ssl_certificate   cert/214860875720209.pem;
      ssl_certificate_key  cert/214860875720209.key;
      ssl_session_timeout 5m;
      ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      ssl_prefer_server_ciphers on;
      location / {                        //使https的默认端口映射到http的默认端口（使对https的访问转发到80端口）
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:80;
      }
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
* tomcat程序记录客户端真实IP,日志logs/access_log记录客户真实ip
> 1. 修改conf/server.xml文件
> 2. https://www.cnblogs.com/pangguoping/p/5748783.html
```
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%{X-Real-IP}i %{X-FORWARDED-FOR}i %l %u %t %r %s %b %D %q %{User-Agent}i" resolveHosts="false" />

1. X-Forwarded-For 的内容由「英文逗号 + 空格」隔开的多个部分组成，最开始的是离服务端最远的设备 IP，然后是每一级代理设备的 IP
2. X-Real-IP 通常被 HTTP 代理用来表示与它产生 TCP 连接的设备 IP，这个设备可能是其他代理，也可能是真正的请求端
3. 直接对外提供服务的 Web 应用，在进行与安全有关的操作时，只能通过 Remote Address 获取 IP，不能相信任何请求头

https://imququ.com/post/x-forwarded-for-header-in-http.html
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




#知识点

* undefined 和 null
```
* undefined 可以理解为一个 未赋值的 变量，typeof xx === "undefined"
* null 可以理解为一个 没有指向的（空指针）对象，typeof xx === 'object'
```
* [].slice.call(arguments) 能将具有length属性的对象转成数组
```
Array.prototype.slice.call(arguments)   
[].slice.call(arguments)   
[...arguments]
```
* 兄弟组件通信： 观察者模式  订阅-发布模式
```
//优点：解耦
//缺点：创建这个函数同样需要内存，过度使用会导致难以跟踪维护
var obz = (function(){
	var list = [], trigger, listener
	
	trigger = function (){
		var key = [].shift.call(arguments)
		var msg = list[key]
		if(!msg){
        	return false
		}
		for(let i=0; i< msg.length; i++){
			msg[i].apply(this,arguments)
		}
	}

	listener = function (key,fn){
		var msg = list[key]
		if(!msg){
			list[key] = []
		}
        list[key].push(fn)
	}
	return {trigger, listener}
})()

obz.listener("key",a=>console.log("listener接收的消息是："+a))
obz.trigger("key",["trigger发送消息1"])
```
* 祖父孙子组件通信： 生产者消费者模式
```
//优点：实现跨层级的组件通信
//缺点：不利于管理
ThemeContext：
      const ThemeContext  = React.createContext({
            background: 'red',
            color: 'white'
      });
      export default ThemeContext
父节点：
      <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
            <子节点 />
      </ThemeContext.Provider>
子节点：
      return (
            <ThemeContext.Consumer>
                  {context => (
                        <h1 style={{background: context.background, color: context.color}}>
                              {this.props.children}
                        </h1>
                  )}
            </ThemeContext.Consumer>
      );
(
      1.如果子节点没被provider包裹，可以取到默认值 
      2.provider的value的值，直接被修改不会被更新，要用this.state和this.setState
)
```
* context api
```
1.将provider放到祖先节点上，用来管理子节点的数据状态，可以部分代替 redux的功能，
```
* redux 状态管理(state)
```
1.把要做的修改变成一个普通对象，这个对象被叫做 action:{payload:-, type:-}，而不是直接修改 state。然后编写专门的函数来决定每个 action 如何改变应用的 state，这个函数被叫做 reducer。用dispatch分发/发起action
2.只有一个单一的 store
```

* react 事件绑定
```
1.constructor(props) {
    super(props);
    。。。
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
      。。。。
2.handleClick = () => {
    。。。
  }
  render() {
    return (
      <button onClick={this.handleClick}>
      。。。。
3.handleClick() {
    。。。
  }
  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}>
      。。。
2和3 语法的问题是，每次 LoggingButton 渲染时都创建一个不同的回调。在多数情况下，没什么问题。然而，如果这个回调被作为 prop(属性) 传递给下级组件，这些组件可能需要额外的重复渲染。我们通常建议在构造函数中进行绑定（方法1），以避免这类性能问题。
```
* 柯里化(Currying): 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数
```
function plus(num) {
    var adder = function () {
        var _args = [];
        var _adder = function _adder() {
            [].push.apply(_args, arguments);                //  _args.push(...arguments)
                                                            //  [].push.apply(_args, [].slice.call(arguments))
            return _adder;
        };
        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }

        return _adder;
    }
    return adder()(num);
}

plus(1)(4)(2)(3).toString()
```
* 高阶组件(HOC): 是一个函数，能够接受一个组件并返回一个新的组件。
> 高阶组件的概念应该是来源于JavaScript的高阶函数: 高阶函数就是接受函数作为输入或者输出的函数。柯里化也是高阶函数了
```
高阶函数：
function higherOrderFunction (callback) {
  return function () {
    return callback()
  }
}
```
> 好处：（属性代理、获得refs的引用）
> 1.写着无状态组件的时候，有一天忽然发现需要状态处理了，那么无需彻底返工      
> 2.往往我们需要状态的时候，这个需求是可以重用的，例如上面的 withViewport，今后可以用来给其他组件

> 高阶组件加无状态组件，则大大增强了整个代码的可测试性和可维护性
> 高阶组件属于函数式编程(functional programming)思想，对于被包裹的组件时不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件之上具有功能增强的效果。而Mixin这种混入的模式，会给组件不断增加新的方法和属性，组件本身不仅可以感知，甚至需要做相关的处理(例如命名冲突、状态维护)，一旦混入的模块变多时，整个组件就变的难以维护，也就是为什么如此多的React库都采用高阶组件的方式进行开发

* 函数式编程: 把代码拆成函数，通过一层一层的函数调用，就可以把复杂任务分解成简单的任务

* 无状态组件(Stateless Component): 是 React 0.14 之后推出的，大大增强了编写 React 组件的方便性，也提升了整体的渲染性能
> 无状态组件不支持 "ref"
> 将逻辑和数据处理与 UI 展示剥离开来，我们就可以避免在展示型组件中处理任何的状态。强制您将任何的状态处理移交至上层的组件树，而让下层的组件只做它们所做的——关注 UI 的展示.

* 受控组件 和 不受控组件
> 在受控组件中，表单数据由React组件处理。
> 不受控组件的数据来源是DOM元素，使用不受控组件时很容易实现React代码与非React代码的集成。如果你能希望的是快速开发，但不要求代码质量，不受控组件可以一定程度上减少代码量。

* ref
```
1. ref可以设置回调函数（推荐） 
<input type="text" ref={input => this.input = input} />  
调用：this.input
2. ref可以设置字符串（不推荐） 
<input ref="input" />        
调用：this.refs.input



import ReactDOM  from 'react-dom';

ReactDOM.findDOMNode(ref)

对于html元素使用ref的情况，ref本身引用的就是该元素的实际dom节点（ref===ReactDOM.findDOMNode(ref)）
该方法常用于React组件上的ref（ref!==ReactDOM.findDOMNode(ref)）
```
* xxx.d.ts  (d.ts就是TypedDefinition 类型定义文件，用来定义类型信息以及接口规范。)

* cssnext (cssnext 和 css4 并不是一个东西，cssnext使用下个版本css的草案语法)
> cssnext 特性： 1.自定义属性，自定义选择器  2. 选择器嵌套  3. 函数   4.编译速度 比 预处理 快得多

> 当前的浏览器默认支持 自定义属性custom properties，不支持自定义选择器custom selectors
```
:root{            //优势：全局的
  --fuzhuwenzi:#a46735;             //custom properties
}
.className{
    color: var(--fuzhuwenzi);
}
@custom-selector :--headings .test;       //custom selectors
:--headings { 
  color: var(--fuzhuwenzi);
}
```
> 引入包 postcss-cssnext，实现 自定义选择器custom selectors， 在其包中 包含了autoprefixer的内容。修改webpack,config的配置
```
require('autoprefixer')({           =====>     require("postcss-cssnext")           //详见recruit-app
      。。。。
})
```

* less 与 sass    (SCSS 是 Sass 3)
> LESS是基于JavaScript运行,所以LESS是在客户端处理。Sass是基于Ruby的，是在服务器端处理的。相比较之下前者解析会比后者慢一点
> cssnext 还无法替代 less/sass的功能，详见 recruit-app的login/login.css/.less/.scss

* less 的mixin(混合函数) 和loop(循环函数)
```（less background兼容写法）
@url:"./images";
background:url('@{url}/background.jpg') 0 0~"/" 100% 100% ;       //铺满
```
```（loop）
@0px:0px;         //坑点
.Function-style(50);                //调用函数
.Function-style(@n, @i: 5) when (@i =< @n) {          //函数
      
  .mt-@{i} { margin-top: @i + @0px; }       //生成这条样式

  .Function-style(@n, (@i + 5));           //循环嵌套
}
@fzList: 0,12,14,15,16,18,20,22,24,26,28,30,50;
.Function_fz(@fzList);
.Function_fz(@fzList, @i: 1, @val:extract(@fzList, @i)) when (@i =< length(@fzList, @i)) {            
                              //extract === fzList[i]   ,         length === fzList.length
    .f-@{val} { font-size: @val+@0px; }
    .Function_fz(@fzList, (@i + 1));
}
```
```（mixin）
.Function_mixin(@i){
    ...
    -webkit-line-clamp: @i; 
}
.text-overflow2{ .Function_mixin(2); }          //调用mixin时，括号是可选的
```

* sass 的mixin 和 loop
```（sass 变量定义）
$url:"./images";
background:url('#{$url}/job.png') 0 0 / 100% 100% ;
```
```（loop）
@for $i from 1 through  10 {  
    .mt-#{$i*5} {
        margin-top: $i*5+px ;
    }
}
@each $i in 0,12,14,15,16,18,20,22,24,26,28,30,50 {
    .f-#{$i} { font-size: $i+px; }
}
```
```（mixin）
@mixin Function_mixin($i ){
    -webkit-line-clamp: $i; 
}
.text-overflow2{ @include Function_mixin(2); }          //调用mixin时，括号是可选的
```

* WebAssembly与 JavaScript
```
WebAssembly 文件体积更小，下载速度更快, 解析更快

编译和优化：WebAssembly更接近于汇编语言，比 JavaScript 代码更快更直接的转换成机器代码。 编译和优化所需的时间较少，因为在将文件推送到服务器之前已经进行了更多优化，JavaScript 需要为动态类型多次编译代码

把高级别的语言（C，C++和Rust）编译为WebAssembly。目前还需要JS进行交互，用JS作为入口。
```