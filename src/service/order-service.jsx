import axios from "./axios"
import {getStorage } from '../util'

class Order{
    createOrder(order){
        return axios.get('/pray/create.do',{params: {
            data:JSON.stringify(order)
        }})
    }
    getOrderList(){
        return axios.get('/pray/list.do')
    }
    getOrderByid(id){
        return axios.get('/pray/items.do',{params: {
            id
        }})
    }
    getTopMes(){
        return axios.get('/pray/top.do',{params: {
            top:5
        }})
    }


    createBlissMan(blissMan){
        return axios.post('/blissMan/img.do',
            blissMan,
            { responseType: 'arraybuffer' }
        )
        // return axios({
        //     method: 'post',
        //     headers: { 'content-type': 'application/json;charset=UTF-8' },
        //     responseType: 'arraybuffer',
        //     data: blissMan,
        //     url:'/blissMan/img.do',
        // });
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
    getTextScan(content){
        return axios.get('/template/textScan.do',{params: {
            content
        }})
    }
}

export default Order