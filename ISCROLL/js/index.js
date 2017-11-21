var indexRender = (function () {
    var $content = $('.content'),
        $comment = $('.comment');

    return {
        init: function () {
            //=>计算CONTENT区域的高度
            $content.css({
                height: document.documentElement.clientHeight - $comment[0].offsetHeight
            });

            //=>动态创建点数据
            var str = ``;
            for (var i = 0; i < 10000; i++) {
                str += `<li>${i + 1}</li>`;
            }
            $content.find('ul').html(str);

            //=>实现局部滚动
            new IScroll('.content', {
                mouseWheel: true,
                scrollbars: true,
                useTransform: false
            });

        }
    }
})();
indexRender.init();