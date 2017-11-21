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