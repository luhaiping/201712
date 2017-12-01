##DOM2事件绑定原理及兼容处理
@(201712)

###初步了解JS中事件绑定的方式
> DOM0事件绑定
```javascript
oBox.onclick=function(e){
	//=>this:oBox
	e=e||window.event;
}
oBox.onmouseenter=function(){}
...
```

> DOM2事件绑定
```javascript
//=>标准浏览器
oBox.addEventListener('click',function(e){
	//=>this:oBox
	//=>e:事件对象
},false);
//=>false:让当前绑定的方法在冒泡传播阶段执行（一般都用FALSE）
//=>true:让当前绑定的方法在捕获阶段执行(一般不用)

//=>IE6~8
oBox.attachEvent('onclick',function(e){
	//=>e:事件对象，不同于DOM0事件绑定，使用attachEvent绑定方法，当事件触发方法执行的时候，浏览器也会把事件对象当做实参传递给函数（传递的值和window.event是相同的），所以IE6~8下获取的事件对象对于：pageX\pageY\target...依然没有，还是存在兼容性（事件对象兼容处理在DOM2中依然存在）
});
//=>此时绑定的方法都是在冒泡传播阶段执行
```

> 有DOM0和DOM2事件绑定，那么DOM1事件绑定呢？
> 因为在DOM第一代升级迭代的时候，DOM元素的事件绑定方式依然沿用的是DOM0代绑定的方式，在此版本DOM中，事件绑定没有升级处理

###DOM0事件绑定和DOM2事件绑定的区别
> **`DOM0事件绑定的原理`**
> 1、给当前元素对象的某一个私有属性（onxxx这样的私有属性）赋值的过程（之前属性默认值是null，如果我们给赋值一个函数，相当于绑定了一个方法）
> 2、当我们赋值成功（赋值一个函数），此时浏览器会把DOM元素和赋值的函数建立关联，以及建立DOM元素行为操作的监听，当某一个行为被用户触发，浏览器会把相关行为赋值的函数执行
>  
> 特点：
```javascript
//=>1、只有DOM元素天生拥有这个私有属性（onxxx事件私有属性），我们赋值的方法才叫做事件绑定，否则属于给当前元素设置一个自定义属性而已
document.body.onclick=function(){}//->事件绑定
/*
 * 手动点击页面中的BODY触发方法执行
 * document.body.onclick() 这样执行也可以
*/

document.body.onzhufeng=function(){}//->设置自定义属性
/*
 * 只能document.body.onzhufeng()这样执行
 */

//=>2、移除事件绑定的时候，我们只需要赋值为null即可
document.body.onclick=null;

//=>3、在DOM0事件绑定中，只能给当前元素的某一个事件行为（某一个事件私有属性）绑定一个方法，绑定多个方法，最后一次绑定的会把之前绑定的都替换掉
document.body.onclick=function(){
	console.log(1);
}
document.body.onclick=function(){
	console.log(2);
}
//=>点击BODY只能输出2，因为第二次赋值的函数把第一次赋值的函数给替换了
```

> **`DOM2事件绑定的原理`**
> 1、我们DOM2事件绑定使用的addEventListener/attachEvent都是在EventTarget这个内置类的原型上定义的，我们调取使用的时候，首先通过原型链找到这个方法，然后执行完成事件绑定的效果
>  
> 2、浏览器首先会给当前元素的某一个事件行为开辟一个事件池（事件队列）[其实是浏览器有一个统一的事件池，我们每个元素的某个行为绑定的方法都放在这个事件池中，只是通过相关的标识来区分的]，当我们通过addEventListener做事件监听的时候，会把绑定的方法存放在事件池中
>  
> 3、当元素的某一个行为触发，浏览器会到对应的事件池中，把当前存放在事件池中的所有方法，依次按照存放的先后顺序执行
>  
> 特点：
```javascript
//=>1、所有DOM0支持的事件行为，DOM2都可以使用，不仅如此，DOM2还支持一些DOM0没有的事件行为：DOMContentLoaded...

window.onDOMContentLoaded === undefined; //=>DOM0中没有这个属性

window.addEventListener('DOMContentLoaded',function(){
	//=>标准浏览器中兼容这个事件：当浏览器中的DOM结构加载完成，就会触发这个事件（也会把绑定的方法执行）
},false);

window.attachEvent('onDOMContentLoaded',function(){
	//=>IE6~8中的DOM2也不支持这个事件
});

//=>2、DOM2中可以给当前元素的某一个事件行为绑定‘多个不同的方法’（因为绑定的所有方法都存放在事件池中了）
function fn1(){
	console.log(1);
}
function fn2(){
	console.log(2);
}
function fn3(){
	console.log(3);
}
document.body.addEventListener('click',fn1,false);
document.body.addEventListener('click',fn3,false);
document.body.addEventListener('click',fn2,false);
document.body.addEventListener('click',fn3,false);//=>本次向事件池中存储的时候，发现fn3已经在事件池中存在了，不能再存储了

//3、DOM2事件绑定的移除比较麻烦一些，需要和绑定的时候：事件类型、绑定的方法、传播阶段，三个完全一致才可以移除掉
document.body.removeEventListener('click',fn2,false);

document.body.addEventListener('click',function(){
	console.log(1);
},false);

document.body.removeEventListener('click',function(){
	console.log(1);
},false);
//=>DOM2事件绑定需要我们养成‘未雨绸缪’的能力，绑定方法的时候尽量不用匿名函数，为后期可能会把方法在事件池中移除掉做准备
```

###window.onload和$(document).ready()的区别
> window.onload：当浏览器中所有的资源内容（DOM结构、文本内容、图片...）都加载完成，触发load事件
> 1、它是基于DOM0事件绑定完成的，所以在同一个页面中只能给它绑定一个方法（绑定多个也以最后一个绑定的为主）
>  
> 2、如果想在一个页面中使用多次，我们应该是基于DOM2事件绑定的
```javascript
function fn1(){
	//=>第一件事情
}
function fn2(){
	//=>第二件事情
}
window.addEventListener('load',fn1,false);
window.addEventListener('load',fn2,false);
...
```

> \$(function(){}) 或者 $(document).ready(function(){})
> 当文档中的DOM结构加载完成就会被触发执行，而且在同一个页面中可以使用多次
>  
> 1、JQ中提供的方法，JQ是基于DOMContentLoaded这个事件完成这个操作的
> 2、JQ中的事件绑定都是基于DOM2事件绑定完成的
> 3、但是DOMContentLoaded在IE6~8下使用attachEvent也是不支持的，JQ在IE6~8中使用的是readystatechange这个事件处理的

###DOM2事件绑定的兼容处理
> 语法上的兼容处理
> [标准]
> curEle.addEventListener('type',fn,false);
> [IE6~8]
> curEle.attachEvent('ontype',fn);
```javascript
//=>ON:给当前元素的某个事件绑定某个方法
var on = function (curEle, type, fn) {
    if (document.addEventListener) {
        //=>标准浏览器
        curEle.addEventListener(type, fn, false);
        return;
    }
    //=>IE6~8
    curEle.attachEvent('on' + type, fn);
};

//=>OFF:移除当前元素某个事件绑定的某个方法
var off = function (curEle, type, fn) {
    if (document.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //=>IE6~8
    curEle.detachEvent('on' + type, fn);
};
```

> 除了语法上的区别，在处理的机制上有一些区别
> 
> 在IE6~8中使用attachEvent做事件绑定（把方法存放在当前元素指定事件类型的事件池中）
>  
> 1、顺序问题：当事件行为触发，执行对应事件池中存放方法的时候，IE低版本浏览器执行方法的顺序是乱序（标准浏览器是按照绑定的先后顺序依次执行的）
> 
> 2、重复问题：IE低版本浏览器在向事件池中增加方法的时候，没有去重机制，哪怕当前方法已经存放过了，还会重复的添加进去（标准浏览器的事件池机制很完善，可以自动去重：已经存在过的方法不允许在添加进来）
>  
> 3、THIS问题：IE低版本浏览器中，当事件行为触发，把事件池中方法执行，此时方法中的this指向window，而不是像标准浏览器一样，指向当前元素本身
>  
> 究其根本：其实都是IE低版本浏览器对于它内置事件池处理机制的不完善导致的
>  
> DOM2事件绑定兼容处理的原理：告别LOW的IE6~8的内置事件池，而是自己创建一个类似于标准浏览器的“自定义事件池”，标准浏览器不需要处理兼容，只有IE6~8中才需要处理兼容

