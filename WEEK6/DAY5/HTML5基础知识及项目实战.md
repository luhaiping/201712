##HTML5基础知识及项目实战
@(201712)

###HTML5基础概述
> HTML：超文本标记语言（页面中不仅只有文字，而且可以呈现出图片、音视频等媒体资源）
>  
> XHTML：它是HTML比较规范严谨的一代版本
> 
> XML：可扩展的标记语言（HTML中使用的标签都是W3C标准中规定的，XML允许我们自己扩展标签的），它的作用不是用来写页面结构的，而是用来存储一些数据的（以自己扩展的标签作为标识，清晰明了的展示出数据的结构...）
>  
> HTML5：当前HTML最新的一代版本，也是非常成功的一代版本，目前市场上基本上都是基于H5规范进行开发的（它相对于传统的HTML更多的是增加一些有助于开发的内容，对原有规范的修改调整很少）

`XML`
```xml
<root>
    <student>
        <name>珠峰培训</name>
        <age>9</age>
    </student>

    <student>
        <name>周啸天</name>
        <age>27</age>
    </student>
</root>
```

`XHTML`
> 文档声明比较复杂，需要特殊强调当前的页面需要严谨一些
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Title</title>
</head>
<body>

</body>
</html>
```

`HTML`
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Title</title>
</head>
<body>

</body>
</html>
```

`HTML5`
```
<!DOCTYPE html>
<html lang='en'><!--声明页面的语言模式：english，如果页面中出现了英文单词，浏览器会自主发起是否翻译的功能-->
	<head>
	    <!--指定当前页面的编码格式是国际统一编码格式：UTF-8  GB2312中国编码...-->
		<meta charset='UTF-8'>
	</head>
	<body>
		
	</body>
</html>
```

###HTML5提供的新语法规范
**`对原有语义化标签的升级`**
> 语义化标签（标签语义化）：每一个HTML标签都有自己特殊的含义，我们在搭建页面结构的时候，应该让合理的标签做合适的事情
>  
> HTML5中新增加一些语义化标签：
```
article：文章区域
header：头部区域
footer：尾部区域
main：主体内容区域
section：普通区域，用来做区域划分
figure：配图区域
figcaption：配图说明区域
aside：与主体内容无关的区域（一般用来打广告）
nav：导航区域
...

=>这些语义化标签在兼容它的浏览器中都是块级标签
```

> H5中新增加一些标记标签
```
mark：用来标记需要高量显示的文本
time：用来标记日期文本
...
```

> H5中对于原有的标签还有一些调整
```
strong：之前是加粗，现在是重点朗读（效果还是加粗，但是语义不一样了）
small：之前是变小，现在是附属细则（效果还是变小）
hr：之前是一条直线，现在是分割线，用来分隔两个区域
...
```

> H5中删除一些不经常使用的标签：这里的删除不是不让用（用了也不报错），只是按照最新标准没有语义了
```
font：之前是标记字体修改某些文字样式的，现在呢我们不建议使用了
center：之前是使某些内容居中，但是目前我们都是基于CSS样式控制居中，不在使用这个标签
...
```

> 目前不管是在PC端开发还是在移动端开发，我们更应该使用H5规范的语义化标签搭建页面的结构
>  
> 问题：
> IE6~8中不能识别这些新增加的语义化标签，我们无法为其设置具体的样式
>  
> 解决：
> 在当前页面的HEAD中（CSS后），我们导入一个JS插件：html5.min.js，它就是用来把页面中所有用到的不兼容的H5语义化标签进行兼容处理
> 
> 1、把页面中所有不兼容的标签进行替换
> 2、把CSS中使用标签选择器设置的样式（标签是H5标签）也替换成其它方式
> ...
>  
> 标准浏览器中不需要引用，只有IE6~8中才需要（使用条件注释来区分浏览器）
```
<head>
	
	<!--[if lt IE 9]>
    <script src="js/html5.min.js"></script>
    <![endif]-->
</head>
<!--条件注释中的代码要严格区分大小写以及空格等细节问题-->
```

**`H5中对于表单元素的升级`**
> 传统表单元素
> form
> input：text、password（暗纹输入）、button、submit、reset、file、hidden、radio、checkbox...
> button
> select
> label
> textarea
> ...
>  
> H5对于表单的升级
> 1、给input设置了很多新的类型
> search
> email
> tel
> number
> range
> color
> date
> time
> ...
> 
> [优势]
> 1)功能强大了
> 2)使用合适的类型，在移动的开发的时候，用户输入，可以调取出最符合输入内容格式的虚拟键盘，方便用户操作
> 3)部分类型提供了表单验证（内置验证机制：和我们自己写的正则验证不太一样，但是也可以凑合 [ CSS中可以验证、JS中也可以验证 ]）
>  
> 2、给input新增一个属性：placeholder，给表单框做默认的信息提示
>  
> 3、二级下拉框（select一级下拉框）
```
<input type="text" id="department" list="departmentList">
<datalist id="departmentList">
    <option value="市场部">市场部</option>
    <option value="技术部">技术部</option>
    <option value="总裁办">总裁办</option>
</datalist>
```
> H5针对于表单元素升级的部分，在IE低版本（有的IE9和10都不兼容）中不兼容，而且没办法处理兼容，所以我们一般移动端使用这些新特性，PC端还是延续传统的操作办法；
>  
> H5中的表单验证（内置规则不是特别好），所以真实项目中的表单验证依然延续传统的正则验证完成

**`placeholder兼容处理`**
> 整个IE浏览器对于placeholder兼容性都不好
> 1、IE10+虽然兼容，但是文本框获取焦点后，提示信息就消失了
> 2、IE9-不兼容这个属性
```javascript
~function () {
    //=>获取页面中所有具备DATA-PLACE自定义属性的INPUT
    var inputList = document.getElementsByTagName('input'),
        inputAry = [];
    for (var i = 0; i < inputList.length; i++) {
        var item = inputList[i];
        item.getAttribute('data-place') !== null ? inputAry.push(item) : null;
    }

    //=>非IE浏览器中,我们只需要把自定义属性值存放在PLACE-HOLDER属性中即可,浏览器可以自己根据这个属性做好提示的工作
    if (!/(MSIE|Trident)/i.test(navigator.userAgent)) {
        for (var k = 0; k < inputAry.length; k++) {
            var itemInp = inputAry[k];
            itemInp.placeholder = itemInp.getAttribute('data-place');
        }
        return;
    }

    //=>IE浏览器(包含IE EDGE):不用内置的PLACE-HOLDER,而是采用我们自己设定的方式来处理
    for (var z = 0; z < inputAry.length; z++) {
        var inputItem = inputAry[z],
            inputText = inputItem.getAttribute('data-place');
        inputItem.placeholder = '';
        /*
         * 1、新创建一个SPAN,把其存放在INPUT它爹末尾(作为INPUT的弟弟)
         * 2、给SPAN设置一定的样式
         *  相对于其父级元素定位
         *  和INPUT的基础样式类似
         * 3、INPUT或者SPAN都要绑定相关的事件行为:完成和内置PLACE-HOLDER相同的效果
         */
        var spanTip = document.createElement('span');
        spanTip.innerHTML = inputText;
        spanTip.className = 'placeLike';
        spanTip.style.cursor = 'text';
        inputItem.parentNode.appendChild(spanTip);

        //=>把每一个INPUT和SPAN的索引进行存储(并且把SPAN-TIP作为属性值存储在INPUT的自定义属性上,方便后期获取使用)
        inputItem.index = spanTip.index = z;
        inputItem.spanTip = spanTip;

        //=>SPAN的点击行为:点击SPAN让INPUT获取对应光标
        spanTip.onclick = function () {
            inputAry[this.index].focus();
        };

        //=>控制INPUT的输入行为(建议使用DOM2事件绑定:防止后期再其它的地方也需要通过KEYUP或者KEYDOWN行为处理其它的事情)
        inputItem.onkeydown = inputItem.onkeyup = function (e) {
            var value = this.value,
                spanTip = this.spanTip;
            spanTip.style.display = value.length > 0 ? 'none' : 'block';
        };
    }
}();
```
页面结构
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>珠峰培训</title>
    <link rel="stylesheet" href="css/reset.min.css">
    <style>
        .inputBox {
            position: relative;
            margin: 20px;
            width: 200px;
        }

        .inputBox input, .inputBox .placeLike {
            display: block;
            padding: 0 10px;
            width: 178px;
            height: 30px;
            line-height: 30px;
            border: 1px solid green;
        }

        .inputBox .placeLike {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            color: #AAA;
        }
    </style>
</head>
<body>
<div class="inputBox">
    <input type="text" data-place="请输入用户名">
</div>
<div class="inputBox">
    <input type="password" data-place="请输入密码">
</div>
<div class="inputBox">
    <input type="email" data-place="请输入邮箱">
</div>
<script src="js/placeholder.js"></script>
</body>
</html>
```

**`H5中其它新增内容`**
> 增加了新的媒体解决方案
> 音频：audio
> 视频：video
>  
> 传统的音视频播放是基于flash来完成的，需要浏览器中安装 adobe flash player 插件
>  
> 现在只需要基于audio或者video播放即可，但是对于音视频的格式有限制，对于浏览器也有限制
>  
> 移动端对于flash的支持不好，但是基本上都支持audio和video
> PC端的IE浏览器（低版本）不支持audio和video，但是支持flash

-----

> H5中增加了canvas（绘图）
> 它是一个画布，允许我们在JS中通过代码绘制图形以及实现一些好玩的动画
>  
> 百度统计图插件：Echarts就是基于canvas开发的

-----

> 提供了很多强大的JS API
>  
> API：Application Programming Interface 应用程序接口（凡是提供一个共别人调取使用的都可以称之为接口,例如：使用AJAX从服务器端获取数据，需要一个URL地址，此地址就是一个API，浏览器提供给我们很多常用的方法，每一个方法都可以叫做API）

`本地存储`
> webStorage：
> localStorage：本地信息存储
> sessionStorage：本地会话存储
>  
> 在没有H5本地存储之前，我们都使用cookie做的本地存储

`获取本机地理位置`
> 通过H5可以获取当前用户地理位置（精度、纬度、精准度...），再结合第三方地图（高德地图、百度地图、腾讯地图...）API接口，实现一些生活服务的推荐等

`提供了新的通信方式：websocket`
> 想要实现实时通讯类的产品，基本上现在都是基于socket.io这个框架来完成的

`提供操作手机硬件功能的API`
> 调取手机的重力感应器，实现摇一摇，或者实现一些小游戏
> 调取手机的摄像头或者通讯录
>  
> 不是所有的手机浏览器都支持这些功能，即时支持这些功能的浏览器，在实现效果上也是不理想的（不稳定、卡顿等）

`H5离线缓存：manifest`
> 第一次连网请求完成页面，把信息缓存到本地，下一次即时断网的情况下，也可以看到上一次的信息