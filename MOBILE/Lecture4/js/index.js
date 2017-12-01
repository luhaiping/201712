/*
 * [设计思路]
 *   需求：鼠标移动可以控制魔方的旋转(鼠标移动结束根据移动的位置让魔方旋转不同的角度即可)
 *
 *   步骤：
 *   1、鼠标按下
 *     ->代表我们即将移动魔方
 *     ->按下之后,我们需要开启移动和松开鼠标的操作
 *     ->记录鼠标当前的位置(起始移动位置 X|Y)
 *     ->记录魔方当前旋转角度(起始的旋转角度 X|Y)
 *
 *   2、鼠标移动
 *     ->记录鼠标最新的位置，减去起始的位置，从而计算出鼠标的偏移值
 *
 *   3、鼠标松开
 *     ->根据偏移的值，控制魔方按照不同的轴进行旋转(偏移值越大,旋转的角度越大)
 */

let cubeRender = (function () {
    let $cubeBox = $('.cubeBox'),
        $imgList = $cubeBox.find('img');

    //=>imgDefault：img prevent default
    let imgDefault = function () {
        $imgList.on('mousedown mousemove', function (e) {
            e.preventDefault();
        });
    };

    //=>mousedown、mousemove、mouseup to cubeBox
    let dragDown = function (e) {
        //=>this:cubeBox
        $(this).attr({
            mouseX: e.clientX,
            mouseY: e.clientY
        });
        //console.log($cubeBox.css('transform')); //=>在JS中获取元素的TRANSFORM属性值,一般都是一个MATRIX矩阵公式,不利于计算操作
        this._MOVE = dragMove.bind(this);
        this._UP = dragUp.bind(this);
        $(document).on('mousemove', this._MOVE);
        $(document).on('mouseup', this._UP);
    };

    let dragMove = function (e) {
        //=>this:cubeBox
        //=>通过JQ的ATTR获取的结果都是字符串格式的
        let changeX = e.clientX - parseFloat($(this).attr('mouseX')),
            changeY = e.clientY - parseFloat($(this).attr('mouseY'));
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    };

    let dragUp = function (e) {
        //=>this:cubeBox
        let changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        let rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        //=>左右滑动(CHANGE-X)控制魔方沿着Y轴旋转(ROTATE-Y),上下滑动(CHANGE-Y)控制魔方沿着X轴旋转(ROTATE-X);
        //=>X轴偏移距离和Y轴旋转角度是同步变大变小的,但是Y轴偏移值和X轴旋转角度是相反的(例如:向上滑动CHANGE-Y变小,但是ROTATE-X的值会变大)
        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $(this).css(`transform`, `scale(.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`).attr({
            rotateX: rotateX,
            rotateY: rotateY//=>记录当前值作为下一次滑动的起始值
        });

        $(document).off('mousemove', this._MOVE);
        $(document).off('mouseup', this._UP);
    };


    return {
        init: function () {
            imgDefault();

            $cubeBox.attr({
                rotateX: -30,
                rotateY: 45
            }).on('mousedown', dragDown);
        }
    }
})();
cubeRender.init();
