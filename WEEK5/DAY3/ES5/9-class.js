'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//console.log(Person);//=>Uncaught ReferenceError: Person is not defined 不存在变量提升
var Person = function () {
    function Person() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '珠峰培训';
        var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

        _classCallCheck(this, Person);

        //=>给实例设置的私有属性
        this.name = name;
        this.age = age;
    }

    //=>直接在大括号中编写的方法都设置在类的原型上：ES6默认把CONSTRUCTOR的问题解决了,此时原型上的CONSTRUCTOR指向的就是PERSON


    _createClass(Person, [{
        key: 'say',
        value: function say() {
            console.log('my name is ' + this.name + ',i am ' + this.age + ' years old~');
        }

        //=>把PERSON当做普通对象设置属性和方法,只需要在设置的方法前面加STATIC即可

    }], [{
        key: 'study',
        value: function study() {
            console.log('good good study,day day up~');
        }
    }]);

    return Person;
}();

var p1 = new Person('王雪超');
//Person();//=>Uncaught TypeError: Class constructor Person cannot be invoked without 'new' =>ES6中使用CLASS创建的类,天生自带NEW.TARGET的验证,不允许把创建的类当做普通函数执行