import Tem from './temple-service.jsx'
import Order from './order-service.jsx'
import User from './user-service.jsx'

import { positionMesArray, setStorage} from '../util'

const _temple = new Tem()
const _order = new Order()
const _user = new User()


export async function ajaxLogin(payload,callback ){
    let { isMoblieMode,code } = payload
    let res = await _user.getUserLogin(isMoblieMode,code)
    try {
        const { id, openid, nick, headImgURL } = res.data
        if(id){
            const userinfo = {id , openid , nick , headImgURL }
            setStorage('user', userinfo )
            if(callback){
                callback()
            }
        }
    } catch (error) {
        console.error(error)
    }
}
export async function ajaxUserinfo(payload ,callback){
    let { openid } = payload
    let res = await _user.getUserMes(openid)
    try {
        if(res.data.tel)
            callback(res.data.tel)
    } catch (error) {
    }
}
export async function ajaxVercode(payload ,callback,callback2){
    let { phone } = payload
    let res = await _user.sendVerCode(phone)
    try {
        let status = res.data[0], mes = ''
        if(status==='1'){
            mes = '短信验证码已成功发送！'
        }else if(status==='-1'){
            mes = '短信验证码请求间隔为60s！'
        }else{
            mes = '短信验证码发送失败！！'
            callback2()
        }
        callback(mes)
    } catch (error) {
    }
}
export async function ajaxPhonePut(payload ,callback,callback2){
    let { tel, code } = payload
    let res = await _user.submitPhone({tel, code})
    try {
        let mes = ''
        if(res.data.msg){
            mes = res.data.msg
        }else if(res.data){
            mes = '绑定成功！'
            callback2()
        }else{
            mes = '验证码有误！'
        }
        callback(mes)
    } catch (error) {
        callback("error")
        console.error(error)
    }
}
export async function ajaxSuggestPut(payload ,callback,callback2){
    let { value } = payload
    let res = await _user.submitSuggest(value)
    try {
        let mes = ''
        if(res.status===200){
            mes ='提交成功！'
            callback2()
        }else{
            mes = res.result
        }
        callback(mes)
    } catch (error) {
        callback("error")
        console.error(error)
    }
}
export async function ajaxHistoryList(payload ,callback,){
    let { type } = payload
    const res = await  _temple.getHistoryListByType(type)
    try {
        const list = [...new Set(res.data.map(v=>v[3]))]
        const promise = list.map(id=>_temple.getTempleById(id))
        Promise.all(promise).then(res=>{
            callback(res.map(i=>i.data))
        })
    } catch (error) {
        console.log(error)
    }
}
export async function ajaxTempleList(payload ,callback,callback2){
    let {province='',tag='',name='',index,scrollMore=false,pickerVal=''} = payload
    let res 
    try {
        if(name !== ''){
            res = await  _temple.getTempleListByName(name,index)
        }else if(province !== ''&&tag !== ''){
            res = await  _temple.getTempleListByPicker(province,tag,index)
        }else if(pickerVal!==''){
            res = await  _temple.getTempleListByPicker(...pickerVal.split('，'),index)
        }else{
            res = await  _temple.getTempleListAll(index)
        }
        
        if(res.status === 200){
            if( !scrollMore || true){
                if(res.data instanceof Array){
                    callback(res.data,index+1)
                    if(callback2){
                        callback2()
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export async function ajaxTempleMessage(id, callback){
    try {
        if(!id){
            let res = await _temple.getHistoryByType(0)
            id = res.data.oid
        }
        if(id){
            const res2 = await _temple.getTempleById(id,true)
            if(res2.data.temple.length>0){
                callback(res2.data)
            }
        }else{
            window.location.href = '/templeList'
        }
    } catch (error) {
    }
}
export async function ajaxTowerMessage(payload, callback,callback2){
    const { id } = payload
    const res = await _temple.getTowerAndPriceById(id)
    const res2 = await _temple.getPriceById(id)
    const res3 = await _order.getTemplateType(id)
    const res4 = await _order.getTopMes(id)

    let obj={}, price={}, list=[], navList=[], mes=''
    try {
        obj = res.data.data.facility
    } catch (error) {
        mes += '没有该祈福塔信息.'
    }
    try {
        res2.data.data.forEach(v=>price[v.duration]=v.price)
    } catch (error) {
        mes += '没有价格信息.'
    }
    try {
        list = res3.data.data.map((v,idx)=>({...v,flag:idx===0?true:false}))
    } catch (error) {
        mes += '没有祈福类型信息.'
    }
    try {
        navList = res4.data.data
    } catch (error) {
    }
    callback(obj,price,list,navList)
    if(mes){
        callback2(mes)
    }
}
export async function ajaxOrderMessage(payload, callback,callback2){
    const { pid } = payload
    const res = await _order.getOrderByid(pid)
    try {
        let { dengwei,fid } = res.data
        const res2 = await _temple.getTowerAndPriceById(fid)
        const res3 = await _temple.getPriceById(fid)

        let price = {}, facility = res2.data.data.facility
        res3.data.data.forEach(v=>price[v.duration]=v.price)

        callback(facility,price,dengwei)
    } catch (error) {
        callback2(error)
    }
}
export async function ajaxOrderDetail(payload, callback,callback2){
    const { id } = payload
    const res = await _order.getOrderByid(id)
    const res2 = await _user.judgeIsFollow()

    try {
        const order = res.data
        if(order.payStatus!==2){
            const res3= await _order.getWechatPayCallback({prayId:order.id})
            if(res3.status===200&&res3.data.trade_state==='SUCCESS'){
                order.payStatus = 2
            }
        }
        callback(order,res2.data)
    } catch (error) {
        callback2(error)
    }
}
export async function ajaxRandomPosition(payload, callback,callback2){
    const { id, num } = payload
    const res = await _temple.getRandomPosition(id,num)
    try {
        let position = res.data.data.map(v=>([
            v.address,
            positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")
        ]))
        callback(position)
    } catch (error) {
        callback2(error)
    }
}
export async function ajaxTemplate(payload, callback,callback2){
    const { type } = payload
    const res = await _order.getRandomTemplateByType(type)
    try {
        callback(res.data.content)
    } catch (error) {
        callback2()
    }
}
export async function ajaxTextScan(payload, callback,callback2){
    const { blessing } = payload
    const res = await _order.getTextScan(blessing)
    try {
        const suggestion = res.data.suggestion
        if(suggestion==='pass'){
            callback()
        }else if(suggestion==='block'){
            const dic = { spam:'含垃圾信息', ad:'广告', politics:'涉政', terrorism:'暴恐',
                abuse:'辱骂', porn:'色情', flood:'灌水', contraband:'违禁', meaningless:'无意义'}
            callback2('祈愿文内容违规，违规原因：'+dic[res.data.label])
        }
    } catch (error) {
        callback2(JSON.stringify(res.data))
    }
}
export async function ajaxOrderPut(payload, callback,callback2,callback3){
    const { order } = payload
    const res = _order.createOrder(order)
    try {
        if(res.data.returnCode===1000){
            callback(res.data.data)
        }else{
            if(res.data.data){
                let occ = res.data.data.occ
                if(occ){
                    callback2(occ)
                }
                callback3(res.data.data.errorInfo)
            }else{
                callback3(JSON.stringify(res.data))
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export async function ajaxLayout(payload, callback){
    const { id } = payload
    const res = await _temple.getLayoutById(id)
    const res2 = await _temple.getOccupyById(id)
    try {
        let layout = res.data
        let occupy = res2.data
        let total = 0, data
        data = layout.map(arrd=>
                arrd.map(arr=>
                    arr.map(id=>{
                        total++;
                        return {id,state: occupy.includes(id)?1:0}
                    })     //0可选，1不可选，2已选
                )
        )
        callback(data, total, occupy.length)
    } catch (error) {
        console.log(error)
    }
}
export async function ajaxPraylist( callback){
    const res = await _order.getOrderList()
    if(res)
        callback(res.data)
}
export async function ajaxOrderDelete( payload,callback){
    const { id } = payload
    await _order.deleteOrder(id)
    callback()
}
export async function ajaxBlissMan( payload,callback){
    const { blissMan } = payload
    const res = await _order.createBlissMan(blissMan)
    try {
        let src = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        callback(src)
    } catch (error) {
    }
}