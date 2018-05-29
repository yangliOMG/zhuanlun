import axios from "axios";

class Order{
    createOrder(order){
        return axios.get('/user/info.do')
    }


    getTemplateList({type,content}){
        return axios.get(`/template/info.do?type=${type}&content=${content}`)
    }
}

export default Order