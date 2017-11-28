// var oBox = document.querySelector('#box');
// oBox.ontouchstart = function (e) {
//     console.dir(e);
// };
// oBox.ontouchend = function (e) {
//     console.dir(e);
// };

let oBox = document.querySelector('#box');
oBox.ontouchstart = function (e) {
    let point = e.changedTouches[0];

    //=>记录当前手指的起始坐标位置(记录在当前元素的自定义属性上：在其它方法中如果我们想要获取的话，直接通过自定义属性获取即可)
    this.strX = point.pageX;
    this.strY = point.pageY;
    this.isMove = false;
};
oBox.ontouchmove = function (e) {
    let point = e.changedTouches[0];
    //=>一般我们手指操作，都会或多或少的发生一些偏移（习惯性偏移），此时不应该算作滑动，只有滑动的距离超出一定范围，我们按照滑动处理即可（一般都是把10px作为偏差值）
    let changeX = point.pageX - this.strX,
        changeY = point.pageY - this.strY;
    this.changeX = changeX;
    this.changeY = changeY;
    if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
        this.isMove = true;
    }
};
oBox.ontouchend = function (e) {
    let point = e.changedTouches[0];
    //=>手指离开的时候：验证是否发生滑动
    if (!this.isMove) {
        //=>点击操作
        console.log('我是点击操作~~');
        return;
    }
    //=>滑动操作
    let dir = null;
    if (Math.abs(this.changeX) > Math.abs(this.changeY)) {
        //=>左右滑动
        dir = this.changeX < 0 ? 'LEFT' : 'RIGHT';
    } else {
        //=>上下滑动
        dir = this.changeY < 0 ? 'UP' : 'DOWN';
    }
    console.log(`当前手指滑动的方向为：${dir}`);
};