var tabRender = (function () {
    var $tabBox = $('#tabBox'),
        $tabList = $tabBox.find('.tab>li'),
        $conList = $tabBox.children('.con');

    var _default = {
        initIndex: 0,
        eventType: 'click'
    };

    function bindEvent() {
        $tabList.on(_default.eventType, function () {
            //=>this:current click li
            var $this = $(this),
                _index = $this.index();
            $this.addClass('select')
                .siblings().removeClass('select');
            $conList.eq(_index).addClass('select')
                .siblings().removeClass('select');
        });
    }

    function initDefault() {
        $tabList.removeClass('select');
        $conList.removeClass('select');
        $tabList.eq(_default.initIndex).addClass('select');
        $conList.eq(_default.initIndex).addClass('select');
    }

    return {
        init: function (options) {
            //=>init parameters
            if (typeof options !== 'undefined') {
                $.each(options, function (key, value) {
                    if (options.hasOwnProperty(key)) {
                        _default[key] = value;
                    }
                });
            }

            initDefault();
            bindEvent();
        }
    }
})();
tabRender.init({
    initIndex: 1,
    eventType: 'mouseover'
});
