let fn = function (n = 0) {
    let x = 10,
        y = 20;
    return x + y + n;
};
//=>改写成箭头函数
let arrowFn = (n = 0)=> {
    let x = 10,
        y = 20;
    return x + y + n;
};