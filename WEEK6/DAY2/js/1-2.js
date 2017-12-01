// Array.prototype.myDistinct = function myDistinct() {
//     let obj = {};
//     for (let i = 0; i < this.length; i++) {
//         let item = this[i];
//         if (typeof obj[item] !== 'undefined') {
//             this[i] = this[this.length - 1];
//             this.length--;
//             i--;
//             continue;
//         }
//         obj[item] = item;
//     }
//     obj = null;
//     return this;
// };

// let a = {a: 1},
//     b = {b: 1},
//     c = {c: 1};
// let ary = [a, b, c];

// var newAry = ary.slice(0);//=>浅度拷贝(克隆)，只是把第一层级的内容克隆一份，数组中每一项（对象）依然采用的是ABC堆内存的地址
// newAry===ary =>FALSE
// newAry[0] === ary[0] =>TRUE

//=>ES5思想实现的
let deepCopy = function (ary) {
    let newAry = [];
    for (let i = 0; i < ary.length; i++) {
        let item = ary[i];
        if (typeof item !== 'object') {
            newAry.push(item);
            continue;
        }

        //=>第二级是一个对象(普通对象/数组)
        let obj = {};
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                obj[key] = item[key];
            }
        }
        newAry.push(obj);
        obj = null;
    }
    return newAry;
};

// let newAry = JSON.parse(JSON.stringify(ary));
// //=>JSON.stringify(ary):把原始多维数组变为无任何任意的字符串
// //=>JSON.parse():把字符串变为一个全新的JSON对象
// console.log(newAry === ary);//=>FALSE
// console.log(newAry[0] === ary[0]);//=>FALSE

// let a = {a: 1},
//     b = {b: 1},
//     c = {c: 1};
// let ary = [a, b, c];
// let [{a:A},{b:B},{c:C}] = ary;
// let newAry = [{a: A}, {b: B}, {c: C}];


