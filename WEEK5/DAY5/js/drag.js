let dragRender = (function () {
    let loginBox = document.getElementById('loginBox'),
        loginTitle = loginBox.getElementsByTagName('h3')[0];

    let winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight;
    let maxL = winW - loginBox.offsetWidth,
        maxT = winH - loginBox.offsetHeight;

    //=>鼠标按下
    let dragDown = function (e) {
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
        document.onmousemove = (e)=> {
            dragMove.call(this, e);
        };
        document.onmouseup = (e)=> {
            dragUp.call(this, e);
        };
    };

    //=>鼠标移动
    let dragMove = function (e) {
        e = e || window.event;
        let curL = e.clientX - this.strX + this.strL,
            curT = e.clientY - this.strY + this.strT;
        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
        loginBox.style.left = curL + 'px';
        loginBox.style.top = curT + 'px';
    };

    //=>鼠标抬起
    let dragUp = function (e) {
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
        init: function () {
            loginBox.style.left = maxL / 2 + 'px';
            loginBox.style.top = maxT / 2 + 'px';

            loginTitle.onmousedown = dragDown;
        }
    }
})();
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
