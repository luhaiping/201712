// let {name, age}={name: '珠峰培训', age: 9};
// console.log(name, age);//=>'珠峰培训' 9
//
// let {A, B}={name: '珠峰培训', age: 9};
// console.log(A, B);//=>在对象的解构赋值中需要注意的是:赋值的变量需要和对象中的属性名吻合,否则无法获取对应的属性值 undefined*2
//
// let {C = 0}={name: '珠峰培训', age: 9};
// console.log(C);//=>0 可以给当前的变量设置默认值

// let {name}={name: '珠峰培训', age: 9};
// console.log(name);//=>'珠峰培训'  和数组的解构赋值一样,我们可以把后面不需要获取的结构省略掉
//
// let {,age}={name: '珠峰培训', age: 9};//=>Uncaught SyntaxError: Unexpected token , 和数组的解构赋值不一样的地方在于,对象前面不允许出现空来占位(因为对象获取需要通过具体的属性名获取,写成空的话,浏览器不知道怎么识别)
//
// let {age}={name:'xxx',age:'xxx'};//=>但是我们可以把逗号去掉,这样就是只获取其中一个

// let {name, ...arg}={name: '珠峰培训', age: 9, teacher: '周啸天'};
// console.log(name, arg);//=>'珠峰培训' {age:9...}  支持拓展运算符的
//
// //=>把对象进行浅克隆(只把第一级克隆了)
// let obj = {name: 'xxx', age: 10, score: [100, 90, 80]};
// let {...arg}=obj;
// console.log(arg, obj);
// console.log(arg === obj);//=>false
// console.log(arg.score === obj.score);//=>true


// let {name:A, age:B}={name: '珠峰培训', age: 9};
// console.log(A, B);//=>'珠峰培训' 9  在对象的结构赋值中,我们可以把对象的属性名起一个小名(A和B相当于小名或者叫做别名)
//
// let data = [
//     {
//         "name": "张三",
//         "age": 25,
//         "score": {
//             "english": [100, 90, 95],
//             "math": [100, 100, 100],
//             "chinese": [98, 99, 100]
//         }
//     },
//     {
//         "name": "李四",
//         "age": 24,
//         "score": {
//             "english": [8, 9, 3],
//             "math": [149, 150, 148],
//             "chinese": [138, 140, 145]
//         }
//     }
// ];
// let [{score:{english:[A], math:[,B], chinese:[,,C]}}]=data;
// console.log(A, B, C);//=>100 100 100