import { put, call, all, fork, take } from 'redux-saga/effects'
import {getHistoryByType, getTempleById, getTempleListByName, getTempleListByPicker,getTempleListAll,
    getTowerAndPriceById,getPriceById,getTemplateType,getRandomTemplateByType,getTextScan,getRandomPosition,
    createOrder,getOrderByid,getTopMes,getLayoutById,getOccupyById, judgeIsFollow, getWechatPayCallback, getUserLogin,
    createBlissMan, getOrderList, deleteOrder, getHistoryListByType,getUserMes,sendVerCode,submitPhone,submitSuggest
 } from '../service/api.js'
import { TO_GET_TEMPLE, TO_GET_TEMPLELIST, TO_GET_TOWERMES, TO_GET_TEMPLATE, TO_GET_TEXTSCAN,TO_PUT_ORDER,
    TO_GET_ORDER,TO_GET_RANDOMPOSITION,TO_GET_LAYOUT,TO_GET_ORDERDETAIL,TO_GET_BLISS,TO_GET_ORDERLIST,TO_GET_LOGIN,
    TO_GET_ORDERDELETE,TO_GET_HISTORYLIST,TO_GET_USERINFO,TO_GET_VERCODE,TO_PUT_PHONE,TO_PUT_SUGGEST,
    SAVELIST,SAVEPRAYLIST,DELPRAYLIST, UPDATEORDER,INITORDER,UPDATEPOSITION,LOAD_DATA } from '../constant/actionType'
import { positionMesArray, setStorage } from '../util'

export function * rootSaga(){
    yield all([
        fork(watchTempleList),
        fork(watchTemMes),
        fork(watchTowerMes),
        fork(watchTemplate),
        fork(watchOrderPut),
        fork(watchOrder),
        fork(watchOrderList),
        fork(watchOrderDelete),
        fork(watchRandomPosition),
        fork(watchLayout),
        fork(watchOrderDetail),
        fork(watchHistoryList),
        fork(watchUserInfo),
        fork(watchVercode),
        fork(watchPhonePut),
        fork(watchSuggestPut),
        fork(watchLogin),
    ]);
}

export function* watchLogin(){
    while(true){
        const action = yield take(TO_GET_LOGIN)
        const { isMoblieMode,code } = action.payload
        const callback = action.callback
        let res = yield call(getUserLogin, isMoblieMode,code)
        try {
            const { id, openid, nick, headImgURL } = res.data
            if(id){
                const userinfo = {id , openid , nick , headImgURL }
                setStorage('user', userinfo )
                yield put({ type: LOAD_DATA, payload: userinfo })
                if(callback){
                    callback()
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
}
export function* watchUserInfo(){
    while(true){
        const action = yield take(TO_GET_USERINFO)
        const { openid } = action.payload
        const callback = action.callback
        let res = yield call(getUserMes, openid)
        try {
            if(res.data.tel)
                callback(res.data.tel)
        } catch (error) {
        }
    }
}
export function* watchVercode(){
    while(true){
        const action = yield take(TO_GET_VERCODE)
        const { phone } = action.payload
        const { callback, callback2} = action
        let res = yield call(sendVerCode, phone)
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
}
export function* watchPhonePut(){
    while(true){
        const action = yield take(TO_PUT_PHONE)
        const { tel, code } = action.payload
        const { callback, callback2} = action
        let res = yield call(submitPhone, {tel, code})
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
}
export function* watchSuggestPut(){
    while(true){
        const action = yield take(TO_PUT_SUGGEST)
        const { value } = action.payload
        const { callback, callback2} = action
        let res = yield call(submitSuggest, value)
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
}
export function* watchTempleList(){
    while(true){
        const action = yield take(TO_GET_TEMPLELIST)
        const {province='',tag='',name='',index,scrollMore=false,pickerVal=''} = action.payload
        const callback = action.callback
        let res 
        try {
            if(name !== ''){
                res = yield call(getTempleListByName,name,index)
            }else if(province !== ''&&tag !== ''){
                res = yield call(getTempleListByPicker,province,tag,index)
            }else if(pickerVal!==''){
                const arr = pickerVal.split('，')
                res = yield call(getTempleListByPicker,...arr,index)
            }else{
                res = yield call(getTempleListAll,index)
            }
            if(res.status === 200){
                if( !scrollMore || true){
                    if(res.data instanceof Array){
                        yield put({ type: SAVELIST, payload: res.data, index: index+1 })
                        if(callback){
                            callback()
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchHistoryList(){
    while(true){
        const action1 = yield take(TO_GET_HISTORYLIST)
        const { type } = action1.payload
        const {callback, } = action1 
        const res = yield call(getHistoryListByType,type)

        try {
            const list = [...new Set(res.data.map(v=>v[3]))]
            const res2 = yield all( list.map(id=> call(getTempleById,id,false)) )
            callback(res2.map(i=>i.data))
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchTemMes(){
    while(true){
        const action1 = yield take(TO_GET_TEMPLE)
        const { id,ifset=false } = action1.payload
        const callback = action1.callback
        const res = yield call(getHistoryByType,0)
        try {
            if(id||res.data.oid){
                const res2 = yield call(getTempleById,id||res.data.oid,ifset)
                if(res2.status === 200&&res2.data.temple.length>0){
                    callback(res2.data)
                }
            }else{
                window.location.href = '/templeList'
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchTowerMes(){
    while(true){
        const action1 = yield take(TO_GET_TOWERMES)
        const { fid } = action1.payload
        const { callback, callback2 } = action1 
        const res = yield call(getTowerAndPriceById,fid)
        const res2 = yield call(getPriceById,fid)
        const res3 = yield call(getTemplateType,fid)
        const res4 = yield call(getTopMes,fid)

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
}
export function* watchOrder(){
    while(true){
        const action1 = yield take(TO_GET_ORDER)
        const { id } = action1.payload
        const {callback,callback2} = action1 
        const res = yield call(getOrderByid,id)

        try {
            let { dengwei,fid } = res.data
            const res2 = yield call(getTowerAndPriceById,fid)
            const res3 = yield call(getPriceById,fid)
            
            let position = dengwei.map(v=>([
                v.address,
                positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")
            ]))
            yield put({ type: UPDATEORDER, payload: { position} })

            let price = {}, facility = res2.data.data.facility
            res3.data.data.forEach(v=>price[v.duration]=v.price)
            callback(facility,price)
        } catch (error) {
            callback2(error)
        }
    }
}
export function* watchOrderDetail(){
    while(true){
        const action1 = yield take(TO_GET_ORDERDETAIL)
        const { id } = action1.payload
        const {callback,callback2} = action1 
        const res = yield call(getOrderByid,id)
        const res2 = yield call(judgeIsFollow)

        try {
            const order = res.data
            if(order.payStatus!==2){
                const res3= yield call(getWechatPayCallback,{prayId:order.id})
                if(res3.status===200&&res3.data.trade_state==='SUCCESS'){
                    order.payStatus = 2
                }
            }
            callback(order,res2.data)
        } catch (error) {
            callback2(error)
        }
    }
}
export function* watchTemplate(){
    while(true){
        const action1 = yield take(TO_GET_TEMPLATE)
        const { type } = action1.payload
        const { callback, callback2 } = action1 
        const res = yield call(getRandomTemplateByType,type)
        try {
            if(res.status === 200&& res.data.content){
                yield put({ type: UPDATEORDER, payload: { blessing: res.data.content} })
                callback()
            }else{
                callback2()
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchOrderList(){
    while(true){
        yield take(TO_GET_ORDERLIST)
        const res = yield call( getOrderList )
        try {
            yield put({ type: SAVEPRAYLIST, payload: res.data  })
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchOrderDelete(){
    while(true){
        const action1 = yield take(TO_GET_ORDERDELETE)
        const { id } = action1.payload
        const { callback } = action1 
        yield call( deleteOrder,id )
        yield put({ type: DELPRAYLIST, payload: id  })
        callback()
    }
}
export function* watchTextScan(){
    while(true){
        const action1 = yield take(TO_GET_TEXTSCAN)
        const { blessing } = action1.payload
        const { callback, callback2 } = action1 
        const res = yield call( getTextScan,blessing )
        try {
            if(res.status === 200&& res.data.suggestion==='pass'){
                callback()
            }else if(res.status === 200&& res.data.suggestion==='block'){
                const dic = { spam:'含垃圾信息', ad:'广告', politics:'涉政', terrorism:'暴恐',
                    abuse:'辱骂', porn:'色情', flood:'灌水', contraband:'违禁', meaningless:'无意义'}
                    
                callback2('祈愿文内容违规，违规原因：'+dic[res.data.label])
            }else{
                callback2(JSON.stringify(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchRandomPosition(){
    while(true){
        const action1 = yield take(TO_GET_RANDOMPOSITION)
        const { id,num } = action1.payload
        const { callback } = action1 
        const res = yield call( getRandomPosition,id,num )
        try {
            let position = res.data.data.map(v=>([
                v.address,
                positionMesArray(v.side,v.row,v.col,v.maxrow,"mode1")
            ]))
            yield put({ type: UPDATEORDER, payload: { position} })
        } catch (error) {
            callback(error)
        }
    }
}
export function* watchLayout(){
    while(true){
        const action1 = yield take(TO_GET_LAYOUT)
        const { id } = action1.payload
        const { callback, } = action1 
        const res = yield call( getLayoutById,id )
        const res2 = yield call( getOccupyById,id )
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
        }
    }
}
export function* watchOrderPut(){
    while(true){
        const action1 = yield take(TO_PUT_ORDER)
        const { order } = action1.payload
        const { callback, callback2 } = action1 
        const res = yield call( createOrder,order )

        try {
            if(res.data.returnCode===1000){
                yield put({ type: INITORDER  })
                callback(res.data.data)
            }else{
                if(res.data.data){
                    let occ = res.data.data.occ
                    if(occ){
                        yield put({ type: UPDATEPOSITION, payload: occ })
                    }
                    callback2(res.data.data.errorInfo)
                }else{
                    callback2(JSON.stringify(res.data))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export function* watchBlissMan(){
    while(true){
        const action1 = yield take(TO_GET_BLISS)
        const { blissMan } = action1.payload
        const {callback} = action1 
        const res = yield call(createBlissMan, blissMan)
        try {
            let src = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            callback(src)
        } catch (error) {
        }
    }
}
