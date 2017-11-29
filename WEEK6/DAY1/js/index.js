var magnifier = (function ($) {
    let $small = $("#smallBox"),
        $big = $("#bigBox"),
        $mark = $(".mark"),
        $bigImg = $big.children("img");

    //=>计算MARK位置 & 大图片的位置
    let computedMark = function (e) {
        let smallOffset = $small.offset();
        let newX = e.clientX - smallOffset.left - $mark.outerWidth() / 2;
        let newY = e.clientY - smallOffset.top - $mark.outerHeight() / 2;

        //->边界判断
        let maxX = $small.innerWidth() - $mark.outerWidth(),
            maxY = $small.innerHeight() - $mark.outerHeight();
        newX = newX > maxX ? maxX : (newX < 0 ? 0 : newX);
        newY = newY > maxY ? maxY : (newY < 0 ? 0 : newY);

        $mark.css({
            left: newX,
            top: newY
        });
        $bigImg.css({
            left: -newX * 3,
            top: -newY * 3
        });
    };

    function bindEvent() {
        $small.on('mouseenter', function (e) {
            $mark.css('display', 'block');
            $big.css('display', 'block');
            computedMark.call(this, e);
        }).on('mousemove', computedMark).on('mouseleave', function (e) {
            $mark.css('display', 'none');
            $big.css('display', 'none');
        });
    }

    return {
        init: function () {
            bindEvent();
        }
    }
})(jQuery);
magnifier.init();
