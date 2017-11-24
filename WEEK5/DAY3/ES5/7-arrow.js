"use strict";

// let obj = {
//     name: 'obj',
//     fn: ()=> {
//         console.log(this);
//         //=>不管我们怎么去操作,最后THIS都指向WINDOW：箭头函数中没有自己的THIS指向,用到的THIS都是所在宿主环境(它的上级作用域)中的THIS
//     }
// };
// obj.fn();
// document.body.onclick = obj.fn;
// setTimeout(obj.fn, 1000);
// obj.fn.call(12);

// let obj = {
//     name: 'obj',
//     fn(){
//         //=>this:obj
//
//         // setTimeout(function () {
//         //     //=>this:window
//         // }, 1000);
//
//         // setTimeout(function () {
//         //     //=>this:obj
//         // }.bind(this), 1000);
//
//         // var _this = this;
//         // setTimeout(function () {
//         //     //=>_this:obj
//         // }, 1000);
//
//         setTimeout(()=> {
//             //=>this:obj
//         }, 1000);
//     }
// };
// obj.fn();

// let fn = ()=> {
//     console.log(this);
// };
//
// let obj = {
//     name: 'obj',
//     sum: function () {
//         //=>this:obj
//
//         fn();//=>this:window
//         //宿主环境：不是执行的环境而是定义的环境，FN虽然是在这执行的，但是它是在WINDOW下定义的，所以它的宿主环境还是WINDOW
//     }
// };
// obj.sum();

// // let fn = function (i) {
// //     return function (n) {
// //         return n + (++i);
// //     }
// // };
//
// let fn = (i)=> (n)=> n + (++i);

// let obj = {
//     fn: ()=> {
//         console.log(this);
//     }
// };
// obj.call(12);