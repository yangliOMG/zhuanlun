import axios from "axios";


let appId, timeStamp, nonceStr, packg, sign,
    ordernum = Date.parse(new Date()) / 1000
    

export function webchatPay(price=""){
    axios.post('wxpay/wechat_pay.do',{orderNo:ordernum, price:price,openid:"otKM8wrG_00JDAlFvoH3egZcCpz0",templeId:"1"}).then(data=>{
        appId = data.result.appid
        timeStamp = data.result.timestamp
        nonceStr = data.result.nonceStr
        packg = data.result.packageValue
        sign = data.result.paySign

        if (typeof(WeixinJSBridge) === "undefined"){  
            if( document.addEventListener ){  
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);  
            }else if (document.attachEvent){  
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);  
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);  
            }  
        }else{  
            onBridgeReady();  
        }
    })
}
    
function onBridgeReady(){
    if(typeof window.WeixinJSBridge === "undefined"){
        return alert("WeixinJSBridge未定义")
    }
    window.WeixinJSBridge.invoke(  
        'getBrandWCPayRequest', {  
            "appId" : appId,     //公众号名称，由商户传入   
            "timeStamp" : timeStamp, //时间戳，自1970年以来的秒数 (java需要处理成10位才行，又一坑)  
            "nonceStr" : nonceStr, //随机串  
            "package" : packg, //拼装好的预支付标示  
            "signType" : "MD5",//微信签名方式  
            "paySign" : sign //微信签名  
        },  
        function(res){  
            alert(JSON.stringify(res))
            if(res.err_msg === "get_brand_wcpay_request:ok" ) {
                //使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。  

            }  
        }  
    )   
} 
