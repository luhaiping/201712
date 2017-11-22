##JAVASCRIPT中有关于回调函数的详细深入解读
@(201712)

###什么是回调函数？
> 把一个函数当做实参值传递给函数的形参变量(或者传递给函数，通过arguments获取)，在另外一个函数中把传递的函数执行，这种机制就是回调函数机制
>  
> 凡是在某一个函数的某一个阶段需要完成某一件事情（而这件事情是不确定的），都可以利用回调函数机制，把需要处理的事情当做值传递进来

```javascript
function fn(num,callBack){
	//=>callBack：传递进来的回调函数
	typeof callBack==='function'?callBack():null;
	
	callBack && callBack();//=>这种方式默认就是，要不然不传递参数，传递的话参数值肯定是函数
}

fn(10);
fn(20,function(){
	//=>此处的匿名函数就是给callBack传递的值
});
```
> 既然我们已经把函数作为值传递给FN了，此时在FN中我们可以尽情的操作传递的函数
> 1、我们可以在FN中把回调函数执行 0~N 次
> 2、我们还可以给回调函数传递参数值
> 3、我们还可以把回调函数中的THIS进行修改
> 4、我们还可以接收回调函数执行返回的值
> ...

```javascript
//=>需求:执行FN可以实现任意数求和,把求出的和传递给回调函数
function fn(callBack) {
    //->把ARG中的除第一项以外的参数值获取到,并且转变为数组（并且给数求和）
    var argNumAry = Array.prototype.slice.call(arguments, 1),
        total = eval(argNumAry.join('+'));
    //->执行回调函数，把求出的和当做实参传递给回调函数，并且回调函数中的this指向    
    typeof callBack === 'function' ? callBack.call(fn, total) : null;
}

var total=null;
fn(function (result) {
    console.log(result, this);//=>100 FN
    total=result;
}, 10, 20, 30, 40);
```
> 我们之前学习的知识点中，很多方法都是依托于回调函数来完成的
```javascript
var ary=[12,23,34];
ary.sort(function(a,b){
	//->a:当前项
	//->b:后一项
	return a-b;//->返回一个大于零的值,a和b的位置进行交换
});

ary.forEach(function(item,index,input){
	//->item:当前遍历的这一项
	//->index:当前遍历这一项的索引
	//->input:原始遍历的数组
	
	//=>FOR-EACH每当循环遍历到数组中的某一项，都会把传递的回调函数执行一次（不仅执行还把遍历的这一项的值传递给回调函数）
});

//=>MAP遍历数组中的每一项,原有数组不变,返回的结果是修改后的新数组（MAP相当于FOR-EACH来说，增加了对原有项的修改）
var newAry = ary.map(function (item,index,input) {
	return item*10;//=>回调函数中返回的是啥，相当于把当前遍历这一项修改为啥（回调函数中不写RETURN，默认返回的是undefined）
});

var str='zhufeng2017peixun2018';
str=str.replace(/\d+/g,function(){
	return '@';
});

...
```

###回调函数中的this指向问题
> 回调函数中的this一般都是window（或者在严格模式下是undefined），原因：
> 
> 我们一般在执行回调函数的时候，都是直接的把它执行了，没有特意指定执行主体或者使用call改变this，所以默认一般都是window

`有关定时器回调函数中this的处理`
```javascript
var obj = {name: '珠峰培训', fn: fn};
function fn() {
    console.log(this);
}
setTimeout(fn, 1000);//=>非严格模式或者严格模式下FN中的THIS都是WINDOW
setTimeout(fn.call(obj), 1000);//=>设置定时器的时候就把FN执行了,把FN的返回结果赋值给定时器(1S后执行的是UNDEFINED)
setTimeout(obj.fn, 1000);//=>FN中的THIS还是WINDOW
setTimeout(fn.bind(obj), 1000);//=>FN中的THIS都是OBJ
setTimeout(function () {
    //=>this:window
    fn.call(obj);
}, 1000);//=>FN中的THIS都是OBJ
```
`数组中方法回调函数中this指向问题`
```javascript
var obj = {name: '珠峰培训'};
var ary = [12, 23, 34, 45];
ary.sort(function () {
    console.log(this);//=>WINDOW(严格模式下是UNDEFINED)
});

ary.forEach(function () {
    console.log(this);//=>WINDOW(严格模式下是UNDEFINED)
});
ary.forEach(function () {
    console.log(this);//=>OBJ
}, obj);//=>FOR-EACH 和 MAP 这两个内置方法,除了第一个参数是回调函数以外，第二个参数是改变回调函数中的THIS指向的 (SOME、FILTER、FIND、EVERY... 这些方法的第二个参数都是改变回调函数中THIS的)
```

###关于EACH循环方法的封装
> 需求：
> 兼容所有的浏览器
> 类似于JQ中的EACH方法，我们需要支持对数组、类数组、纯粹对象的遍历任务
> 在遍历的过程中，通过回调函数返回值，来结束当前正在遍历的操作（回调函数中返回FALSE，我们应该立即结束对数组的遍历操作）
>  
> 附加思考：
> 需要支持对原有数组的修改（回调函数中的返回值，可以修改原来数组中的某一项值）

```javascript
~function () {
    function each(value, callBack, context) {
        context = context || window;
        var valueType = Object.prototype.toString.call(value);

        //->如果传递的VALUE是一个纯粹的对象,我们使用FOR IN遍历
        if (valueType === '[object Object]') {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (typeof callBack === 'function') {
                        var result = callBack.call(context, value[key], key);
                        if (result === false) {
                            break;
                        }
                    }
                }
            }
            return;
        }

        //->如果当前传递的VALUE有LENGTH属性,并且属性值是纯数字,我们就可以使用FOR循环遍历了
        if (('length' in value) && !isNaN(value.length)) {
            for (var i = 0; i < value.length; i++) {
                if (typeof callBack === 'function') {
                    result = callBack.call(context, value[i], i);
                    if (result === false) {
                        break;
                    }
                }
            }
            return;
        }


        //->传递的参数有错误的
        throw new TypeError('The value of the parameter you pass is not legal!');
    }

    window.$each = each;
}();

$each({name: '珠峰培训', age: 12, 0: 13}, function (item, index) {
    console.log(item, index);
});
```