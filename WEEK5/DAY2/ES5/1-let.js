'use strict';

console.log(str); //=>undefined
console.log(fn); //=>FN本身
console.log(avg); //=>undefined
console.log(sum); //=>Uncaught ReferenceError: sum is not defined
console.log(num); //=>Uncaught ReferenceError: num is not defined

var str = '珠峰培训';
var num = 12;

function fn() {}
var avg = function avg() {};
var sum = function sum() {};