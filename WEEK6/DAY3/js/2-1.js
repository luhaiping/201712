var obj = {
    tagName: 'OBJ'
};

function fn() {
    console.log(this, arguments);
}

//document.body.onclick = fn;//=>this:body
//document.body.onclick = fn.call(obj);//=>绑定方法的时候就把FN执行了,把返回的UNDEFINED绑定给事件,点击时候什么都不处理
// document.body.onclick = function (e) {
//     fn.call(obj, e);
// }; //=>这种方式可以

//document.body.onclick = fn.bind(obj);//=>BIND:不仅把THIS预先处理为OBJ了,对于FN原本拥有的一些参数(例如:E)也没有忽略掉,执行的时候也传递给FN了;而且我们还可以自己传递一些参数;
//document.body.onclick = fn.bind(obj, 100, 200);//=>自己传递的参数不会覆盖默认的参数(先把自己传递的传递给FN,FN中最后一项参数才是默认的E)

Function.prototype.myBind = function myBind(context) {
    //=>this:fn(当前我们需要预先处理THIS的函数)
    //=>context:我们需要预先改变的THIS值(如果不传递默认值是WINDOW)
    //=>arguments:存储包含CONTEXT在内的所有的实参(只能接收自己在执行MT-BIND时候传递的参数)
    context = context || window;
    var outerArg = Array.prototype.slice.call(arguments, 1);//=>除了CONTEXT之外传递进来的参数值
    var _this = this;
    return function () {//=>AAAFFF111
        //=>_this:fn
        //=>arguments:返回的匿名函数接收到的参数
        var innerArg = Array.prototype.slice.call(arguments);
        outerArg = outerArg.concat(innerArg);
        _this.apply(context, outerArg);
    }
};
// fn.myBind(obj, 100, 200);
document.body.onclick = fn.myBind(obj, 100, 200);






