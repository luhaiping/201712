let followRender = (function ($) {
    let $imgBox = $('.imgBox'),
        $mark = $imgBox.find('.mark'),
        $markImg = $mark.find('img');

    let computedMark = function (e) {
        let {left:imgBoxLeft, top:imgBoxTop} = $imgBox.offset();
        let curL = e.pageX - imgBoxLeft + 15,
            curT = e.clientY - imgBoxTop + 15;
        $mark.css({left: curL, top: curT});
    };

    return {
        init: function () {
            $mark.on('mouseover mousemove', function (e) {
                $mark.css('display', 'none');
                e.stopPropagation();
            });

            $imgBox.on('mouseover', function (e) {
                let target = e.target,
                    $target = $(target),
                    targetTag = target.tagName;

                //=>把TARGET汇总到IMG上
                if (targetTag === 'LI') {
                    $target = $target.children('img');
                    target = $target[0];
                    targetTag = target.tagName;
                }

                //=>操作TARGET的是IMG了
                if (targetTag === 'IMG') {
                    $mark.stop().show(100);
                    $markImg.attr('src', $target.data('img'));
                    computedMark(e);
                    return;
                }

                //=>其它事件源:隐藏MARK即可
                $mark.stop().hide(100);
            }).on('mousemove', computedMark);
        }
    }
})(jQuery);
followRender.init();
