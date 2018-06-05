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
    extensions: ['png'],
    limit: 9000
});

const app = express()
const server = require('http').Server(app)
const proxy = require('http-proxy-middleware')
const proxyPath = 'http://localhost:8000'

app.use(cookieParser())
app.use(bodyParser.json())


app.use(['/img/*','*.do'], proxy({target: proxyPath, changeOrigin: true}));

app.use(function (req, res, next) {   //不是/static(静态资源)，都映射到index.html
    if ( req.url.startsWith('/static')||req.url.endsWith('.ico')) {
        return next()
    }
    const store = createStore(reducer, compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    const obj = {
        '/templeList': '寺院列表',
        '/temple': '寺院',
        '/tower': '祈福塔',
        '/templeDetail': '寺院详情',
        '/jpgmall/prayForm': '祈福供灯',
        '/prayDetail': '供灯详情',
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
            <title>福佑灯塔</title>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
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
    markupStream.pipe(res, { end: false })
    markupStream.on('end', () => {
        res.write(`</div>
                <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
                <script src="/${staticPath['main.js']}"></script>
        </body>
    </html>`)
        res.end()
    })
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function () {
    console.log('node app start at port 9093')
})