'use strict';

var dragRender = function () {
    var loginBox = document.getElementById('loginBox'),
        loginTitle = loginBox.getElementsByTagName('h3')[0];

    var winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight;
    var maxL = winW - loginBox.offsetWidth,
        maxT = winH - loginBox.offsetHeight;

    //=>鼠标按下
    var dragDown = function dragDown(e) {
        var _this = this;

        e = e || window.event;
        this.strX = e.clientX;
        this.strY = e.clientY;
        this.strL = loginBox.offsetLeft;
        this.strT = loginBox.offsetTop;

        if (this.setCapture) {
            this.onmousemove = dragMove;
            this.onmouseup = dragUp;
            this.setCapture();
            return;
        }
        document.onmousemove = function (e) {
            dragMove.call(_this, e);
        };
        document.onmouseup = function (e) {
            dragUp.call(_this, e);
        };
    };

    //=>鼠标移动
    var dragMove = function dragMove(e) {
        e = e || window.event;
        var curL = e.clientX - this.strX + this.strL,
            curT = e.clientY - this.strY + this.strT;
        curL = curL < 0 ? 0 : curL > maxL ? maxL : curL;
        curT = curT < 0 ? 0 : curT > maxT ? maxT : curT;
        loginBox.style.left = curL + 'px';
        loginBox.style.top = curT + 'px';
    };

    //=>鼠标抬起
    var dragUp = function dragUp(e) {
        if (this.releaseCapture) {
            this.onmousemove = null;
            this.onmouseup = null;
            this.releaseCapture();
            return;
        }
        document.onmousemove = null;
        document.onmouseup = null;
    };

    return {
        init: function init() {
            loginBox.style.left = maxL / 2 + 'px';
            loginBox.style.top = maxT / 2 + 'px';

            loginTitle.onmousedown = dragDown;
        }
    };
}();
dragRender.init();

/*
 * 在拖拽案例中有一个经典的问题:鼠标焦点丢失问题
 *   当鼠标移动速度过快的时候，鼠标离开了H3（盒子跟不上奔跑的速度），所以导致以下的一些问题：
 *   1、鼠标在H3外边飞，不会触发H3的mousemove，盒子也就不跟着动了
 *   2、鼠标在H3外边抬起，也不会触发H3的mouseup，那么原有绑定的dragMove方法无法被移除，鼠标从新进入H3，此时不管有没有按下鼠标，是要鼠标移动，盒子就跟着跑
 *   ...
 *   =>鼠标离开H3,鼠标的所有操作和H3的事件(以及绑定的方法)没关系了
 *
 * 解决方案一：(所有浏览器都兼容的)
 *   把mousemove和mouseup事件绑定给document，原因：鼠标不管怎么飞都飞不出document，只要你鼠标还在文档中，那么mousemove和mouseup永远生效
 *
 * 解决方案二：不兼容谷歌浏览器
 *   使用setCapture & releaseCapture
 */
