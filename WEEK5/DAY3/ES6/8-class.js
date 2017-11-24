function Person(name, age) {
    //console.log(new.target);//=>ES6新增加的语法,如果是通过NEW执行的,返回的结果是当前创建的类,如果是当做普通函数执行的,返回的是UNDEFINED
    if (typeof new.target === 'undefined') {
        throw new SyntaxError(`当前Person不能作为一个普通函数执行，请使用new Person来执行~~`);
    }

    //=>NEW执行的时候,THIS是当前类的实例,THIS.XXX=XXX是给当前实例增加的私有属性
    this.name = name;
    this.age = age;
}
//=>原型上存放的是公有的属性和方法:给创建的实例使用
Person.prototype = {
    constructor: Person,
    say: function () {
        console.log(`my name is ${this.name},i am ${this.age} years old~`);
    }
};
//=>把PERSON当做一个普通的对象,给对象设置的私有属性
Person.study = function () {
    console.log(`good good study,day day up~`);
};

var p1 = new Person('王雪超', '80');
Person('王雪超', '80');