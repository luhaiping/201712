//=>ON:给当前元素的某个事件绑定某个方法
var on = function (curEle, type, fn) {
    if (document.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //=>创建自定义事件池:没有才去创建(创建到当前元素的自定义属性上，以后在其它的方法中需要使用这个事件池，直接获取使用即可)
    //1)每一个事件应该有一个自己独有的自定义事件池,防止事件之间的冲突
    if (typeof curEle[type + 'Pond'] === 'undefined') {
        curEle[type + 'Pond'] = [];
        //=>只要执行ON就说明当前元素的这个事件行为将要被触发,我们需要绑定方法,此时我们应该把RUN先放在内置的事件池中（当行为触发的时候,先执行RUN,在RUN中在把我们自定义事件池中的方法执行）
        curEle.attachEvent('on' + type, function (e) {
            run.call(curEle, e);
        });//=>把RUN只能向内置事件池中存放一次(所以代码写在这)
    }
    var ary = curEle[type + 'Pond'];
    //=>去重操作:增加之前首先看一下当前自定义事件池中是否有这个方法,有这个方法,我们就不增加了
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn) {
            return;
        }
    }
    //=>向自定义的事件池中增加方法
    ary.push(fn);
};

//=>OFF:移除当前元素某个事件绑定的某个方法
var off = function (curEle, type, fn) {
    if (document.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //=>从自定义事件池中把某个方法移除
    var ary = curEle[type + 'Pond'];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                //=>这一项就是想移除的
                ary.splice(i, 1);
                break;
            }
        }
    }
};

//=>RUN:把自定义事件池中存放的方法依次执行(并且处理THIS等问题)
var run = function (e) {
    //=>this:curEle
    var ary = this[e.type + 'Pond'];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];
            item.call(this, e);
        }
    }
};