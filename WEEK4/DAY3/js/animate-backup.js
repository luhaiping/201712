~function () {
    var utils = (function () {
        var isCompatible = 'getElementsByClassName' in document;

        function getCss(curEle, attr) {
            var value = null, reg = null;
            if (isCompatible) {
                value = window.getComputedStyle(curEle, null)[attr];
            } else {
                if (attr === 'opacity') {
                    value = curEle.currentStyle['filter'];
                    reg = /^alpha\(opacity=(.+)\)$/i;
                    return reg.test(value) ? reg.exec(value)[1] / 100 : 1;
                }
                value = curEle.currentStyle[attr];
            }
            reg = /^-?\d+(.\d+)?(pt|px|rem|em)?$/i;
            return reg.test(value) ? parseFloat(value) : value;
        }

        function setCss(curEle, attr, value) {
            if (attr === 'opacity') {
                curEle.style.opacity = value;

                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                return;
            }
            !isNaN(value) && !/(fontWeight|lineHeight|zoom|zIndex)/i.test(attr) ? value += 'px' : null;
            curEle.style[attr] = value;
        }

        function setGroupCss(curEle, options) {
            if (Object.prototype.toString.call(options) !== '[object Object]') return;
            for (var attr in options) {
                if (options.hasOwnProperty(attr)) {
                    setCss(curEle, attr, options[attr])
                }
            }
        }

        function css() {
            var len = arguments.length,
                type = Object.prototype.toString.call(arguments[1]),
                fn = getCss;
            len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]' ? fn = setGroupCss : null)
            return fn.apply(this, arguments);
        }

        return {
            css: css
        }
    })();

    /*
     * 动画公式
     *   t:time 已经运动的时间
     *   b:begin 当前运动方向的起始位置
     *   c:change 当前运动方向的总距离
     *   d:duration 当前运动的总时间
     */
    function linear(t, b, c, d) {
        return t / d * c + b;
    }

    /*
     * 实现动画
     *  curEle：当前要运动的元素
     *  target：当前元素运动的目标位置 {xxx:xxx...}
     *  duration：当前运动的总时间(默认值1000MS)
     *  callBack：回调函数(动画完成后我们处理什么事情)
     */
    function animate(curEle, target, duration, callBack) {
        var time = 0,
            begin = {},
            change = {};
        duration = duration || 1000;
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        clearInterval(curEle.animateTimer);
        curEle.animateTimer = setInterval(function () {
            time += 17;
            if (time >= duration) {
                utils.css(curEle, target);
                clearInterval(curEle.animateTimer);
                //=>动画完成后执行回调函数(验证是否为函数,是函数才执行)
                // typeof callBack === 'function' ? callBack() : null;
                callBack && callBack();
                // callBack && callBack.call(curEle);
                return;
            }

            var curPos = {};
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    curPos[key] = linear(time, begin[key], change[key], duration);
                }
            }
            utils.css(curEle, curPos);
        }, 17);
    }

    window.animate = animate;
}();
