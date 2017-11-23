/*var num = 12;
 var num = 13;
 console.log(num);//=>13

 let str = '珠峰';
 let str = '培训';
 console.log(str);//=>Uncaught SyntaxError: Identifier 'str' has already been declared  当前报错,上面代码也不会执行(在JS代码执行之前就已经知道有重复声明的了，也就是浏览器依然存在类似于变量提升的机制：在JS代码之前先把所有LET声明的变量过一遍，发现有重复的直接报错)

 let num = 12;
 num = 13;
 console.log(num);//=>13 LET不允许重复被声明，但是允许重新赋值*/

/*let num = 12,
 fn = function () {
 let num = 13;
 };
 console.log(num);//=>12 当前作用域下别重复声明即可(不同作用域中的变量是自己私有的,名字重复没有关系)

 let att = 13,
 sum = function () {
 att = 14;
 };
 sum();
 console.log(att);*/
"use strict";