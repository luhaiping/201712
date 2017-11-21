//=>使用setTimeout模拟setInterval的效果（递归）
var oBox = document.getElementById('box'),
    target = utils.winBox('clientWidth') - oBox.offsetWidth,
    step = 50;

function move() {
    //=>每一次开始之前，都把上一次创建的，那个没用的定时器清除掉(内存优化)
    clearTimeout(oBox.timer);

    //=>每一次走一步
    var curL = utils.css(oBox, 'left');
    if (curL + step >= target) {
        utils.css(oBox, 'left', target);
        return;
    }
    curL += step;
    utils.css(oBox, 'left', curL);
    oBox.timer = setTimeout(move, 17);
}
move();