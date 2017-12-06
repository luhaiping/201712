~function () {
    //=>EACH:遍历数组中每一项的内容
    let each = function (ary, callBack) {
        for (let i = 0; i < ary.length; i++) {
            let result = callBack && callBack(ary[i], i);

            //=>如果回调函数中返回FALSE,代表结束当前正在遍历的操作(仿照JQ中的EACH语法实现的)
            if (result === false) break;

            //=>如果回调函数中返回的是DEL,代表当前这一项在回调函数中被删除了,为了防止数组塌陷问题,我们让索引减减
            if (result === 'DEL') i--;
        }
    };

    class Plan {
        constructor() {
            this.planList = [];//=>存放方法的容器
        }

        //=>挂载到PLAN原型上的方法
        add(fn) {
            let planList = this.planList,
                flag = true;
            //=>去重处理
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
                    //planList.splice(index, 1);
                    //=>这样会引起数组塌陷(详情见图)

                    planList[index] = null;
                    //=>这样处理位置存在(索引在),但是值没有了
                    return false;
                }
            });
        }

        fire(...arg) {
            let planList = this.planList;
            each(planList, function (item, index) {
                if (item === null) {
                    //=>当前项是已经被REMOVE移除掉的
                    planList.splice(index, 1);
                    return 'DEL';
                }
                item(...arg);
            });
        }

        //=>挂载到PLAN对象上的属性和方法
        static Callbacks() {
            return new Plan();
        }
    }

    window.$ = window.Plan = Plan;
}();
