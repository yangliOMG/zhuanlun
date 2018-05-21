/*
 * @Author: yangli 
 * @Date: 2018-05-21 11:17:09 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-05-21 17:47:17
 */
export function numberDictionary(num){
    let dick = ['一','二','三','四','五','六','七','八','九','十',
                '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',]
    return dick[num] || "超出边界"
}


// data : [
//     [
//         [0,1,0,1,0,0,0,0,0],
//         [0,1,0,1,0,0,1,0,0],
//         [0,1,0,1,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0],
//     ],
//     [
//         [0,1,0,1,0,0,0,0,0],
//         [0,1,0,1,0,0,0,0,0],
//         [0,1,0,1,1,1,1,1,0],
//         [0,1,0,1,0,0,1,0,0],
//     ],
//     [
//         [0,1,0,1,0,0,1,0,0],
//         [0,1,0,1,0,1,0,0,0],
//         [0,1,0,1,0,0,1,0,0],
//         [0,1,0,1,1,1,0,1,0],
//     ],
// ],

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

