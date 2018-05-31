import Order from '../../service/order-service.jsx'
const _order = new Order()

export function webchatPay(price=""){
    _order.getWechatPay(price).then(res=>{
        if (typeof(WeixinJSBridge) === "undefined"){  
            if( document.addEventListener ){  
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(res.data), false);  
            }else if (document.attachEvent){  
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(res.data));  
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(res.data));  
            }  
        }else{  
            onBridgeReady.call(res.data);  
        }
    })
}
    
function onBridgeReady(){
    if(typeof window.WeixinJSBridge === "undefined"){
        return alert("WeixinJSBridge未定义")
    }
    window.WeixinJSBridge.invoke(  
        'getBrandWCPayRequest', {  
            "appId" : this.appid,     //公众号名称，由商户传入   
            "timeStamp" : this.timestamp, //时间戳，自1970年以来的秒数 (java需要处理成10位才行，又一坑)  
            "nonceStr" : this.nonceStr, //随机串  
            "package" : this.packageValue, //拼装好的预支付标示  
            "signType" : "MD5",//微信签名方式  
            "paySign" : this.paySign //微信签名  
        },  
        function(res){  
            if(res.err_msg === "get_brand_wcpay_request:ok" ) {
                //使用以下方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。  
                window.location.href = '/prayDetail#123'
            }  
        }  
    )   
} 
