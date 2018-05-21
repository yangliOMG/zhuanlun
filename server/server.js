import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


const app = express()
const server = require('http').Server(app)


const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter) //开启中间键？？
server.listen(9093,function(){
    console.log('node app start at port 9093')
})