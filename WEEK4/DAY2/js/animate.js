//=>支持多方向匀速运动(固定时间)
~function () {
    //=>把UTILS中的CSS单独提取出来:这样以后我们的ANIMATE动画库不需要依赖UTILS也可以独立运行
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
     * curEle：当前需要运动的元素
     * target：运动的目标位置 {xxx:xxx,...}
     * duration：运动的总时间
     */
    function linear(t, b, c, d) {
        return t / d * c + b;
    }

    function animate(curEle, target, duration) {
        var t = 0,
            d = duration || 1000,
            b = {},
            c = {};
        //=>传递的目标中有哪些方向,我们需要分别获取当前这些方向的起始值和总距离
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                b[key] = utils.css(curEle, key);
                c[key] = target[key] - b[key];
            }
        }

        //=>开始设置定时器,让元素运动即可
        clearInterval(curEle.animateTimer);//=>在设置新动画之前把之前正在运行的动画清除掉,防止当前元素相同的动画共存
        curEle.animateTimer = setInterval(function () {
            t += 17;
            if (t >= d) {
                utils.css(curEle, target);
                clearInterval(curEle.animateTimer);
                return;
            }
            var cur = {};
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    cur[key] = linear(t, b[key], c[key], d);
                }
            }
            utils.css(curEle, cur);
        }, 17);
    }

    window.animate = animate;
}();