~function () {
    let box = document.getElementById('box'),
        serverTime = null;

    let fn = ()=> {
        //=>1、计算当前时间和目标时间的差值
        //=>new Date()：获取的是客户端本机时间(会受到客户端自己调整时间的影响),重要的时间参考不能基于这个完成,不管是哪一个客户端都需要基于相同的服务器时间计算
        //=>每间隔1S中,我们需要把第一次获取的服务器时间进行累加
        serverTime = serverTime + 1000;
        let tarTime = new Date('2017/12/14 13:18:00').getTime(),
            spanTime = tarTime - serverTime;

        //=>2、计算差值中包含多少时分秒
        if (spanTime <= 0) {
            //=>已经错过了抢购的时间(已经开抢了)
            box.innerHTML = '开抢啦！！';
            clearInterval(autoTimer);
            return;
        }
        let hours = Math.floor(spanTime / (1000 * 60 * 60));
        spanTime -= hours * 3600000;
        let minus = Math.floor(spanTime / (1000 * 60));
        spanTime -= minus * 60000;
        let seconds = Math.ceil(spanTime / 1000);
        hours < 10 ? hours = '0' + hours : null;
        minus < 10 ? minus = '0' + minus : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        box.innerHTML = `距离开抢还剩下 ${hours}:${minus}:${seconds}`;
    };
    let autoTimer = setInterval(fn, 1000);

    //=>从服务器端获取服务器时间
    let getServerTime = ()=> {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=> {
            //console.log(xhr.readyState);//=>HEAD请求方式,状态码中没有3(不需要等待响应主体内容)
            if (!/^(2|3)\d{2}$/.test(xhr.status)) return;
            if (xhr.readyState === 2) {
                serverTime = new Date(xhr.getResponseHeader('date')).getTime();
                fn();
            }
        };
        xhr.open('head', 'temp.xml', true);
        xhr.send(null);

        /*
         * 获取服务器时间总会出现时间差的问题：服务器端把时间记录好，到客户端获取到事件有延迟差（服务器返回的时候记录的是10:00，我们客户端获取的时候已经是10:01，但是我们获取的结果依然是10:00，这样就有1分钟时间差）
         *
         * [尽可能的减少时间差，是我们优化的全部目的]
         * 
         * 1、服务器返回的时间在响应头信息中就有，我们只需要获取响应头信息即可，没必要获取响应主体内容，所以请求方式使用 HEAD 即可
         * 2、必须使用异步编程：同步编程我们无法在状态为2或者3的时候做一些处理，而我们获取响应头信息，在状态为2的时候就可以获取了，所以需要使用异步
         * 3、在状态为2的时候就把服务器时间获取到
         * ...
         */
    };
    getServerTime();
}();


