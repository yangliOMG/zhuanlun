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