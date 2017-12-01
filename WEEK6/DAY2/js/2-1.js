/*
 * on:基于DOM2实现事件绑定（兼容所有浏览器）
 * 
 * @parameter
 *  curEle:当前需要操作的元素
 *  type:需要绑定方法的事件类型
 *  fn:需要绑定的方法
 *
 * @return
 *  不需要返回值
 */
//=>ON:给当前元素的某个事件绑定某个方法
var on = function (curEle, type, fn) {
    if (document.addEventListener) {
        //=>标准浏览器
        curEle.addEventListener(type, fn, false);
        return;
    }
    //=>IE6~8
    curEle.attachEvent('on' + type, fn);
};

//=>OFF:移除当前元素某个事件绑定的某个方法
var off = function (curEle, type, fn) {
    if (document.removeEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //=>IE6~8
    curEle.detachEvent('on' + type, fn);
};