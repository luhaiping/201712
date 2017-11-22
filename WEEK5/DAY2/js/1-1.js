//=>需求:执行FN可以实现任意数求和,把求出的和传递给回调函数
function fn(callBack) {
    var argNumAry = Array.prototype.slice.call(arguments, 1),
        total = eval(argNumAry.join('+'));
    typeof callBack === 'function' ? callBack.call(fn, total) : null;
}

fn(function (result) {
    console.log(result, this);//=>100 FN
}, 10, 20, 30, 40);


