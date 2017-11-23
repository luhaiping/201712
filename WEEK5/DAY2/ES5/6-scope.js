'use strict';

var tempList = document.getElementsByName('TEMP');
// for (var i = 0; i < tempList.length; i++) {
//     tempList[i].onclick = function () {
//         console.log(i);//=>5 怎么点击都是5 异步操作以及作用域链的查找,找到的都是全局下最后一次循环的结束值
//     }
// }

//=>自定义属性解决
// for (var i = 0; i < tempList.length; i++) {
//     tempList[i].index = i;
//     tempList[i].onclick = function () {
//         console.log(this.index);
//     }
// }

//=>闭包解决
// for (var i = 0; i < tempList.length; i++) {
//     ~function (i) {
//         tempList[i].onclick = function () {
//             console.log(i);
//         }
//     }(i);
// }

//=>使用ES6的块级作用域

var _loop = function _loop(i) {
    tempList[i].onclick = function () {
        console.log(i);
    };
};

for (var i = 0; i < tempList.length; i++) {
    ~function _loop(i) {
        tempList[i].onclick = function () {
            console.log(i);
        };
    }(i);
}