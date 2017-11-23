/*
if (10 >= 10) {
    let total = 100;
}
console.log(total);//=>Uncaught ReferenceError: total is not defined 判断体也是一个块级私有作用域,在这个作用域中声明的变量是私有变量,在块级作用域之外是无法使用的
*/

/*
for (let i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);//=>Uncaught ReferenceError: i is not defined 循环体也是一个块级作用域（每一次循环都会形成一个新的块级作用域：当前案例形成五个块级作用域，每一个块级作用域中都有一个私有变量i，分别存储的是0~4）
*/

/*{
    let i=12;
}
console.log(i);//=>Uncaught ReferenceError: i is not defined 这是一个ES6中标准的块级作用域*/

/*
let i=10;
{
    let i=20;
    {
        {
            console.log(i);//=>Uncaught ReferenceError: i is not defined 虽然ES6没有变量提升，但是每一次进入当前作用域都会把LET定义的变量找一遍（不提升但是找了，找到了说明当前作用域中是有这个变量的，提前用都会报错）
        }
        let i=30;
    }
}
*/

/*
try{
    let i=100;
}catch (e){
    let k=200;
}
console.log(k);//=>Uncaught ReferenceError: k is not defined
console.log(i);//=>Uncaught ReferenceError: i is not defined TRY CATCH中的任何大括号都是块级作用域
*/

/*
switch (10){
    case 10:
        let i=20;
        break;
}
console.log(i);//=>Uncaught ReferenceError: i is not defined
*/

/*
let obj={name:'珠峰'};
for (let key in obj) {

}
console.log(key);//=>Uncaught ReferenceError: key is not defined
*/
"use strict";