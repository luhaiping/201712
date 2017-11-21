Object.prototype.hasPubProperty = function hasPubProperty() {

};

/*
 * for in
 *   不仅可以遍历当前对象(或者当前实例)所有的私有属性和方法,还可以把原型上自己创建的公共属性方法进行遍历
 *
 * for
 *   只会遍历私有的属性和方法(更多的是索引),自己在原型上扩展的方法不会被遍历出来
 */

// var obj = {name: '珠峰培训', age: 8};
// for (var key in obj) {
//     if (obj.hasOwnProperty(key)) {
//
//     }
// }

// var ary = [12, 23, 34];
// for (var i = 0; i < ary.length; i++) {
//     console.log(ary[i]);
// }
//
// for (var key in ary) {
//     console.log(ary[key]);
// }
