let dragRender = (function ($) {
    let $box = $('#box'),
        $h3 = $box.children('h3');

    //计算最大最小值
    let winW = $(window).width(),
        winH = $(window).height(),
        maxL = winW - $box.outerWidth(),
        maxT = winH - $box.outerHeight();

    //让盒子居中
    $box.css({left: maxL / 2, top: maxT / 2});

    let dragStart = function (e) {
        $(this).attr({//=>setAttribute
            strX: e.clientX,
            strY: e.clientY,
            strL: parseFloat($box.css('left')),
            strT: parseFloat($box.css('top'))
        });

        $(document).on('mousemove', (e)=> {
            dragMove.call(this, e);
        });
        $(document).on('mouseup', (e)=> {
            dragEnd.call(this, e);
        });
    };

    let dragMove = function (e) {
        //=>getAttribute:获取的结果都是字符串格式的
        let curL = e.clientX - parseFloat($(this).attr('strX')) + parseFloat($(this).attr('strL')),
            curT = e.clientY - parseFloat($(this).attr('strY')) + parseFloat($(this).attr('strT'));

        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);

        $box.css({left: curL, top: curT});
    };

    let dragEnd = function (e) {
        //=>on:绑定方法 off:移除方法(不指定具体移除哪个方法,会把当前元素某个事件对应事件池中的方法都移除掉)
        $(document).off('mousemove');
        $(document).off('mouseup');
    };

    return {
        init: function () {
            $h3.on('mousedown', dragStart);
        }
    }
})(jQuery);
dragRender.init();