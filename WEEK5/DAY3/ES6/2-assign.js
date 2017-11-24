//=>[12,[23,34],[45,56,[67,78]]] 把多维数组中的 34/56/78 获取到，并且分别赋值给 A,B,C

// let [,[,A],[,B,[,C]]] = [12, [23, 34], [45, 56, [67, 78]]];
// console.log(A, B, C);//=>34 56 78

// let [D]=[12, 23, 34];
// console.log(D);//=>12 如果只想获取数组中前面的某几项内容,后面的结构不需要不全
//
// let [,E]=[12, 23, 34];
// console.log(E);//=>23


// let [,,,A]=[12, 23, 34];
// console.log(A);//=>undefined
//
// let [,,,B = 0]=[12, 23, 34];
// console.log(B);//=>0


// let [A,...B]=[12, 23, 34, 45, 56];
// console.log(A, B);//=>12 [23,34...]
//
// let [...C]=[12, 23, 34, 45, 56];
// console.log(C);//=>[12,23...] 数组克隆
//
// let [D,...E,F]=[12, 23, 34, 45, 56];
// console.log(D, E, F);//=>Uncaught SyntaxError: Rest element must be last element 拓展运算符只能出现在解构赋值中的结构末尾的位置

let [G,,,...H]=[12, 23, 34, 45, 56];
console.log(G, H);



