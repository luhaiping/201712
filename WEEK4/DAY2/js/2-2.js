//=>JS中动画：固定时间的匀速动画
//1、target：目标值
//2、begin：起始值
//3、change：总距离  target-begin
//4、duration：总时间
//5、time：已经运动的时间

// time/duration =>已经走了百分之多少的距离
// time/duration*change =>已经运动的距离
// time/duration*change+begin =>当前元素的位置

//=>匀速公式:计算出当前元素应该运动到的位置
function linear(t, b, c, d) {
    return t / d * c + b;
}
var oBox = document.getElementById('box');
var time = 0,
    duration = 1000,
    begin = utils.css(oBox, 'left'),
    target = utils.winBox('clientWidth') - oBox.offsetWidth,
    change = target - begin;
var timer = setInterval(function () {
    time += 17;
    if (time >= duration) {
        utils.css(oBox, 'left', target);
        clearInterval(timer);
        return;
    }
    var curL = linear(time, begin, change, duration);
    utils.css(oBox, 'left', curL);
}, 17);

