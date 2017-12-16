// let xhr = new XMLHttpRequest();
// xhr.open('get', 'temp.json', false);
// xhr.onreadystatechange = ()=> {
//     console.log(xhr.readyState);
// };
// xhr.send();
// //=>只输出一次结果是4

// let xhr = new XMLHttpRequest();
// xhr.open('get', 'temp.json', false);
// xhr.send();//=>[同步]开始发送AJAX请求,开启AJAX任务,在任务没有完成之前,什么事情都做不了(下面绑定事件也做不了) => LOADING => 当readyState===4的时候AJAX任务完成，开始执行下面的操作
// //=>readyState===4
// xhr.onreadystatechange = ()=> {
//     console.log(xhr.readyState);
// };
// //=>绑定方法之前状态已经为4了,此时AJAX的状态不会在改变成其它值了,所以事件永远不会被触发,一次都没执行方法（使用AJAX同步编程，不要把SEND放在事件监听前，这样我们无法在绑定的方法中获取到响应主体的内容）


let xhr = new XMLHttpRequest();
xhr.onreadystatechange = ()=> {
    if (xhr.readyState === 1) {
        xhr.setRequestHeader('aaa', 'bbb');
    }
};
xhr.open('get', 'temp.json', false);
xhr.send();

