### 倒计时 settimeout setInterval
* 相比于setInterval的优点，不用设置一个公共变量用于clearInterval。
* 将业务代码 与 逻辑代码分离，使代码复用性更强
```
function delay( time,updateCallback,endCallback ){              //逻辑函数，只针对倒计时逻辑
	time --;
	if(time===0){
		endCallback.call(this)
	}else{
		updateCallback.call(this,time)
		setTimeout(()=> delay(time,updateCallback,endCallback) ,1000 )
  }
}

delay( 10,function(time){               //  事物代码，将业务实现归为一类，直接调用逻辑代码，
	console.log(time)
},function(){
	console.log("end")
})
```
### 观察者模式  订阅-发布模式
```
//优点：解耦
//缺点：创建这个函数同样需要内存，过度使用会导致难以跟踪维护
var obz = (function(){
	var list = [], trigger, listener
	
	trigger = function (){
		var key = [].shift.call(arguments)
		var msg = list[key]
		if(!msg){
        	return false
		}
		for(let i=0; i< msg.length; i++){
			msg[i].apply(this,arguments)
		}
	}

	listener = function (key,fn){
		var msg = list[key]
		if(!msg){
			list[key] = []
		}
        list[key].push(fn)
	}
	return {trigger, listener}
})()

obz.listener("key",a=>console.log("listener接收的消息是："+a))
obz.trigger("key",["trigger发送消息1"])
```
### 自定义call函数实现
* call(),具有将this指针转换为首个参数的功能，所以具体实现思路就是 函数作为首个参数的函数，这样再调用，实现this指针指向的转移
```核心部分
Function.prototype.call2 = function(context){
      context.fn = this;
      context.fn()
}

Function.prototype.call2 = function(context){
      context.fn = this;
                                                const args = [];
                                                for(let i=1;i<arguments.length;i++){
      context.fn(...[...arguments].slice(1))===>       args.push('arguments['+i+']');
                                                }
                                                eval('context.fn('+args+')');             //用eval实现
      delete context.fn;
}
```
```
Function.prototype.bind = Function.prototype.bind || function(context){
    var self = this
    return function(){
        return self.apply(context, arguments);
    };
}
```

### 自定义Promise实现
* 观察者模式
* 通过Promise.prototype.then 将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
* 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。
```
function Promise(fn) {
    var state = 'pending', value = null, callbacks = [];

    this.then = function (onFulfilled, onRejected) {
        if (state === 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }
        var func = state === 'fulfilled'? onFulfilled : onRejected
        if(func){
            callbacks.push(func);
        }
        return this
    }
    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }
    function reject(newValue) {
        state = 'rejected';
        。。。
    }
    fn(resolve, reject)
}
---
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
```
### 函数防抖
```
function fd(fn,time){
	var timer ,flag = true
	return function (){
		if(flag){
			flag = false
            clearTimeout(timer)
            timer = setTimeout(()=>{
                fn.apply(this,arguments)
				flag = true
            },time)
		}
	}
}
$0.onclick = fd(v=>console.log(v),1000)
```
### express use 使用中间件
* use将中间件放入（函数）队列，通过next() 调用下一个中间件
```
function express() {
    var funcs = []; // 待执行的函数数组
    var app = function (req, res) {
        var i = 0;
        function next() {
            var task = funcs[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }
        next();
    }
    app.use = function (task) {
        funcs.push(task);
    }
    return app;    
}
var app = express();
function middlewareA(req, res, next) {
    console.log('A before next()');
    next();
    console.log('A after next()');
}
function middlewareB(req, res, next) {
    console.log('B before next()');
    next();
    console.log('B after next()');
}
app.use(middlewareA);
app.use(middlewareB);
app()
```
### js实现异步sleep
```
async function test() {
    console.log(new Date().getTime())
    await sleep(3000)
    console.log(new Date().getTime())
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
test()
```

### ES6 模块与 CommonJS 模块 
* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
```
var name = 'Byron';

function printFullName(firstName){
    console.log(firstName + name);
}

module.exports = {
    printName: printName,
}
```

#盲区
* 作用域实例化的共享
```a1和a2不共享作用域
function a(x){
    return function b(y){
        return y+x++
    }
}
var a1 = a(10)
var a2 = a(20)
a1(10)
a2(10)
```createMask被调用，mask是共享的
var createMask = function(){
  var mask
  return function(){
       return mask || ( mask = document.body.appendChild( document.createElement('divs') ) )
  }
}()
```
* 遮罩层居中问题  1. ab+50+margin负值   2.flex
```
父：position:fixed,top/bottom/left/right:0;  
    ==> 子：  absolute,left/top:50%,--定宽->margin:-200px 0 0 -200px;width/height:200px
                                    --不定->transform: translate(-50%,-50%);
父：flex,justify-content/align-items:center
```