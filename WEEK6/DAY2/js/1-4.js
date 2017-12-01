var fullName = '张三';
var obj = {
    fullName: '李四',
    prop: {
        fullName: '王五',
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());
console.log(test.call(obj.prop));
