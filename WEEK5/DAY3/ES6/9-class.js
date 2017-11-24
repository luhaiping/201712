//console.log(Person);//=>Uncaught ReferenceError: Person is not defined 不存在变量提升
class Person {
    constructor(name = '珠峰培训', age = 9) {
        //=>给实例设置的私有属性
        this.name = name;
        this.age = age;
    }

    //=>直接在大括号中编写的方法都设置在类的原型上：ES6默认把CONSTRUCTOR的问题解决了,此时原型上的CONSTRUCTOR指向的就是PERSON
    say() {
        console.log(`my name is ${this.name},i am ${this.age} years old~`);
    }

    //=>把PERSON当做普通对象设置属性和方法,只需要在设置的方法前面加STATIC即可
    static study() {
        console.log(`good good study,day day up~`);
    }
}
let p1 = new Person('王雪超');
//Person();//=>Uncaught TypeError: Class constructor Person cannot be invoked without 'new' =>ES6中使用CLASS创建的类,天生自带NEW.TARGET的验证,不允许把创建的类当做普通函数执行