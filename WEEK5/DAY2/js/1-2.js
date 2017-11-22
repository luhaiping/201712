"use strict";

// function aa(callback) {
//     callback && callback();
// }
// aa(function () {
//     console.log(this);
// });

var obj = {name: '珠峰培训', fn: fn};
function fn() {
    console.log(this);
}
setTimeout(fn, 1000);//=>非严格模式或者严格模式下FN中的THIS都是WINDOW
setTimeout(fn.call(obj), 1000);//=>设置定时器的时候就把FN执行了,把FN的返回结果赋值给定时器(1S后执行的是UNDEFINED)
setTimeout(obj.fn, 1000);//=>FN中的THIS还是WINDOW
setTimeout(fn.bind(obj), 1000);//=>FN中的THIS都是OBJ
setTimeout(function () {
    //=>this:window
    fn.call(obj);
}, 1000);//=>FN中的THIS都是OBJ

