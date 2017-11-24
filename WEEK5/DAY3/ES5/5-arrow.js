"use strict";

var fn = function fn() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var x = 10,
        y = 20;
    return x + y + n;
};
//=>改写成箭头函数
var arrowFn = function arrowFn() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var x = 10,
        y = 20;
    return x + y + n;
};