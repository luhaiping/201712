class Person {
    constructor(...ARG) {
        let [x = 0,y = 0]=ARG;
        this.x = x;
        this.y = y;
    }

    sum() {
        return this.x + this.y;
    }
}

class Child extends Person {
    //=>创建CHILD类,并且让CHILD类继承了PERSON类:
    //1、把PERSON中的私有属性继承过来设置给了子类实例的私有属性
    //2、让子类实例的原型链上能够找到PERSON父类的原型(这样子类的实例就可以调用父类原型上的方法了)

    //-------------
    //=>我们可以不写CONSTRUCTOR,浏览器默认会创建它,而且默认就把父类私有的属性继承过来了(而且把传给子类的参数值也传递给父类了)
    // constructor(...arg) {
    //     //=>ARG:传递给子类的参数(数组) [剩余运算符]
    //     super(...arg);//=>[展开运算符] 把ARG中每一项值展开,分别传递给父类方法 SUPPER(10,20,30)
    // }

    //------------
    //=>很多时候我们不仅要继承父类私有的,还需要给子类增加一些而外私有的,此时就必须写CONSTRUCTOR,但是一定要在CONSTRUCTOR中的第一行写上SUPPER,否则会报错
    // constructor(...arg) {
    //     super(...arg);
    //
    //     let [,,z]=arg;
    //     this.z = z;
    // }

    constructor(x, y, z) {
        super();//<=>Person.prototype.constructor.call(this)
        this.z = z;
    }

    fn() {

    }
}
let c = new Child(10, 20, 30);
