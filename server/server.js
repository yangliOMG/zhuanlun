import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'

import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import App from '../src/app.jsx'
import reducer from '../src/reducer.jsx'

import { renderToNodeStream } from 'react-dom/server'
import staticPath from '../build/asset-manifest.json'

assethook({
    extensions: ['jpg', 'png', 'gif'],
    limit: 9000
})

const app = express()
const server = require('http').Server(app)
const proxy = require('http-proxy-middleware')
const DEFAULT_PORT = 8021
const proxyPath = 'http://localhost:8080'

app.use(cookieParser())
app.use(bodyParser.json())

//CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）
app.use(['/img/*','*.do'], proxy({target: proxyPath, changeOrigin: true}))

app.use(function (req, res, next) {   //不是/static(静态资源)，都映射到index.html
    const regArr = [ /^\/static/, /^\/foli/, /^\/html/, /^\/fontAwesome/, /.ico$/, /.txt$/ ]
    if(regArr.some( v=> v.test(req.url) )){
    // if ( req.url.startsWith('/static')||req.url.startsWith('/foli')||req.url.startsWith('/html')||req.url.startsWith('/fontAwesome')
    //     ||req.url.endsWith('.ico')||req.url.endsWith('.txt')) {
        return next()       //静态资源，都走下一个中间件
    }
    const store = createStore(reducer, compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    const obj = {
        '/gongde': '供灯功德',
        '/haochu': '供灯好处',
        '/yuanqi': '缘起',
        '/templeList': '寺院列表',
        '/temple': '寺院',
        '/tower': '祈福塔',
        '/templeDetail': '寺院详情',
        '/pay/prayForm': '祈福供灯',
        '/pay/prayDetail': '供灯详情',
        '/personalCenter': '个人中心',
        '/myPraylist': '我的祈福',
        '/myCarelist': '我的收藏',
        '/myHistory': '我的足迹',
    }
    res.write(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
            <meta name="theme-color" content="#000000">
            <title>${obj[req.url]||'福佑灯塔'}</title>
            <link href="/fontAwesome/css/font-awesome.min.css" rel="stylesheet">
            <Link rel="stylesheet" href="/${staticPath['main.css']}">
            <meta name="keywords" content="福佑灯塔">
            <meta name="description" content="${obj[req.url]||'福佑灯塔'}">
        </head>
        <body>
        <div id="root">`)
    const markupStream = renderToNodeStream(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>)
    markupStream.pipe(res, { end: false })// end表示节点流还没有结束
    markupStream.on('end', () => {      // 监听事件结束后 把剩下的流推过去
        res.write(`</div>
                <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
                <script src="/${staticPath['main.js']}"></script>
        </body>
    </html>`)
        res.end()
    })
})
app.use('/', express.static(path.resolve('build')))

server.listen(DEFAULT_PORT, function () {
    console.log('node app start at port '+DEFAULT_PORT)
})