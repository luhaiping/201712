##JS中的定时器及动画
@(201712)

###一、定时器基础语法
> 设置一个定时器，并且设定一个等待的时间，当到达时间，执行指定要完成的事情
> - setTimeout：到达指定时间执行一次方法，定时器结束运行
> - setInterval：到达指定时间执行方法，以后每间隔这么长的时间都会把方法执行一遍，直到定时器被手动清除
> 
> window.setTimeout([function],[interval])
> window.setInterval([function],[interval])：[function]到达时间需要执行的方法，[interval]时间因子,设置的等待时间(MS)

```javascript
var n=0;
setTimeout(function(){
	console.log(++n);//=>1000ms后执行方法,输出一次1,此时定时器结束,也就是没用了(但是定时器没有被清除)
},1000);

var m=0;
setInterval(function(){
	console.log(++m);//=>第一次过了1000MS输出1，以后每间隔1000MS都会输出一次，而且结果是一直累加的：1 2 3 4 5...
},1000);
```

####清除定时器
> 在分析如何清除定时器之前，我们先来研究一下定时器的返回值：
> => 设置一个定时器，会返回一个数字，这个数字代表当前设置的定时器是页面中的第几个定时器
> => 类似于我们去银行办理业务，进门第一件事情就是领取一个排队序号，序号数字代表我们是今天第几个办理业务的，定时器的返回值就是这个序号
> => 我们想要清除定时器，我们按照这个序号清除定时器即可
> - clearTimeout([定时器序号])
> - clearInterval([定时器序号])
>  
> 按照一个序号，把当前页面中的第N个定时器清除掉，不管使用哪一种办法都可以清除指定序号的定时器（例如：使用setTimeout设置的定时器，我们使用clearInterval也可以把它清除掉）
```javascript
var timer1=setTimeout(function(){
	
	//clearTimeout(timer1);//=>clearTimeout(1) 只要按照定时器编号清除第N个定时器即可，定时器返回值存储的变量就记录了当前定时器的编号
	clearInterval(timer1);//=>这样也可以清除掉，使用setTimeout设置的定时器，最好在方法结束后，手动把没用的定时器清除掉，优化JS的内存空间
},1000);//=>timer1===1：说明当前定时器是第一个定时器

var n=0;
var timer2=setInterval(function(){
	n++;
	console.log(n);//=>1 2 ... 10
	if(n===10){
		clearInterval(timer2);//=>手动清除定时器，执行10次后就不在执行了
	}
},1000);

//=>timer1:1
//=>timer2:2
//=>不管是用哪一种办法设置的定时器，在当前页面中隶属编号是累加的（JS中的两种定时器除了一个执行一次，一个执行多次以外，剩下的核心原理是一样的），也和去银行办业务一样，不管当前是存钱还是取钱业务，序号都是依次累加的
```

####定时器的原理
> 当我们在JS中创建一个定时器之后，浏览器会把“计时执行方法”的这个任务放在浏览器的`等待任务队列(等待任务池)`中，并且安排一个小孩(属于浏览器开辟的一个新线程)坐在那数数，也就是一直记录当前已经走的时间，当到达时间后，小孩会通知浏览器时间到了，浏览器把之前放在等待任务队列中的方法拿出来执行

###二、JS中动画实现的原理
> 浏览器中实现动画有三种常用的方法：
> **`CSS3动画`**
> 在CSS3中提供了`transition(过渡动画) / animation(帧动画)`两种动画：优势在于性能好，实现起来简单(一般写动画都是能用CSS解决的绝对不用其它方式)，弊端在于不兼容大部分IE或者其它低版本浏览器(移动端的动画一般都是基于CSS3来完成的)
>  
> **`JavaScript动画`**
> 在JS中实现动画常用的有：
> => 使用定时器驱动的动画
> => 使用requestAnimationFrame来完成的动画
> 
> 而所谓的CANVAS动画也基本上是基于这两种方式完成的（canvas本身是绘图）
>  
> **`FLASH动画`**
> 非常早的动画处理方案,我们想实现动画,需要把这部分制作成FLASH影片,然后使用Adobe Flash Player插件在浏览器中播放 ；现在一些简单的DOM动画都告别了flash的时代，影片的播放也可以基于H5中的audio或者video完成了，告别了flash的时代；

####基于定时器的动画
> 基于定时器实现动画有两种解决方案：
> - 固定步长的动画
> - 固定时间的动画
>  
> 更常用的是固定时间的动画，我们接下来使用回调顶部这个常用案例，完成我们的动画学习

`案例的HTML+CSS`
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>珠峰培训</title>
    <link rel="stylesheet" href="css/reset.min.css">
    <style>
        html, body {
            height: 500%;
            background: -webkit-linear-gradient(lightgoldenrodyellow, lightcyan, lightgreen, lightblue, lightcoral, lightpink, lightsalmon);
        }

        .link {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
            width: 50px;
            height: 50px;
            line-height: 25px;
            text-align: center;
            background: #999;
            color: #FFF;
            font-size: 18px;
        }
    </style>
</head>
<body>
<a href="javascript:;" class="link" id="link">回到顶部</a>

<script src="js/utils.js"></script>
<script src="js/2-1.js"></script>
</body>
</html>
```

`固定步长`
```javascript
var link = document.getElementById('link');
//=>当卷去的高度超过一屏幕再显示LINK,否则隐藏LINK
window.onscroll = function () {
    var curT = utils.winBox('scrollTop'),
        winH = utils.winBox('clientHeight');
    link.style.display = curT > winH ? 'block' : 'none';
};

//=>点击LINK回到顶部
function move() {
    var curT = utils.winBox('scrollTop');
    curT -= 1000;
    if (curT <= 0) {
        //=>动画结束
        utils.winBox('scrollTop', 0);
        clearInterval(link.timer);
        return;
    }
    utils.winBox('scrollTop', curT);
}
link.onclick = function () {
    //=>固定步长:首先获取当前的SCROLL-TOP，在此基础上减去固定的步长，以后每间隔一定时间都来重新操作这个操作，一直到SCROLL-TOP已经为0为止
    link.timer = setInterval(move, 17);//=>17MS是一个在各浏览器中实现定时器动画并且性能比较好的时间因子(也有人使用10/13等时间因子)
};
```

`固定时间`
```javascript
var link = document.getElementById('link');
window.onscroll = function () {
    var curT = utils.winBox('scrollTop'),
        winH = utils.winBox('clientHeight');
    link.style.display = curT > winH ? 'block' : 'none';
};

//=>点击LINK回到顶部
function linear(t, b, c, d) {
    return t / d * c + b;
}
link.onclick = function () {
    var time = 0,
        duration = 500,
        begin = utils.winBox('scrollTop'),
        target = 0,
        change = target - begin;
    link.timer = setInterval(function () {
        time += 17;
        if (time >= duration) {
            utils.winBox('scrollTop', target);
            clearInterval(link.timer);
            return;
        }
        var curT = linear(time, begin, change, duration);
        utils.winBox('scrollTop', curT);
    }, 17);
};
/*
 * 不管是固定时间的还是固定步长的动画,我们都需要计算当前时间元素应该运动到的位置
 * [固定步长的]
 *   只需在当前基础上累加步长,就是当前时间段元素需要运动到的位置
 *
 * [固定时间的]
 *   相对来说比较麻烦一些,需要我们自己来设定一个公式计算
 *
 * time：已经运动的时间
 * begin：起始的位置
 * target：目标位置
 * change：总距离  target-begin
 * duration：总时间
 *
 * 当前元素位置 = change / duration * time + begin
 * 当前元素位置 = time / duration * change + begin
 */
```

> 上述代码可以实现我们的需求，以后再有类似的动画需求，我们只需要模拟上述的代码完成动画即可；为了凸显OOP思想中的封装特性，我们最好把实现运动的操作封装成一个方法，以后想要实现动画，调取封装的方法即可；
> 
> 为了让这个方法更加适用，我们最好封装的方法可以支持`固定时间的多方向匀速或者非匀速运动`

`如何实现多方向匀速？`
> 我们实现一个从正中心逐渐放大的DIALOG模态框效果，这个就是多方向匀速运动
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>珠峰培训</title>
    <link rel="stylesheet" href="css/reset.min.css">
    <style>
        html, body {
            height: 100%;
        }

        /*--DIALOG--*/
        .dialogBg {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 998;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.3;
            filter: alpha(opacity=30);
        }

        .dialogBox {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 999;
            /*
            =>目标值:动画显示的目标值
            margin-top: -250px;
            margin-left: -200px;
            width: 400px;
            height: 500px;*/
            margin-top: 0;
            margin-left: 0;
            width: 0;
            height: 0;
            background: #FFF;
            overflow: hidden;
        }

        .dialogBox h2 {
            line-height: 50px;
            text-align: center;
            background: #EEE;
            overflow: hidden;
        }

        .dialogBox .close {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: lightblue;
            font-size: 24px;
        }
    </style>
</head>
<body>
<a href="javascript:;" id="login">登录</a>

<!--DIALOG-->
<div class="dialogBg" id="dialogBg"></div>
<div class="dialogBox" id="dialogBox">
    <h2>模态框DIALOG</h2>
    <a href="javascript:;" class="close">x</a>
    <div class="con"></div>
</div>

<script src="js/utils.js"></script>
<script src="js/3-1.js"></script>
</body>
</html>
```

```javascript
var dialogRender = (function () {
    var dialogBg = document.getElementById('dialogBg'),
        dialogBox = document.getElementById('dialogBox'),
        close = utils.getElementsByClassName('close', dialogBox)[0];

    function closeDialog() {
        close.onclick = function () {
            utils.css(dialogBg, 'display', 'none');
            utils.css(dialogBox, {
                display: 'none',
                width: 0,
                height: 0,
                marginTop: 0,
                marginLeft: 0
            });
        }
    }

    function moveDialog() {
        //=>准备数据:T/B/C/D
        var time = 0,
            duration = 200;
        var begin = {},
            change = {},
            target = {
                width: 400,
                height: 500,
                marginTop: -250,
                marginLeft: -200
            };
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(dialogBox, key);
                change[key] = target[key] - begin[key];
            }
        }

        //=>开始运动
        dialogBox.moveTimer = setInterval(function () {
            time += 17;
            if (time >= duration) {
                utils.css(dialogBox, target);
                clearInterval(dialogBox.moveTimer);
                return;
            }
            var curPos = {};
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    curPos[key] = time / duration * change[key] + begin[key];
                }
            }
            utils.css(dialogBox, curPos);
        }, 17);
    }

    return {
        init: function () {
            //=>控制显示
            utils.css(dialogBg, 'display', 'block');
            utils.css(dialogBox, 'display', 'block');

            //=>DIALOG-BOX需要有动画的效果:从宽高为零变为我们的目标值(固定时间:500MS)
            moveDialog();

            //=>控制隐藏
            closeDialog();
        }
    }
})();

//=>点击登录按钮显示DIALOG
document.getElementById('login').onclick = function () {
    dialogRender.init();
};
```
> 所谓多方向匀速运动，其实就是基于单方向匀速运动的原理，把每一个方向的 起始位置、目标值、总距离 都获取到，然后计算出每一个方向的 当前位置 即可

`如何实现非匀速运动`
> 匀速运动是基于一个公式来完成的，非匀速运动也是基于一个个的公式来完成的
>  
> 下面分享一个珠峰培训自主封装的TWEEN算法运动公式，可以实现很多非匀速运动的效果
> http://old.zhufengpeixun.cn/tween/

`回调函数`
> 把一个函数作为值传递给另外一个函数，在另外一个函数中把当前函数执行
```javascript
function fn(callBack){
	//=>callBack:function(){}
	callBack();
}
fn(function(){});

//=>之前学过的知识中有很多的回调函数
ary.sort(function(a,b){
	return a-b;
});//=>把匿名的回调函数作为值传递给SORT,在执行SORT的时候把传递的匿名函数执行
ary.forEach(function(){});
ary.map(function(){});
str.replace(reg,function(){});
window.setInterval(function(){},1000);
//=>很多的回掉函数机制,而且回调函数机制非常重要
```
> 凡是在当前方法执行的某个阶段，需要做一些额外的事情（而且这个事情是不固定的，具体做什么不知道），此时我们就可以利用回调函数机制，把要做的事情当做值传递给当前的函数，在当前函数的某个阶段把传递的函数执行即可


**`封装一个固定时间内支持多方向非匀速运动的动画库`**
```javascript
~function () {
    /*
     * 为了保证当前ANIMATE的独立运作,我们把需要使用的一些工具方法提前在这里设定好
     */
    var utils = (function () {
        var isCompatible = 'getElementsByClassName' in document;

        function getCss(curEle, attr) {
            var value = null, reg = null;
            if (isCompatible) {
                value = window.getComputedStyle(curEle, null)[attr];
            } else {
                if (attr === 'opacity') {
                    value = curEle.currentStyle['filter'];
                    reg = /^alpha\(opacity=(.+)\)$/i;
                    return reg.test(value) ? reg.exec(value)[1] / 100 : 1;
                }
                value = curEle.currentStyle[attr];
            }
            reg = /^-?\d+(.\d+)?(pt|px|rem|em)?$/i;
            return reg.test(value) ? parseFloat(value) : value;
        }

        function setCss(curEle, attr, value) {
            if (attr === 'opacity') {
                curEle.style.opacity = value;

                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                return;
            }
            !isNaN(value) && !/(fontWeight|lineHeight|zoom|zIndex)/i.test(attr) ? value += 'px' : null;
            curEle.style[attr] = value;
        }

        function setGroupCss(curEle, options) {
            if (Object.prototype.toString.call(options) !== '[object Object]') return;
            for (var attr in options) {
                if (options.hasOwnProperty(attr)) {
                    setCss(curEle, attr, options[attr])
                }
            }

        }

        function css() {
            var len = arguments.length,
                type = Object.prototype.toString.call(arguments[1]),
                fn = getCss;

            len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]' ? fn = setGroupCss : null)
            return fn.apply(this, arguments);

        }

        return {
            css: css
        }
    })();

    /*
     * 运动公式:支持匀速和非匀速
     *  t：time当前运动的时间
     *  b：begin当前方向的起始位置
     *  c：change当前方向的距离
     *  d：duration当前运动的总时间
     */
    var animationEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - animationEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return animationEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return animationEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };
    window.animateEffect = animationEffect;

    /*
     * animate：支持指定时间内的多方向匀速或者非匀速运动动画库
     * @parameter
     *   options.curEle：当前需要运动的元素
     *   options.target：目标位置信息 {xxx:xxx...}
     *   options.duration：运动的总时间
     *   options.effect：运动的方式(匀速或者非匀速:它是一个运动的公式)
     *   options.callBack：回调函数，当动画运行完成后需要做的事情，当做回调函数传递进来即可
     */
    window.animate = animate;
    function animate(options) {
        //=>init parameter
        var _default = {
            curEle: null,
            target: null,
            duration: 1000,
            effect: animationEffect.Linear,
            callBack: null
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        var curEle = _default.curEle,
            target = _default.target,
            duration = _default.duration,
            effect = _default.effect,
            callBack = _default.callBack;

        //=>prepare T/B/C/D
        var time = null,
            begin = {},
            change = {};
        for (key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        //=>running
        clearInterval(curEle.animateTimer);
        curEle.animateTimer = setInterval(function () {
            time += 17;
            if (time >= duration) {
                utils.css(curEle, target);
			clearInterval(curEle.animateTimer);
                //=>run callBack
                //typeof callBack === 'function' ? callBack.call(curEle) : null;
                callBack && callBack.call(curEle);
                return;
            }
            var curPos = {};
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    curPos[key] = effect(time, begin[key], change[key], duration);
                }
            }
            utils.css(curEle, curPos);
        }, 17);
    }

    /*
     * 参数使用OPTIONS对象处理的好处:
     *  1、不用考虑顺序的问题了，只要传递的时候在对象中指定好内容即可，也就是哪一个属性传递哪一个值即可
     *  2、对于不传递的我们完全可以在函数中给做一些默认值，把传递的值覆盖默认的，没传递的使用默认值即可
     *  =>当我们封装的方法需要支持传递很多参数，并且有些可以传递也可以不传递（不传递的都给默认值），再并且后期可能还会扩展更多的参数传递，这些情况下，兄弟就不要多想了，直接上OPTIONS
     */
}();
```
