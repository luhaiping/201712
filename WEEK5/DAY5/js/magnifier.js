let magnifierRender = (function () {
    let smallBox = document.getElementById('smallBox'),
        bigBox = document.getElementById('bigBox'),
        mark = document.getElementById('mark'),
        bigImg = bigBox.getElementsByTagName('img')[0];

    //=>当前元素如果是隐藏的,是无法通过盒子模型属性获取它宽度的
    let markW = mark.offsetWidth,
        markH = mark.offsetHeight,
        smallW = smallBox.offsetWidth,
        smallH = smallBox.offsetHeight;

    let maxL = smallW - markW,
        maxT = smallH - markH;

    //=>计算MARK盒子的位置
    let computedMark = function (e) {
        e = e || window.event;
        //->计算鼠标在MARK中间时候,MARK的TOP&LEFT值
        let curL = e.clientX - smallBox.offsetLeft - markW / 2,
            curT = e.clientY - smallBox.offsetTop - markH / 2;
        //->边界判断
        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
        //->设置MARK的样式
        mark.style.left = curL + 'px';
        mark.style.top = curT + 'px';

        //->MARK跟随鼠标移动,我们也需要让BIG-IMG也跟着移动
        //1、MARK向右移动,BIG-IMG整体向左移动(移动方向是相反的)
        //2、MARK移动多少,BIG-IMG在MARK移动的基础上乘以3
        bigImg.style.left = -curL * 3 + 'px';
        bigImg.style.top = -curT * 3 + 'px';
    };

    //=>给SMALL-BOX的相关事件绑定方法
    let bindEvent = function () {
        smallBox.onmouseenter = function (e) {
            //->进入SMALL-BOX:展示MARK和BIG-BOX,计算MARK当前的位置
            mark.style.display = 'block';
            bigBox.style.display = 'block';
            computedMark(e);
        };

        smallBox.onmousemove = function (e) {
            //->在SMALL-BOX中移动:随时计算MARK的位置,让MARK跟着鼠标走
            computedMark(e);
        };

        smallBox.onmouseleave = function (e) {
            //->离开SMALL-BOX:隐藏MARK和BIG-BOX
            mark.style.display = 'none';
            bigBox.style.display = 'none';
        };
    };

    return {
        init: function () {
            mark.style.display = 'none';//->不在CSS中隐藏:防止开始MARK是隐藏的,我们无法获取MARK的宽度和高度(开始是显示的,当我们获取到宽高后,在把它隐藏即可)
            bindEvent();
        }
    }
})();
magnifierRender.init();
