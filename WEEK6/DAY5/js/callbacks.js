~function () {
    //=>EACH:遍历数组中每一项的内容
    let each = function (ary, callBack) {
        for (let i = 0; i < ary.length; i++) {
            let result = callBack && callBack(ary[i], i);
            if (result === false) break;
            if (result === 'DEL') i--;
        }
    };

    class Plan {
        constructor() {
            this.planList = [];
        }

        //=>挂载到PLAN原型上的方法
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

        //=>挂载到PLAN对象上的属性和方法
        static Callbacks() {
            return new Plan();
        }
    }

    window.$ = window.Plan = Plan;
}();