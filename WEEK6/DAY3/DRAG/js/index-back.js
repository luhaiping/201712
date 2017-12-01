let down = function (e) {
    //=>this:oBox
    this.strX = e.clientX;
    this.strY = e.clientY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;
    //=>绑定方法的时候,向事件池中存放的是执行MY-BIND返回的匿名函数(问题:移除的时候不知道移除谁)
    // $event.on(document, 'mousemove', move.myBind(this));
    // $event.on(document, 'mouseup', up.myBind(this));

    this._MOVE = move.myBind(this);
    this._UP = up.myBind(this);
    $event.on(document, 'mousemove', this._MOVE);
    $event.on(document, 'mouseup', this._UP);
};

let move = function (e) {
    //=>this:oBox
    let curL = e.clientX - this.strX + this.strL,
        curT = e.clientY - this.strY + this.strT;
    curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
    curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
    this.style.left = curL + 'px';
    this.style.top = curT + 'px';
};

let up = function (e) {
    //=>this:oBox
    $event.off(document, 'mousemove', this._MOVE);
    $event.off(document, 'mouseup', this._UP);
};

let oBox = document.getElementById('box'),
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

$event.on(oBox, 'mousedown', down);





