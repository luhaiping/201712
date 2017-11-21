//=>JS中的动画：
//1、步长固定(每一步走多少固定了),但是多长时间运动完成不固定
var oBox = document.getElementById('box'),
    target = utils.winBox('clientWidth') - oBox.offsetWidth;
//=>动画：每间隔一定时间都在自己原有的LEFT基础上累加步长10PX即可,一直到达目标值结束
var timer = setInterval(function () {
    var curL = utils.css(oBox, 'left');
    curL += 50;
    utils.css(oBox, 'left', curL);

    if (curL >= target) {
        utils.css(oBox, 'left', target);
        clearInterval(timer);
    }
}, 17);