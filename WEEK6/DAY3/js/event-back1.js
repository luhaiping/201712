//=>DOM2事件绑定原理:
//1、当我们通过addEventListener/attachEvent可以把需要执行的方法存放到当前元素某一个事件类型对应的内置事件池中
//2、当用户触发当前元素某个事件类型的时候，浏览器会自动找到对应的内置事件池，并且把事件池中存放的方法依次执行

//=>IE6~8事件池的机制  VS  标准浏览器事件池的机制
//1、浏览器执行事件池中方法的时候，不仅把方法执行，而且还把事件对象作为实参传递给对应的方法，但是也是有区别的：IE6~8中传递的事件对象和window.event是相同的，和标准浏览器中传递的事件对象是存在兼容的
//2、向事件池中存放方法的时候，IE(指的是IE低版本)的事件池没有去重机制，而标准(指标准浏览器)事件池中可以自动去重：之前存放过的方法，不允许二次存放
//3、当行为触发，浏览器执行事件池中方法的时候，IE事件池中的方法是乱序执行的，而标准事件池中的方法会按照存放时候的先后顺序依次执行
//4、执行事件池中的方法，IE低版本浏览器让方法中的THIS指向的是WINDOW，标准浏览器让方法中的THIS指向的是当前被操作的元素

//=====================================

//=>ON:向事件池中追加方法
function on(curEle, type, fn) {
    if (typeof curEle['pond' + type] === 'undefined') {
        curEle['pond' + type] = [];
        //->把RUN放到内置事件池中
        curEle.addEventListener(type, run, false);//=>应该是IE6~8中才需要这样处理,所以使用ATTACH-EVENT绑定才可以
        //1、RUN中的THIS:CUE-ELE
        //2、RUN中传递了事件对象(E),和WINDOW.EVENT相同
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
    var pondAry = curEle['pond' + type];
    if (!pondAry) return;
    for (var i = 0; i < pondAry.length; i++) {
        if (pondAry[i] === fn) {
            //pondAry.splice(i, 1); //=>会引发数组塌陷,我们删除的时候不能让原始数组中的索引改变
            pondAry[i] = null;
            break;
        }
    }
}
//=>RUN:把自己造的假事件池中的方法依次执行
function run(e) {
    //=>THIS:CUR-ELE
    //=>E:WINDOW-EVENT
    //=>把事件对象E的兼容处理好:把绑定方法执行的时候,我们把处理好的E传递给方法,以后在绑定的方法中直接用即可,不用在考虑兼容问题了(类似于JQ中事件绑定中的E)
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
        //itemFn();//=>THIS:WINDOW E:UNDEFINED
        if (itemFn === null) {
            //=>当前这一项在执行的过程中被OFF方法移除掉了(NULL不能执行,执行会报错)
            pondAry.splice(i, 1);
            i--;
            continue;
        }
        itemFn.call(this, e);
    }
}























