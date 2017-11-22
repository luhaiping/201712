~function () {
    function each(value, callBack, context) {
        context = context || window;
        var valueType = Object.prototype.toString.call(value);

        //->如果传递的VALUE是一个纯粹的对象,我们使用FOR IN遍历
        if (valueType === '[object Object]') {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (typeof callBack === 'function') {
                        var result = callBack.call(context, value[key], key);
                        if (result === false) {
                            break;
                        }
                    }
                }
            }
            return;
        }

        //->如果当前传递的VALUE有LENGTH属性,并且属性值是纯数字,我们就可以使用FOR循环遍历了
        if (('length' in value) && !isNaN(value.length)) {
            for (var i = 0; i < value.length; i++) {
                if (typeof callBack === 'function') {
                    result = callBack.call(context, value[i], i);
                    if (result === false) {
                        break;
                    }
                }
            }
            return;
        }


        //->传递的参数有错误的
        throw new TypeError('The value of the parameter you pass is not legal!');
    }

    window.$each = each;
}();

$each({name: '珠峰培训', age: 12, 0: 13}, function (item, index) {
    console.log(item, index);
});