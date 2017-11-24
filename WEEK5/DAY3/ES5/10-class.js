"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
    function Person() {
        _classCallCheck(this, Person);

        for (var _len = arguments.length, ARG = Array(_len), _key = 0; _key < _len; _key++) {
            ARG[_key] = arguments[_key];
        }

        var _ARG$ = ARG[0],
            x = _ARG$ === undefined ? 0 : _ARG$,
            _ARG$2 = ARG[1],
            y = _ARG$2 === undefined ? 0 : _ARG$2;

        this.x = x;
        this.y = y;
    }

    _createClass(Person, [{
        key: "sum",
        value: function sum() {
            return this.x + this.y;
        }
    }]);

    return Person;
}();

var Child = function (_Person) {
    _inherits(Child, _Person);

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

    function Child(x, y, z) {
        _classCallCheck(this, Child);

        //<=>Person.prototype.constructor.call(this)
        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this));

        _this.z = z;
        return _this;
    }

    _createClass(Child, [{
        key: "fn",
        value: function fn() {}
    }]);

    return Child;
}(Person);

var c = new Child(10, 20, 30);