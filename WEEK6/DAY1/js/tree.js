let treeRender = (function ($) {
    let $box = $('#box');

    let bindEvent = function () {
        $box.on('click', function (e) {
            let tar = e.target,
                tarTN = tar.tagName,
                $tar = $(tar);
            //统一事件源
            if (tarTN === 'EM') {
                tar = tar.parentNode;
                tarTN = tar.tagName;
                $tar = $(tar);
            }
            if (tarTN === 'H3') {
                //判断有无下一个元素
                let $next = $tar.next();
                if (!$next.length) return;
                $tar.children('em').toggleClass('minus');
                $next.stop().slideToggle('normal', function () {
                    $(this).find('em').removeClass('minus')
                        .end().find('ul').css('display', 'none');
                });
            }
        });
    };
    return {
        init: function () {
            bindEvent();
        }
    }
})(jQuery);
treeRender.init();