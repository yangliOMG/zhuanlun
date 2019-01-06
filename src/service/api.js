import axios from "./axios"
import qs from 'qs'

export async function getHistoryByType(type) {
    return axios.get(`/history/recent.do`,{params: {
        type
    }})
}
export async function getHistoryListByType(type) {
    return axios.get(`/history/my.do`,{params: {
        type
    }})
}


export async function getTempleById(tid,ifset) {
    return axios.get(`/temple/info.do`,{params: {
        tid,ifset
    }})
}
export async function getTempleListAll(index) {
    return axios.get(`/temple/allList.do`,{params: {
        index:1,
        page:1*index
    }})
}
export async function getTempleListByName(name,index) {
    return axios.get(`/temple/nameList.do`,{params: {
        name,
        index:1,
        page:1*index
    }})
}
export async function getTempleListByPicker(province,tag,index) {
    return axios.get(`/temple/proAndSectList.do`,{params: {
        province,
        tag,
        index:1,
        page:1*index
    }})
}


export async function createOrder(order) {
    return axios.get('/pray/create.do',{params: {
        data:JSON.stringify(order)
    }})
}
export async function getOrderByid(id) {
    return axios.get('/pray/items.do',{params: {
        id
    }})
}
export async function getOrderList() {
    return axios.get('/pray/list.do')
}
export async function deleteOrder(id) {
    return axios.get('/pray/delete.do',{params: {
        id
    }})
}
export async function getTopMes(fid) {
    return axios.get('/pray/top.do',{params: {
        top:10,fid
    }})
}


export async function getOccupyById(id) {
    return axios.get(`/facility/occupy.do`,{params: {
        id
    }})
}
export async function getLayoutById(id) {
    return axios.get(`/facility/layout.do`,{params: {
        id
    }})
}
export async function getTowerAndPriceById(id) {
    return axios.get(`/facility/info1.do`,{params: {
        id
    }})
}
export async function getPriceById(id) {
    return axios.get(`/facility/price.do`,{params: {
        id
    }})
}
export async function getRandomPosition(id,num) {
    return axios.get(`/facility/random.do`,{params: {
        id,num
    }})
}

export async function getTemplateType(fid) {
    return axios.get(`/template/type.do?fid=${fid}`)
}
export async function getRandomTemplateByType(type) {
    return axios.get('/template/random.do',{params: {
        type
    }})
}
export async function getTextScan(content) {
    return axios.get('/template/textScan.do',{params: {
        content
    }})
}


export async function getUserLogin(isMoblieMode,code) {
    return axios.get(`/login/login.do`,{params: {
        isMoblieMode,code
      }})
}
export async function judgeIsFollow() {
    return axios.get(`/login/judgeIsFollow.do` )
}
export async function getUserMes(openid) {
    return axios.get(`/login/info.do`,{params: {
        openid ,
    }})
}
export async function submitPhone(obj) {
    return axios.get(`/login/bindingTel.do`,{params: {
        ...obj,
    }})
}

export async function sendVerCode(tel) {
    return axios.get(`/sendMes/sendVerCode.do`,{params: {
        tel,
    }})
}


export async function createBlissMan(blissMan) {
    return axios.post('/blissMan/img.do',
        qs.stringify(blissMan),
        { responseType: 'arraybuffer' }
    )
}

export async function submitSuggest(content) {
    return axios.post(`/back/save.do`,
        qs.stringify({content}),
    )
}


export async function getWechatPay(res) {
    return axios.get('/wxpay/wechat_pay.do',{params: {          //wechat_pay     wechat_paytest
        prayId:res.prayId , 
    }})
}
export async function getWechatPayCallback(res) {
    return axios.get('/wxpay/updatePrayType.do',{params: {
        prayId:res.prayId , 
    }})
}