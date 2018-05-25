/*
 * @Author: yangli 
 * @Date: 2018-05-21 11:17:09 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-05-25 14:28:04
 */
import { Toast } from 'antd-mobile';

/**
 * 比较页面父子关系
 * @param {历史页} lastPath 
 * @param {当前页} page 
 */
export function comparePath(lastPath,page){
    let relationship = 'son'
    if(page.father && page.father.length>0){
        relationship = page.father.includes(lastPath) ? 'father' : relationship
    }
    if(page.son && page.son.length>0){
        relationship = page.son.includes(lastPath) ? 'son' : relationship
    }
    return relationship
}
/**
 * 存缓存
 * @param {key} name 
 * @param {value} data 
 */
export function setStorage(name,data){
    let dataType = typeof data;
    if(typeof data === 'object'){
        window.localStorage.setItem(name,JSON.stringify(data));
    }else if(['number','string','boolean'].indexOf(dataType)>=0){
        window.localStorage.setItem(name,data);
    }else{
        alert('不能存')
    }
}
/**
 * 取缓存
 * @param {key} name 
 */
export function getStorage(name){
    let data = window.localStorage.getItem(name);
    let dataType = typeof data;
    if(typeof data === 'object'){
        return JSON.parse(data)
    }else if(['number','string','boolean'].includes(dataType)){
        return data
    }else{
        return "";
    }
}
/**
 * 删缓存
 * @param {key} name 
 */
export function removeStorage(name){
    window.localStorage.removeItem(name)
}
/**
 * 弹出框
 * @param {内容} msg 
 */
export function showToast(msg) {
    Toast.info(msg, 1);
}
/**
 * 数字转汉字
 * @param {数字} num 
 */
export function numberDictionary(num){
    let dick = ['一','二','三','四','五','六','七','八','九','十',
                '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',]
    return dick[num] || "超出边界"
}
/**
 * 三维数组选出最优的num个位置
 * @param {三维数组} dataArr 
 * @param {数量} num 
 */
export function recommendAI(dataArr,num){
    let bestPos = new Map()
    // let data = []
    dataArr.forEach((arr2d,idx) => {
        arr2d.forEach((arrrow,idx1) => {
            let count = 0 , row = []
            arrrow.forEach((v,idx2) => {
                let val = 0;
                if(v===1){
                    count = 0
                }else{
                    val += 10 
                    for (let i = 0; i < count; i++) {
                        // data[data.length-i-1] += 10*count
                        row[row.length-i-1] += 10*count
                    }
                    count ++
                }
                // data.push(val)
                row.push(val)
                bestPos.set(val,[idx,idx1,idx2])
            })
            row.forEach((v,idx2) => {
                bestPos.set(v,[idx,idx1,idx2])
            })
            while(bestPos.size > num){
                let min = Math.min(...bestPos.keys())
                bestPos.delete(min)
            }
        })
    })
    return [...bestPos.values()]
}

export function getRedirectPath({type,avatar}){
    let url = (type==='boss')?'/boss':'/genius'
    if(!avatar){
        url += 'info'
    }
    return url
}

