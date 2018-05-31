import axios from "axios";
import {getStorage } from '../util'

class Order{
    createOrder(order){
        return axios.get('/user/info.do')
    }

    getWechatPay(price){
        return axios.get('/wxpay/wechat_paytest.do',{params: {
            orderNo:Date.parse(new Date()) / 1000 , 
            price:price,
            openid: getStorage('user').openid
        }})
    }

    getTemplateList({type,content}){
        return axios.get(`/template/info.do?type=${type}&content=${content}`)
    }
}

export default Order