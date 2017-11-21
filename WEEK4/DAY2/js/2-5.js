//=>多方向匀速固定时间动画
var oBox = document.getElementById('box');
var time = 0,
    duration = 1000;
var begin = {
    left: utils.css(oBox, 'left'),
    top: utils.css(oBox, 'top'),
    opacity: utils.css(oBox, 'opacity')
};
var target = {
    left: utils.winBox('clientWidth') - oBox.offsetWidth,
    top: utils.winBox('clientHeight') - oBox.offsetHeight,
    opacity: 0.1
};
var change = {};
for (var key in target) {
    if (target.hasOwnProperty(key)) {
        change[key] = target[key] - begin[key];
    }
}

oBox.timer = setInterval(function () {
    time += 17;
    //=>边界
    if (time >= duration) {
        utils.css(oBox, target);
        clearInterval(oBox.timer);
        return;
    }
    var curPos = {};
    for (var key in change) {
        if (change.hasOwnProperty(key)) {
            curPos[key] = linear(time, begin[key], change[key], duration);
        }
    }
    //curPos={top:xxx,left:xxx} 每一个方向当前的位置
    utils.css(oBox, curPos);
}, 17);


function linear(t, b, c, d) {
    return t / d * c + b;
}