//=>传统函数支持ARGUMENTS
// let fn = function () {
//     let arg = Array.prototype.slice.call(arguments);
//     return eval(arg.join('+'));
// };

let fn = (...arg)=> {
    //console.log(arguments);//=>Uncaught ReferenceError: arguments is not defined
    //=>不支持ARGUMENTS没事,我们使用ES6中的剩余运算符...来获取传递的进来的所有参数值（优势:使用剩余运算符接收到的结果本身就是一个数组，不需要再转换了）
    //console.log(arg instanceof Array);//=>true
    return eval(arg.join('+'));
};
//=>也可以把FN简写成以下方式
//let fn = (...arg)=> eval(arg.join('+'));
console.log(fn(10, 20, 30, 40));