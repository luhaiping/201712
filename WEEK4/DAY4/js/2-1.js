var link = document.getElementById('link');

//=>当卷去的高度超过一屏幕再显示LINK,否则隐藏LINK
window.onscroll = function () {
    var curT = utils.winBox('scrollTop'),
        winH = utils.winBox('clientHeight');
    link.style.display = curT > winH ? 'block' : 'none';
};

//=>点击LINK回到顶部
function move() {
    var curT = utils.winBox('scrollTop');
    curT -= 1000;
    if (curT <= 0) {
        //=>动画结束
        utils.winBox('scrollTop', 0);
        clearInterval(link.timer);
        return;
    }
    utils.winBox('scrollTop', curT);
}
link.onclick = function () {
    //=>固定步长:首先获取当前的SCROLL-TOP，在此基础上减去固定的步长，以后每间隔一定时间都来重新操作这个操作，一直到SCROLL-TOP已经为0为止
    link.timer = setInterval(move, 17);//=>17MS是一个在各浏览器中实现定时器动画并且性能比较好的时间因子(也有人使用10/13等时间因子)
};
