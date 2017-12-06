~function () {
    //=>获取页面中所有具备DATA-PLACE自定义属性的INPUT
    var inputList = document.getElementsByTagName('input'),
        inputAry = [];
    for (var i = 0; i < inputList.length; i++) {
        var item = inputList[i];
        item.getAttribute('data-place') !== null ? inputAry.push(item) : null;
    }

    //=>非IE浏览器中,我们只需要把自定义属性值存放在PLACE-HOLDER属性中即可,浏览器可以自己根据这个属性做好提示的工作
    if (!/(MSIE|Trident)/i.test(navigator.userAgent)) {
        for (var k = 0; k < inputAry.length; k++) {
            var itemInp = inputAry[k];
            itemInp.placeholder = itemInp.getAttribute('data-place');
        }
        return;
    }

    //=>IE浏览器(包含IE EDGE):不用内置的PLACE-HOLDER,而是采用我们自己设定的方式来处理
    for (var z = 0; z < inputAry.length; z++) {
        var inputItem = inputAry[z],
            inputText = inputItem.getAttribute('data-place');
        inputItem.placeholder = '';
        /*
         * 1、新创建一个SPAN,把其存放在INPUT它爹末尾(作为INPUT的弟弟)
         * 2、给SPAN设置一定的样式
         *  相对于其父级元素定位
         *  和INPUT的基础样式类似
         * 3、INPUT或者SPAN都要绑定相关的事件行为:完成和内置PLACE-HOLDER相同的效果
         */
        var spanTip = document.createElement('span');
        spanTip.innerHTML = inputText;
        spanTip.className = 'placeLike';
        spanTip.style.cursor = 'text';
        inputItem.parentNode.appendChild(spanTip);

        //=>把每一个INPUT和SPAN的索引进行存储(并且把SPAN-TIP作为属性值存储在INPUT的自定义属性上,方便后期获取使用)
        inputItem.index = spanTip.index = z;
        inputItem.spanTip = spanTip;

        //=>SPAN的点击行为:点击SPAN让INPUT获取对应光标
        spanTip.onclick = function () {
            inputAry[this.index].focus();
        };

        //=>控制INPUT的输入行为(建议使用DOM2事件绑定:防止后期再其它的地方也需要通过KEYUP或者KEYDOWN行为处理其它的事情)
        inputItem.onkeydown = inputItem.onkeyup = function (e) {
            var value = this.value,
                spanTip = this.spanTip;
            spanTip.style.display = value.length > 0 ? 'none' : 'block';
        };
    }
}();