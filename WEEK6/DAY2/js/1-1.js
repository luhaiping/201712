//=>广联达（牛X面试题）
// var Fn = function (x) {
//     this._value = x;
// };
// Fn.of = x=>new Fn(x);
// Fn.prototype.map = function (f) {
//     return Fn.of(f(this._value));
// };
// var obj = Fn.of(3)
//     .map(x=>x + 1)
//     .map(x=>1 + x)
//     .map(x=>'result is' + x);
// console.log(obj._value);

function Fn(x) {
    this._value = x;
}
Fn.of = function (x) {
    return new Fn(x);
};
Fn.prototype.map = function (f) {
    //=>f是一个回调函数
    var v = f(this._value);
    return Fn.of(v);
};
var obj = Fn.of(3)
    .map(function (x) {
        return x + 1;
    })
    .map(function (x) {
        return 1 + x;
    })
    .map(function (x) {
        return 'result is ' + x;
    });
console.log(obj._value);//=>'result is 5'
// Fn.of(3) =>实例  实例._value=3
// Fn.of(4) =>实例  实例._value=4
// Fn.of(5) =>实例  实例._value=5
// Fn.of('result is 5') =>实例 实例._value='result is 5';