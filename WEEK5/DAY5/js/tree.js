let treeRender = (function () {
    let $menu = $('.menu');

    //=>事件委托实现TREE展开或者收起
    let bindEvent = function () {
        $menu.on('click', function (e) {
            let target = e.target,
                tarTag = target.tagName,
                $target = $(target);
            if (tarTag === 'EM') {
                target = target.parentNode;
                tarTag = target.tagName;
                $target = $(target);
            }

            //->如果当前的TARGET是H3,我们进行相关的处理
            if (tarTag === 'H3') {
                let $next = $target.next();
                if ($next.length === 0) return;
                let $em = $target.children('em');
                $em.toggleClass('minus');
                $next.stop().slideToggle('fast', function () {
                    if (!$em.hasClass('minus')) {
                        //=>已经把当前结构收起了:后代都要收起
                        $next.find('ul').css('display', 'none');
                        $next.find('em').removeClass('minus');
                    }
                });
            }
        });
    };

    return {
        init: function () {
            bindEvent();
        }
    }
})();
treeRender.init();

