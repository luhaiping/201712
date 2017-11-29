let followRender = (function ($) {
    let $imgBox = $('.imgBox'),
        $itemList = $imgBox.find('li'),
        $mark = null;

    let computed = function (e) {
        let imgBoxPos = $imgBox.offset();
        let curL = e.pageX - imgBoxPos.left,
            curT = e.pageY - imgBoxPos.top;
        $mark.css({
            left: curL + 15,
            top: curT + 15
        });
    };

    let bindEvent = function (e) {
        $itemList.on('mouseenter', function (e) {
            let bigImg = $(this).children('img').data('img');
            if (!$mark) {
                $imgBox.append(`<div class="mark">
                    <img src="${bigImg}" alt="">
                </div>`);
                $mark = $imgBox.children('.mark');
                $mark.stop().show('fast');
            }
            computed(e);
        }).on('mousemove', computed).on('mouseleave', function (e) {
            $mark.remove();//=>JQ:把MARK在页面中移除
            $mark = null;
        });
    };


    return {
        init: function () {
            bindEvent();
        }
    }
})(jQuery);
followRender.init();