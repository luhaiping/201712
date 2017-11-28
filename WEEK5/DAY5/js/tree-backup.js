let treeRender = (function () {
    let $menu = $('.menu');

    //=>事件委托实现TREE展开或者收起
    let bindEvent = function () {
        $menu.on('click', function (e) {
            //->JQ已经把事件对象处理兼容了
            //以后直接按照标准浏览器的语法使用即可
            let target = e.target,
                tarTag = target.tagName,
                $target = $(target);
            //->点击EM或者H3做相同的事情,我们首先把事件源统一:如果点击的是EM,我们让TARGET也等于H3,此时我们后续再操作的时候,都以H3为标准操作即可
            if (tarTag === 'EM') {
                target = target.parentNode;
                tarTag = target.tagName;
                $target = $(target);
            }

            //->如果当前的TARGET是H3,我们进行相关的处理
            if (tarTag === 'H3') {
                let $next = $target.next();
                if ($next.length === 0) return;//->当前H3所在层级是没有下一级UL的,我们什么都不需要处理;下面代码肯定是有下一级结构;

                let $em = $target.children('em');
                if ($em.hasClass('plus')) {
                    //->说明:当前是折叠的结构,我们需要展开结构
                    //1、显示下一级结构
                    $next.stop().slideDown('fast');
                    //2、让EM改变为减号
                    $em.addClass('minus').removeClass('plus');
                } else {
                    //->说明:当前是展开的结构,我们需要折叠结构
                    $next.stop().slideUp('fast', function () {
                        //->当动画完成后执行的操作
                        //->当把当前层级收起的时候:我们还需要把它后代中的相关层级也一并收起,这样再次展开当前层级,后代层级默认是收起的
                        //->this:当前收起的这个UL($(this)<=>$next)
                        $(this).find('ul')
                            .css('display', 'none');
                        $(this).find('em').removeClass('minus')
                            .addClass('plus');
                    });
                    $em.addClass('plus').removeClass('minus');
                }
            }
        });
    };

    // $menu.click(function(e){});
    // $menu.bind('click',function(){});
    //=>JQ中提供的事件委托方法(老版本使用的是LIVE方法)
    // $menu.delegate('h3','click',function(e){});
    // $menu.delegate('em','click',function(e){});

    return {
        init: function () {
            bindEvent();
        }
    }
})();
treeRender.init();

