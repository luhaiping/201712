let xhr = new XMLHttpRequest();
// xhr.setRequestHeader('aaa', 'xxx');//=>Uncaught DOMException: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED. 设置请求头信息必须在OPEN之后和SEND之前
xhr.open('get', 'temp.xml?_=' + Math.random(), true);
// xhr.setRequestHeader('cookie', '珠峰培训');//=>Uncaught DOMException: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': '珠峰培训' is not a valid HTTP header field value. 设置的请求头内容不是一个有效的值（请求头部的内容中不得出现中文汉字）
xhr.setRequestHeader('aaa', 'xxx');

//=>设置超时
xhr.timeout = 100000;
xhr.ontimeout = ()=> {
    console.log('当前请求已经超时');
    xhr.abort();
};

xhr.onreadystatechange = ()=> {
    let {readyState:state, status}=xhr;

    //=>说明请求数据成功了
    if (!/^(2|3)\d{2}$/.test(status)) return;

    //=>在状态为2的时候就可以获取响应头信息
    if (state === 2) {
        let headerAll = xhr.getAllResponseHeaders(),
            serverDate = xhr.getResponseHeader('date');//=>获取的服务器时间是格林尼治时间(相比于北京时间差了8小时)，通过new Date可以把这个时间转换为北京时间
        console.log(headerAll, new Date(serverDate));
        return;
    }

    //=>在状态为4的时候响应主体内容就已经回来了
    if (state === 4) {
        let valueText = xhr.responseText,//=>获取到的结果一般都是JSON字符串(可以使用JSON.PARSE把其转换为JSON对象)
            valueXML = xhr.responseXML;//=>获取到的结果是XML格式的数据(可以通过XML的一些常规操作获取存储的指定信息)  如果服务器返回的是XML文档,responseText获取的结果是字符串而responseXML获取的是标准XML文档
        console.log(valueText, valueXML);
    }
};
xhr.send('name=zxt&age=28&sex=man');