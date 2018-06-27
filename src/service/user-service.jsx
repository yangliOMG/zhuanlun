import axios from "axios";
import {getStorage } from '../util'

class User{

    getUserInfo(code){
        return axios.get(`/login/login.do`,{params: {
            code
          }})
    }

    getUserMes(){
        return axios.get(`/login/info.do`,{params: {
            openid: getStorage('user').openid,
        }})
    }


    sendVerCode(phone){
        return axios.get(`/login/login.do`,{params: {
            phone,
        }})
    }

    submitPhone(obj){
        return axios.get(`/login/login.do`,{params: {
            ...obj,
            openid: getStorage('user').openid,
        }})
    }

    submitSuggest(value){
        return axios.get(`/login/login.do`,{params: {
            suggest:value,
            openid: getStorage('user').openid,
        }})
    }

}

export default User