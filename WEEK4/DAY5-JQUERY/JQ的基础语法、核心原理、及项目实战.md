##JQ的基础语法、核心原理、及项目实战
@(201712)

###JQ的版本和下载
> jQuery (JQ) 的版本
> 1.x：兼容IE6~8浏览器，是目前PC端开发常用的类库
> 2.x / 3.x：不支持IE6~8的兼容了，目前市场上应用的特别少 (移动端开发一般我们都用zepto.js)
> 
> jquery-1.9.1.min.js
> jquery-1.11.3.min.js
> jquery.min.js
> ...
>  
> **下载JQ**
> 官网下载：http://jquery.com/
> GitHub：https://github.com/jquery/jquery  下载JQ的源码进行学习和分析
> 百度搜索或者在 http://code.jquery.com/jquery-1.11.1.min.js （地址后面放入的是对应的JQ的版本号）
> 
> 基于NODE的NPM包管理器也可以下载JQ：
> `npm view jquery > jquery.version.json`
> `npm install jquery` 下载最新版本JQ
> `npm install jquery@1.11.3` 下载指定版本JQ
> 
> **如何学习JQ**
> 研究JQ的源码：研究的过程更多是学习JQ的精华，促进自己的原生JS能力以及插件或者类库的封装能力
> 
> 看JQ的API手册：http://jquery.cuishifeng.cn/
>  
> 锋利的JQ第二版：对于JQ的基础知识和实战应用讲解的非常好
>  
> 看一些JQ的视频
>  
> ...

###JQ的核心原理解读（分析原代码）
> JQ是一个常用方法类库（常用的DOM库），提供了很多真实项目开发中需要使用的属性和方法（这些方法JQ已经帮我们完善了浏览器兼容处理以及一些细节的优化）

`jQuery本身是一个类
JQ是基于构造函数模式构建的类库`

```javascript
var jQuery=function(selector,context){
	return new jQuery.fn.init(selector, context);
};

jQuery.fn=jQuery.prototype={
	jquery:version,
	constructor:jQuery,
	...
};

...

init=jQuery.fn.init=function(selector, context){
	if(typeof selector=="string"){
		...
	}else if(selector.nodeType){
		...
	}else if(jQuery.isFunction(selector)){
		...
	}
	return jQuery.makeArray(selector,this );//=>返回的是一个类数组
}

init.prototype=jQuery.fn;

...

window.jQuery=window.$=jQuery;
```
> 当我们在JS中执行：
> \$()
> jQuery()
> 
> 都是在创建一个JQ类的实例（$===jQuery），这些实例都是一个类数组（我们把这个类数组称之为JQ对象），JQ的实例可以使用JQ原型上提供的公有的属性和方法
> 
> 项目中我们把\$()称之为JQ的选择器，因为执行这个方法可以传递一个selector参数进去，通过selector我们可以获取到需要操作的DOM元素集合（JQ类数组集合）；传递的第二个参数context它是当前获取元素的上下文（不传递默认是document，如果传递，我们传递一个JS元素对象即可）
>  
> 但是把它叫做JQ选择器有点笼统，因为传递的selector支持三种格式：
> 传递的是个字符串，就是我们所谓的选择器，能够通过选择器获取到元素
> 传递的是个元素对象，它的意思是把JS原生对象转换为JQ对象
> 传递的是个函数，它代表等DOM结构加载完成在执行对应的JS代码（类似于window.onload）
>  
> ...

`JQ的选择器`
```javascript
$===jQuery  //=>true
$()===jQuery() //=>false 不同实例
$() instanceof jQuery //=>true
var $example=$(); //=>我们用JQ选择器获取的值，一般都是用以$开头的变量名来存储（以后看见变量名是以$开头的，我们就知道是JQ获取的实例[JQ对象]）
/*
 * $example
 *   [xxx:xxx  私有的属性]
 *   0:某一个元素对象
 *   ...
 *   length:类数组的长度
 *   context:document
 *   selector:''传递的选择器内容
 *   
 *   __protot__：jQuery.prototype
 *       [xxx:xxx 公有的属性和方法]
 *       add
 *       addClass
 *       ...  
 *       
 *      __proto__:Object.prototype  
 */
```
> 第一个参数[selector]传递的是一个字符串，就是通过选择器获取需要的元素集合（获取的结果怎么着都是类数组集合：获取多个元素也就是索引多点，获取一个元素也就是只有索引0，一个都没获取到就是一个空的类数组集合[而不是null]）
>  
> 一般CSS或者CSS3中支持的选择器，JQ都支持
```javascript
//=>基本选择器
$('#xxx')  
$('.xxx')  
$('xxx')  
$('*')  
$('.xxx,#xxx')

//=>后代选择器
$('.box a')
$('.box>a')
//$('.box~a')
//$('.box+a') 不常用

//=>伪类选择器
$('.box:contains(xxx)') 包含某某某内容的
$('a:first')
$('a:last')
$('a:eq(1)') 索引为1的
$('a:gt(1)') 索引大于1的
$('a:lt(10)') 索引小于10的
$('a:not()') 不包含什么的
$('a:not(:gt(5))') 获取所有的a，但是不包含索引大于5的（前六个）
...

//=>属性选择器
...
```

`JQ对象和原生JS对象转换`
> JQ对象：通过$()获取的JQ实例(类数组)
> 原生JS对象：通过ES中提供的属性或者方法获取的JS元素对象(nodeType===1)
>  
> 把JQ对象转换为原生JS对象
```javascript
var oBox=document.getElementById('box');//=>原生JS对象

//oBox.addClass();//=>报错：oBox不是JQ对象，不能使用JQ原型上的方法

var $box=$(oBox); //=>把原生JS对象转换为JQ对象
$box.addClass('bg');
```
> 把JQ对象转换为原生JS对象
```javascript
var $body=$('body');
//$body.className //=>undefined，因为className是JS原生内置的属性，JQ对象不能直接的用

//$body[索引]：在集合中获取指定索引的内容（获取的内容就是原生JS对象）
//$body.get(索引)：等价于 $body[索引]，获取指定索引位置的元素（原生JS对象）
//$body.eq(索引)：获取指定索引位置的元素对象（获取的结果还是一个新的JQ对象）
```

`selector是一个方法`
```javascript
$(function(){
	//=>当页面中的DOM结构加载完成，就会执行回调函数中的JS代码
	//=>类似于window.onload：等到页面中的DOM结构以及资源文件都加载完成才会执行对应的JS代码
});

$(document).ready(function(){
	//=>这种写法和上面的写法一模一样
});
```
> 和window.onload不太一样
> 1、$(function(){}) 可一在同一个页面中使用多次，多次都生效（所以在使用JQ完成代码的时候，我们一般都会把代码放在回调函数中：首先不仅是等到结构加载完在执行，而且还形成了一个闭包）
> 原理：利用了DOM二级事件绑定(可以执行多次)，监听的是DOMContentLoaded事件(DOM结构加载完成就会触发执行)
>  
> 2、window.onload本身就是资源都加载完成才会执行，使用的是DOM零级事件绑定，在同一个页面中只能使用一次
> window.onload=function()...
> window.onload=function()...
> 只能留最后一个，最后一次赋值替换了原有赋值


###JQ即是一个类也是一个对象
> jQuery.prototype上设置了很多的属性和方法，这些是供JQ实例（DOM集合或者DOM元素）使用的属性和方法
> addClass
> css
> removeClass
> attr
> ...
>  
> jQuery也是一个普通的对象，在对象上也有一些自己的属性和方法（和实例没有任何的关系）,这些都是工具类的方法
> ajax
> isFunction
> unique
> ...

`jQuery.prototype`
```javascript
$('#box').index()：获取当前元素的索引（是在自己兄弟元素中的索引，它有几个哥哥，索引就是几）

$('body').data(key,value)
只传递key是获取
如果传递了value是设置
我们通过这个方法可以获取到在HTML结构上设置的data-xxx的自定义属性值
//<body data-index='12'></body>
//$('body').data('index') =>12

$('#box').attr()：设置或者批量设置或者获取当前元素的自定义属性(内置属性也可以)  removeAttr
$('#box').prop()：和attr一样也是操作元素属性的，但是prop一般都操作表单元素的内置或者自定义属性 removeProp

addClass：增加样式类
removeClass：移除样式类
toggleClass：当前样式类有就是移除，没有就是增加
hasClass：验证是否存在某个样式类名

$('#box').html([val])：不传val就是获取内容，传递val就是设置内容，等价于原生的innerHTML
$('input').val([val])：表单元素value值的操作(设置或者获取)

css：设置或者批量设置或者获取元素的样式（获取的结果没有去单位）

offset()：获取距离BODY的偏移
position()：获取距离父级参照物的偏移
scrollTop/scrollLeft([val])：获取或者设置当前元素卷去的高度或者宽度
height/width([val])
innerWidth/innerHeight()：等价于clientWidth/clientHeight
outerWidth/outerHeight()：等价于offsetWidth/offsetHeight

$('#box').on('click',function...)：JQ中的事件绑定
...

$('#box').remove()：把当前盒子在容器中移除
$('#box').clone(true)：把当前盒子深度克隆一份

filter
children
find
...
```

`写在对象上的方法`
```javascript
var j=$.noConflict()：如果当前项目中引入了两个类库，都是使用$操作的，为了防止$使用权的冲突，JQ做了一个处理，可以让我们转让$的使用权；此处返回的值j就是代表原始$的变量，以后可以使用j()执行（使用jQuery()执行也可以）

var j=$.noConflict(true)：深度转让，把jQuery和$的使用权都转让了，此时只能使用j()执行了

$.ajax()：帮助我们发送ajax请求

...
```

`筛选方法`
> filter：同级过滤
> children：子集过滤
> find：后代过滤
```javascript
var $links=$('a');
$links.filter('.bg'); //=>首先获取所有的A，在所有的A中把具备样式类为bg的获取到（二次筛选）

$('#box').children('a'); //=>首先获取#box所有的子元素，在所有子元素中筛选出标签名为a的元素集合 <=> $('#box>a')

$('#box').find('.bg'); //=>首先获取#box后代中所有的元素，在所有的元素中筛选出样式类名中具备bg的元素集合 <=> $('#box .bg')

//prev：获取上一个哥哥  $('#box').prev('a')
//prevAll：所有的哥哥
//next：下一个弟弟
//nextAll：所有的弟弟
//siblings：所有的兄弟
//parent：父亲元素
//parents：所有的祖先元素（一直到html为止）
...
```

`each`
> JQ中的each有三种
> 1、写在原型上的each：遍历JQ对象中的每一项
> 2、写在对象上的each：工具方法，可以用来遍历数组、类数组、对象等
> 3、内置的each其实也是调用原型上的each处理的，只不过JQ在处理的时候会内部自己调用
```javascript
//=>内置EACH
$('a').addClass('select'); //=>我们获取的A可能有很多个，执行一次addClass，相当于给每个获取的A都增加了一个叫做select的样式类（JQ中大部分方法在执行的时候，都会把获取的JQ集合中的每一项调用each进行遍历，把需要操作的任务对每一个遍历的元素进行操作）

$('a').css('width'); //=>获取的时候只返回第一个元素的样式（设置走内置EACH批量处理，获取只处理第一个）

//=>原型上的EACH
$('a').each(function(index,item){
	//=>传递参数的顺序和数组内置的forEach顺序相反：ary.forEach(function(item,index){...});
    //=>获取的A有多少个，回调函数被触发执行多少次：index当前遍历这一项的索引 item是当前遍历这一项的内容
    //=>this -> item (原生JS对象) 方法中的this是当前遍历的这一项
    //=>$(this) 也是当前遍历这一项，但是属于JQ对象
});

//=>JQ对象上提供的工具方法：each
$.each([数组/类数组], function(index,item) {
	//=>this:item
});
$.each([对象],function(key,value){
	//=>this:value
	//=>JQ也是采用for in循环用来遍历对象的，这样的话就存在可能把公有属性和方法遍历到的问题
	if([对象].hasOwnProperty(key)){
		
	}
});
```

`extend`
> \$.extend()：把方法扩展到JQ对象上，这个操作一般是用来完善类库的
> $.fn.extend()：把方法扩展到JQ的原型上，供JQ的实例（DOM集合）使用，这个操作一般是用来写JQ插件的
```javascript
//=>扩展工具方法，用来完善类库
$.extend({
	aa:function(){}
});
$.aa();

//=>扩展到原型上供实例调用的
$.fn.extend({
	bb:function(){
		//=>this:操作当前这个方法的JQ实例（JQ对像），此处不需要再$(this)转换为JQ对像
	}
});
$('xxx').bb();
```

`animate`
> JQ中提供了元素运动的动画库
> stop：结束当前元素正在运行的动画，继续执行下一个新动画（一般我们实现动画,stop方法基本上必然执行）
> finish：和stop类似，finish需要让元素立即运动到上一个动画的目标位置，从目标位置执行下一个动画，而stop是从上一个动画停止的位置执行下一个动画
> 
> animate([target],[duration],[effect],[callBack])：
> [target] 对象
> [duration] MS
> [effect]  linear、ease、ease-in、ease-out、ease-in-out
> [callBack] 回调函数，动画结束做的事情
>  
> show(1000/'fast'/'slow')   
> hide  
> toggle
>  
> fadeIn
> fadeOut
> fadeToggle
>  
> slideUp
> slideDown
> slideToggle
> ...