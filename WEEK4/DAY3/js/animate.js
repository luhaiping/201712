~function () {
    //=>封装CSS工具方法
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

    //=>封装动画公式:匀速运动和非匀速运动
    //http://old.zhufengpeixun.cn/tween/
    var animationEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - animationEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return animationEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return animationEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };

    //=>实现动画
    //=>必传参数:curEle/target
    //=>宣传参数:duration/callBack/effect
    //1、以后封装方法的时候,如果当前方法需要传递很多值进来,我们一般都不会定义为一个个的形参
    //A:传递实参的顺序必须和定义的形参一一对应
    //B:如果中间少传递一项值,后面每一项的值都会错位,不方便扩展性
    //...
    //2、我们一般都采用传递一个参数集合的方式,把一些参数作为对象中的某一个属性值传递进来
    // animate({
    //     target: {top: 0},
    //     effect: animationEffect.Linear,
    //     curEle: oBox
    // });
    function animate(options) {
        //=>init parameter
        var _default = {
            curEle: null,
            target: {},
            duration: 1000,
            effect: animationEffect.Linear,
            callBack: null
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        var curEle = _default.curEle,
            target = _default.target,
            duration = _default.duration,
            effect = _default.effect,
            callBack = _default.callBack;

        //=>prepare t/b/c/d
        var time = null,
            begin = {},
            change = {};
        for (var attr in target) {
            if (target.hasOwnProperty(attr)) {
                begin[attr] = utils.css(curEle, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }

        //=>move
        clearInterval(curEle.animateTimer);
        curEle.animateTimer = setInterval(function () {
            time += 17;
            if (time >= duration) {
                utils.css(curEle, target);
                clearInterval(curEle.animateTimer);
                callBack && callBack.call(curEle);
                return;
            }
            var curPos = {};
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    curPos[key] = effect(time, begin[key], change[key], duration);
                }
            }
            utils.css(curEle, curPos);
        }, 17);
    }

    window.animate = animate;
    window.animateEffect = animationEffect;
}();
