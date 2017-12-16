/*--REM--*/
~function ($) {
    let computed = ()=> {
        let $HTML = $(document.documentElement),
            winW = $HTML[0].clientWidth,
            value = 100;
        value = winW < 640 ? winW / 640 * 100 : value;
        $HTML.css('fontSize', value);
    };
    computed();
    $(window).on('resize', computed);
}(Zepto);

/*--COOKIE--*/
let cookie = (function () {
    let setValue = (name, value, expires = (new Date(new Date().getTime() + (1000 * 60 * 60 * 24))), path = '/', domain = '')=> {
        document.cookie = `${name}=${escape(value)};expires=${expires.toGMTString()};path=${path};domain=${domain}`;
    };

    let getValue = name=> {
        let cookieInfo = document.cookie,
            reg = new RegExp(`(?:^| )${name}=([^;]*)(?:;|$)`),
            ary = cookieInfo.match(reg);
        return ary ? unescape(ary[1]) : null;
    };

    let removeValue = (name, path = '/', domain = '')=> {
        let value = getValue(name);
        if (value) {
            document.cookie = `${name}= ;path=${path};domain=${domain};expires=Fri,02-Jan-1970 00:00:00 GMT`;
        }
    };

    return {
        set: setValue,
        get: getValue,
        remove: removeValue
    }
})();

/*--QUERY URL--*/
~function () {
    let pro = String.prototype;

    //=>获取URL问号传递的参数值
    pro.myQueryURLParameter = function myQueryURLParameter() {
        let obj = {},
            reg = /[?&#]([^?#&=]+)(?:=([^?#&=]*))?/g;
        this.replace(reg, (...arg)=> {
            /*
             * RES：本次大正则匹配的结果
             * KEY：本次第一个分组捕获的内容(未来做为对象的属性名)
             * VALUE：本次第二个分组捕获的内容(未来做为对象的属性值)
             */
            let [res,key,value]=arg;
            if (res.indexOf('#') > -1) {
                //->这个是HASH的处理
                obj['HASH'] = key;
                return;
            }
            obj[key] = value;
        });
        return obj;
    };
}();