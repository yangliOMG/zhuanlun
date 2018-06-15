import axios from "axios";
import {getStorage } from '../util'

class Order{
    createOrder(order){
        return axios.get('/pray/create.do',{params: {
            data:JSON.stringify(order)
        }})
    }

    getWechatPay(res){
        return axios.get('/wxpay/wechat_paytest.do',{params: {
            prayId:res.prayId , 
            price:res.sum,
            openid: getStorage('user').openid
        }})
    }

    getTemplateList({type,content}){
        return axios.get(`/template/info.do?type=${type}&content=${content}`)
    }
}

export default Order