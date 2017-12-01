let down = function (e) {
    this.strX = e.clientX;
    this.strY = e.clientY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;

    this._MOVE = move.myBind(this);
    this._UP = up.myBind(this);
    $event.on(document, 'mousemove', this._MOVE);
    $event.on(document, 'mouseup', this._UP);
};

let move = function (e) {
    let curL = e.clientX - this.strX + this.strL,
        curT = e.clientY - this.strY + this.strT;
    curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
    curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
    this.style.left = curL + 'px';
    this.style.top = curT + 'px';

    //=>计算水平方向的速度
    if (!this.preFly) {
        this.preFly = this.offsetLeft;
    } else {
        this.speedFly = this.offsetLeft - this.preFly;
        this.preFly = this.offsetLeft;
    }
};

let up = function (e) {
    $event.off(document, 'mousemove', this._MOVE);
    $event.off(document, 'mouseup', this._UP);

    //=>松开鼠标后,让盒子飞吧
    moveFly.call(this);
};

//=>水平方向飞
let moveFly = function () {
    //=>this:oBox
    let speedFly = this.speedFly;
    this.timerFly = setInterval(()=> {
        //=>由于JS盒子模型属性获取的结果是整数(会四舍五入),所以速度如果小于0.5,我们本次加的速度值在下一次获取的时候还会被省略掉(此时盒子应该是不动的)
        if (Math.abs(speedFly) < 0.5) {
            clearInterval(this.timerFly);
            return;
        }
        //=>指数衰减的运动(速度乘以小于1的值肯定越来越小)
        speedFly *= 0.98;
        let curL = this.offsetLeft + speedFly;
        if (curL > maxL || curL < 0) {
            speedFly *= -1;//=>控制反方向运动
            curL = curL > maxL ? maxL : (curL < 0 ? 0 : curL);//=>控制不管怎么走都不要超过边界
        }
        this.style.left = curL + 'px';
    }, 17);
};


let oBox = document.getElementById('box'),
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

$event.on(oBox, 'mousedown', down);


/*
 * 事件触发
 *   1、浏览器都有一个自己最小的反应时间，当我们移动过程中，浏览器总会在最小的反应时间内触发MOUSE-MOVE事件行为
 *   移动相同距离之下
 *   =>移动速度快，浏览器反应过来的次数就少（触发事件的次数也就少）
 *   =>移动速度慢，浏览器反应过来的次数就多（触发事件的次数也就多）
 *
 *   2、水平方向运动的速度取决于最后即将松开手瞬间的移动速度
 */

















