# react + react-router + redux + webpack
* redux ：redux + 其中间件(redux-thunk) 

> redux-thunk可升级为redux-saga
从redux-thunk到redux-saga实践：[https://segmentfault.com/a/1190000009928167]
```
相比Redux Thunk，使用Redux Saga有几处明显的变化：

在组件中，不再dispatch(action creator)，而是dispatch(pure action)
组件中不再关注由谁来处理当前action，action经由root saga分发
具体业务处理方法中，通过提供的call/put等帮助方法，声明式的进行方法调用
使用ES6 Generator语法，简化异步代码语法
```
```
总结：
saga利用了generator，使异步请求更加分离（使 接口与代码逻辑分离），同时也提供了各种异步方法（take,takeLatest）满足不同异步需求，
```

# antd-pro: react + dva + roadhog
* dva：redux + redux-saga + react-router  (基于 redux、redux-saga 和 react-router 的轻量级前端框架)
dva-github：[https://github.com/dvajs/dva/blob/master/README_zh-CN.md]
dva文档：[https://dvajs.com/guide/]
```
dva/router：默认输出 react-router 接口， react-router-redux 的接口通过属性 routerRedux 输出。
dva/saga：输出 redux-saga 的接口，主要用于用例的编写。（用例中需要用到 effects）。
dva/fetch：异步请求库，输出 isomorphic-fetch 的接口。不和 dva 强绑定，可以选择任意的请求库
dva/dynamic：解决组件动态加载问题的 util 方法。

数据流向：
数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 dispatch 发起一个 action，如果是同步行为会直接通过 Reducers 改变 State ，如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State，所以在 dva 中，数据流向非常清晰简明。

Effect： 
Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。

Saga：
dispatch 往 store 发送 action 的这个过程是可以被拦截的, 自然而然地就可以在这里增加各种 Middleware, 实现各种自定义功能。
saga 拦截这个 action, 发起 http 请求, 如果请求成功, 则继续向 reducer 发一个 type == addTodoSucc 的 action, 提示创建成功, 反之则发送 type == addTodoFail 的 action 即可
```
* roadhog：webpack  (基于 webpack 的封装工具，目的是简化 webpack 的配置)
roadhog-github：[https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md]


# antd-pro2: react + dva + umi
* umi：roadhog + 路由  (类似 next.js/nuxt.js，辅以一套插件机制，目的是通过框架的方式简化 React 开发)
umi文档：[https://umijs.org/zh/guide/]
用Next.js快速上手React服务器渲染：[https://segmentfault.com/p/1210000010368182/read]
