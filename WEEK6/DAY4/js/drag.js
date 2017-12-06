//=>EACH:遍历数组中每一项的内容
let each = function (ary, callBack) {
    if (!(ary instanceof Array)) return;
    for (let i = 0; i < ary.length; i++) {
        let result = callBack && callBack(ary[i], i);
        if (result === false) break;
        if (result === 'DEL') i--;
    }
};

//=>BIND:兼容处理,预先改变THIS的
Function.prototype.myBind = function myBind(context = window, ...outer) {
    if ('bind' in this) {
        return this.bind(...arguments);
    }
    return (...inner)=> this.apply(context, outer.concat(inner));
};

//=>第一部分:DOM2事件绑定库
~function () {
    class EventLibrary {
        on(curEle, type, fn) {
            //=>this:example
            if (typeof curEle['pond' + type] === 'undefined') {
                curEle['pond' + type] = [];

                let _run = this.run;
                'addEventListener' in document ? curEle.addEventListener(type, _run, false) : curEle.attachEvent('on' + type, function (e) {
                    _run.call(curEle, e);
                });
            }
            let ary = curEle['pond' + type],
                flag = true;
            each(ary, (item, index)=> {
                if (item === fn) flag = false;
                return flag;
            });
            flag ? ary.push(fn) : null;
        }

        off(curEle, type, fn) {
            let ary = curEle['pond' + type];
            each(ary, (item, index)=> {
                if (item === fn) {
                    ary[index] = null;
                }
            });
        }

        run(e) {
            //=>this:curEle
            e = e || window.event;
            if (!e.target) {
                e.target = e.srcElement;
                e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
                e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
                e.which = e.keyCode;
                e.preventDefault = function () {
                    e.returnValue = false;
                };
                e.stopPropagation = function () {
                    e.cancelBubble = true;
                };
            }

            let ary = this['pond' + e.type];
            each(ary, (item, index)=> {
                if (item === null) {
                    ary.splice(index, 1);
                    return 'DEL';
                }
                item.call(this, e);
            });
        }
    }
    window.EventLibrary = EventLibrary;
}();

//=>第二部分:发布订阅库
~function () {
    class Plan {
        constructor() {
            this.planList = [];
        }

        add(fn) {
            let planList = this.planList,
                flag = true;
            each(planList, function (item, index) {
                if (item === fn) flag = false;
                return flag;
            });
            flag ? planList.push(fn) : null;
        }

        remove(fn) {
            let planList = this.planList;
            each(planList, function (item, index) {
                if (item === fn) {
                    planList[index] = null;
                    return false;
                }
            });
        }

        fire(...arg) {
            let planList = this.planList;
            each(planList, function (item, index) {
                if (item === null) {
                    planList.splice(index, 1);
                    return 'DEL';
                }
                item(...arg);
            });
        }

        static Callbacks() {
            return new Plan();
        }
    }
    window.Plan = Plan;
}();

//=>第三部分:拖拽库
~function () {
    class Drag extends EventLibrary {
        constructor(curEle) {
            super();

            //=>this:example
            this.curEle = curEle;

            //=>CALL-BACKS
            this.planDown = Plan.Callbacks();
            this.planMove = Plan.Callbacks();
            this.planUp = Plan.Callbacks();

            //=>MOUSE-DOWN
            this.on(curEle, 'mousedown', this.down.myBind(this));
        }

        down(e) {
            //=>this:example
            let curEle = this.curEle,
                {top:t, left:l}=this.offset(true);
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
            this.strL = l;
            this.strT = t;

            //=>MOUSE-MOVE / MOUSE-UP
            this._MOVE = this.move.myBind(this);
            this._UP = this.up.myBind(this);
            this.on(document, 'mousemove', this._MOVE);
            this.on(document, 'mouseup', this._UP);

            //=>FIRE
            this.planDown.fire(this);
        }

        move(e) {
            //=>this:example
            let curEle = this.curEle;
            let curL = e.pageX - this.mouseX + this.strL,
                curT = e.pageY - this.mouseY + this.strT;
            //=>边界判断
            let {offsetParent:p}=curEle,
                W = document.documentElement.clientWidth || document.body.clientWidth,
                H = document.documentElement.clientHeight || document.body.clientHeight;
            if (p.tagName !== 'BODY') {
                W = p.clientWidth;
                H = p.clientHeight;
            }
            let maxL = W - curEle.offsetWidth,
                maxT = H - curEle.offsetHeight;
            curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
            curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
            curEle.style.left = curL + 'px';
            curEle.style.top = curT + 'px';

            this.maxL = maxL;
            this.maxT = maxT;
                
            //=>FIRE
            this.planMove.fire(this);
        }

        up(e) {
            //=>this:example
            this.off(document, 'mousemove', this._MOVE);
            this.off(document, 'mouseup', this._UP);

            //=>FIRE
            this.planUp.fire(this);
        }

        offset(flag) {
            //=>this:example
            let {offsetLeft:l, offsetTop:t, offsetParent:p}=this.curEle;
            if (!flag) {
                while (p.tagName !== 'BODY') {
                    let {clientLeft, clientTop, offsetLeft, offsetTop, offsetParent}=p,
                        {userAgent}=window.navigator;
                    if (userAgent.indexOf('MSIE 8') === -1) {
                        l += clientLeft;
                        t += clientTop;
                    }
                    l += offsetLeft;
                    t += offsetTop;
                    p = offsetParent;
                }
            }
            return {top: t, left: l};
        }

        static init(curEle) {
            return new Drag(curEle);
        }
    }
    window.Drag = Drag;
}();