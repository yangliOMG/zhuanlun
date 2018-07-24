import axios from "./axios"
import qs from 'qs'
import {getStorage } from '../util'

class User{

    getSessionlogin(isMoblieMode,code){
        return new Promise(function(resolve,reject){
              const client = new XMLHttpRequest()
              client.open("GET", `/login/login.do?isMoblieMode=${isMoblieMode}&code=${code}`,true)
              client.onreadystatechange = function() {
                if (this.status === 200) {
                    try {
                        let data = JSON.parse(this.response)
                        const userinfo = {id:data.id, openid:data.openid, nick:data.nick, headImgURL:data.headImgURL}
                        resolve(userinfo)
                    } catch (error) {
                        console.log('login',error)
                    }
                } else {
                    reject(new Error(this.statusText))
                }
              }
              client.send()
        })
    }
    getUserLogin(isMoblieMode,code){
        return axios.get(`/login/login.do`,{params: {
            isMoblieMode,code
          }})
    }
    getUserMes(){
        return axios.get(`/login/info.do`,{params: {
            openid: getStorage('user').openid,
        }})
    }


    judgeIsFollow(){
        return axios.get(`/login/judgeIsFollow.do`,{params: {
        }})
    }
    sendVerCode(tel){
        return axios.get(`/sendMes/sendVerCode.do`,{params: {
            tel,
        }})
    }
    submitPhone(obj){
        return axios.get(`/login/bindingTel.do`,{params: {
            ...obj,
        }})
    }

    submitSuggest(content){
        // return axios.post(`/back/save.do`,{
        //     content,
        // })

        return axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({content}),
            url:'/back/save.do',
        })
    }

}

export default User