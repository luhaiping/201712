//=>快速交换两个变量的值
// let a = 12;
// let b = 13;
// [a, b] = [b, a];
// console.log(a, b);//=>13 12

// let fn = function () {
//     let a = 12,
//         b = 13,
//         c = 14;
//     return [a, b, c];
// };
// let [a,b,c] = fn();
// console.log(a, b, c);//=>12 13 14

// let fn = function ([A,B,C,D = 0]) {
//     console.log(A, B, C, D);//=>12 23 34 0
// };
// fn([12, 23, 34]);
// //console.log(A);//=>Uncaught ReferenceError: A is not defined 函数中的ABC是私有的变量

// let animate = function ({curEle = null, target = {}, duration = 1000, callBack = null}={}) {
//     console.log(curEle, target, duration, callBack);//=>body {opacity: 1} 1000 null
// };
// animate({
//     curEle: document.body,
//     target: {opacity: 1}
// });

// let fn = function (x) {
//     console.log(x);//=>undefined
//     x = x || 0;
//     console.log(x);//=>0
// };
// fn();
//
// let fn2 = function (x = 0) {
//     console.log(x);//=>0
// };
// fn2();
"use strict";