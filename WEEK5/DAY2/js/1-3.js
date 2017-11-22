"use strict";

var obj = {name: '珠峰培训'};
var ary = [12, 23, 34, 45];
ary.sort(function () {
    console.log(this);//=>WINDOW(严格模式下是UNDEFINED)
});

ary.forEach(function () {
    console.log(this);//=>WINDOW(严格模式下是UNDEFINED)
});
ary.forEach(function () {
    console.log(this);//=>OBJ
}, obj);//=>FOR-EACH 和 MAP 这两个内置方法,除了第一个参数是回调函数以外，第二个参数是改变回调函数中的THIS指向的 (SOME、FILTER、FIND、EVERY... 这些方法的第二个参数都是改变回调函数中THIS的)