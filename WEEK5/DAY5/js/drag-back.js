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

        //->记录鼠标起始位置 & 盒子的起始位置
        this.strX = e.clientX;
        this.strY = e.clientY;
        this.strL = loginBox.offsetLeft;
        this.strT = loginBox.offsetTop;

        //->按下代表拖拽开始
        this.onmousemove = dragMove;
        this.onmouseup = dragUp;
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
        //->拖拽结束:把MOVE和UP都移除掉
        this.onmousemove = null;
        this.onmouseup = null;
    };

    return {
        init: function () {
            //=>让盒子处于页面的中间
            loginBox.style.left = maxL / 2 + 'px';
            loginBox.style.top = maxT / 2 + 'px';

            loginTitle.onmousedown = dragDown;//=>this:loginTitle
        }
    }
})();
dragRender.init();
