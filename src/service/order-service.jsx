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
            openid: getStorage('user').openid,
            tid: res.tid,
        }})
    }

    getWechatPayCallback(res){
        return axios.get('/wxpay/updatePrayType.do',{params: {
            prayId:res.prayId , 
            price:res.sum,
            openid: getStorage('user').openid
        }})
    }



    getTemplateList({type,content}){
        return axios.get(`/template/info.do?type=${type}&content=${content}`)
    }

    getRandomTemplateByType(type){
        return axios.get('/template/random.do',{params: {
            type
        }})
    }
}

export default Order