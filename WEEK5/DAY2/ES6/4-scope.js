let num = 12,
    str = '';
let fn = function (str) {
    str = 'HELLO';
    //console.log(arguments[0]);//=>"HELLO" 当前JS并没有开启严格模式,所以形参变量和ARG存在映射机制(但是我们以后尽量不要这样处理:因为把ES6编译为ES5之后,会默认的开启严格模式,映射机制会中断,此处的值依然是'珠峰',这样导致我们的ES6结果和ES5结果不一致)
    // console.log(num);//=>Uncaught ReferenceError: num is not defined
    let num = 13;
    console.log(num, str);//=>13 "HELLO"
};
fn('珠峰');
console.log(num, str);//=>12 ''















