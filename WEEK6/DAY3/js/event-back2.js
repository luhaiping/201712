Function.prototype.myBind = function myBind(context) {
    context = context || window;
    var _this = this,
        outerArg = Array.prototype.slice.call(arguments, 1);
    if ('bind' in Function.prototype) {
        outerArg.unshift(context);
        return _this.bind.apply(_this, outerArg);
    }
    return function () {
        var innerArg = Array.prototype.slice.call(arguments);
        outerArg = outerArg.concat(innerArg);
        _this.apply(context, outerArg);
    }
};

//=>ON:向事件池中追加方法
function on(curEle, type, fn) {
    if (document.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    if (typeof curEle['pond' + type] === 'undefined') {
        curEle['pond' + type] = [];
        // curEle.attachEvent('on' + type, function (e) {
        //     run.apply(curEle, [e]);
        // });
        curEle.attachEvent('on' + type, run.myBind(curEle));
    }
    var pondAry = curEle['pond' + type];
    for (var i = 0; i < pondAry.length; i++) {
        if (pondAry[i] === fn) {
            return;
        }
    }
    pondAry.push(fn);
}
//=>OFF:移除事件池中的某个方法
function off(curEle, type, fn) {
    if (document.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    var pondAry = curEle['pond' + type];
    if (!pondAry) return;
    for (var i = 0; i < pondAry.length; i++) {
        if (pondAry[i] === fn) {
            pondAry[i] = null;
            break;
        }
    }
}
//=>RUN:把自己造的假事件池中的方法依次执行
function run(e) {
    if (typeof e.target === 'undefined') {
        e.target = e.srcElement;
        e.which = e.keyCode;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
    }
    var pondAry = this['pond' + e.type];
    if (!pondAry) return;
    for (var i = 0; i < pondAry.length; i++) {
        var itemFn = pondAry[i];
        if (itemFn === null) {
            pondAry.splice(i, 1);
            i--;
            continue;
        }
        itemFn.call(this, e);
    }
}