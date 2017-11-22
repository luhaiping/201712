/*
 * 分析我们需要支持的部分：
 * [基础]
 *   数据动态绑定的地址是不同的 (url)
 *   切换速度 (speed:300)
 *   默认展示第几张 (initIndex:0)
 *   延迟多久进行图片懒加载 (lazyImgTime:500)
 *
 * [自动切换]
 *   是否支持自动切换 (needAutoChange:true)
 *   自动切换的间隔时间 (autoInterval:2000)
 *
 * [焦点]
 *   是否显示焦点 (isFocusShow:true)
 *   是否需要通过焦点切换 (needFocusChange:true)
 *   什么样的事件控制焦点切换 (focusEvent:click)
 *
 * [左右切换]
 *   是否支持左右切换 (isArrowShow:true)
 */
~function () {
    function BannerPlugin(options) {
        return new BannerPlugin.prototype.init(options);
    }

    BannerPlugin.prototype = {
        constructor: BannerPlugin,
        //=>声明可扩充参数的默认值,并且让传递参数的值OPTIONS替换原有的默认值(把需要用的参数扩展到实例的私有属性上)
        initDefault: function (options) {
            var _default = {
                container: null,
                url: null,
                initIndex: 0,
                speed: 300,
                lazyImgTime: 500,
                needAutoChange: true,
                autoInterval: 2000,
                isFocusShow: true,
                needFocusChange: true,
                focusEvent: 'click',
                isArrowShow: true
            };
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    _default[key] = options[key];
                }
            }
            //=>把_DEFAULT中的每一项遍历到THIS实例上
            for (key in _default) {
                if (_default.hasOwnProperty(key)) {
                    this[key] = _default[key];
                }
            }
            _default = null;
        },

        //=>AJAX数据绑定
        queryData: function () {
            var xhr = new XMLHttpRequest(),
                bannerData = null;
            xhr.open('GET', this.url, false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    bannerData = JSON.parse(xhr.responseText);
                }
            };
            xhr.send(null);

            //=>扩充到实例上,方便以后再其它方法中使用
            this.bannerData = bannerData;
        },
        bindData: function () {
            var str = ``,
                strFocus = ``;
            for (var i = 0; i < this.bannerData.length; i++) {
                var item = this.bannerData[i];
                str += `<li class="slide">
                <a href="${item.link}">
                    <img src="" data-img="${item.img}" alt="${item.desc}">
                </a>
            </li>`;

                strFocus += `<li></li>`;
            }
            this.wrapper.innerHTML = str;
            this.isFocusShow ? this.focusBox.innerHTML = strFocus : null;

            //=>其它事情
            this.slideList = this.wrapper.getElementsByTagName('li');
            this.imgList = this.wrapper.getElementsByTagName('img');
            this.isFocusShow ? this.focusList = this.focusBox.getElementsByTagName('li') : null;

            //=>克隆第一张到末尾
            this.wrapper.appendChild(this.slideList[0].cloneNode(true));
            this.wrapper.style.width = (this.bannerData.length + 1) * this.containerWidth;
        },

        //=>图片延迟加载
        lazyImg: function () {
            var _this = this;
            var timer = setTimeout(function () {
                [].forEach.call(_this.imgList, function (curImg) {
                    var tempImg = new Image;
                    tempImg.onload = function () {
                        curImg.src = this.src;
                        curImg.style.display = 'block';
                        animate({
                            curEle: curImg,
                            target: {opacity: 1},
                            duration: 200
                        });
                        tempImg = null;
                    };
                    tempImg.src = curImg.getAttribute('data-img');
                });
                clearTimeout(timer);
            }, this.lazyImgTime);
        },

        //=>默认展示
        showInit: function () {
            var _this = this;
            if (_this.isFocusShow) {
                [].forEach.call(_this.focusList, function (item, index) {
                    item.className = index === _this.initIndex ? 'select' : null;
                });
            }
            _this.wrapper.style.left = -_this.containerWidth * _this.initIndex + 'px';
        },

        //=>自动切换
        change: function () {
            animate({
                curEle: this.wrapper,
                target: {left: -this.initIndex * this.containerWidth},
                duration: this.speed
            });

            //->CHANGE FOCUS
            if (this.isFocusShow) {
                var tempIndex = this.initIndex;
                tempIndex === this.bannerData.length ? tempIndex = 0 : null;
                [].forEach.call(this.focusList, function (item, index) {
                    item.className = index === tempIndex ? 'select' : null;
                });
            }
        },
        autoMove: function () {
            this.initIndex++;
            if (this.initIndex === this.bannerData.length + 1) {
                this.wrapper.style.left = 0;
                this.initIndex = 1;
            }
            this.change();
        },

        //=>其它切换方式
        mouseEvent: function () {
            var _this = this;
            _this.container.onmouseenter = function () {
                _this.needAutoChange ? clearInterval(_this.autoTimer) : null;
                _this.isArrowShow ? _this.arrowLeft.style.display = _this.arrowRight.style.display = 'block' : null;
            };

            _this.container.onmouseleave = function () {
                _this.needAutoChange ? _this.autoTimer = setInterval(_this.autoMove.bind(_this), _this.autoInterval) : null;
                _this.isArrowShow ? _this.arrowLeft.style.display = _this.arrowRight.style.display = 'none' : null;
            };
        },
        arrowEvent: function () {
            var _this = this;
            if (!_this.isArrowShow) return;
            _this.arrowRight.onclick = _this.autoMove.bind(_this);
            _this.arrowLeft.onclick = function () {
                _this.initIndex--;
                if (_this.initIndex === -1) {
                    _this.wrapper.style.left = -_this.bannerData.length * _this.containerWidth + 'px';
                    _this.initIndex = _this.bannerData.length - 1;
                }
                _this.change();
            }
        },
        eventFocus: function () {
            var _this = this;
            if (!_this.isFocusShow) return;
            if (!_this.needFocusChange) return;
            [].forEach.call(_this.focusList, function (item, index) {
                item['on' + _this.focusEvent] = function () {
                    _this.initIndex = index;
                    _this.change();
                }
            });
        },

        init: function (options) {
            //=>参数初始化
            this.initDefault(options);

            //=>获取需要使用的到的元素
            var _this = this;
            ['wrapper', 'focusBox', 'arrowLeft', 'arrowRight'].forEach(function (item, index) {
                _this[item] = _this.container.querySelector('.' + item);
            });
            this.containerWidth = this.container.clientWidth;

            //=>数据绑定
            this.queryData();
            this.bindData();

            //=>图片延迟加载
            this.lazyImg();

            //=>默认展示
            this.showInit();

            //=>自动切换
            if (this.needAutoChange) {
                this.autoTimer = setInterval(this.autoMove.bind(this), this.autoInterval);
            }

            //=>其它方式切换
            this.mouseEvent();
            this.arrowEvent();
            this.eventFocus();
        }
    };

    BannerPlugin.extend = function (obj, deep) {
        typeof deep === 'undefined' ? deep = false : null;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (BannerPlugin.prototype.hasOwnProperty(key)) {
                    if (deep) {
                        BannerPlugin.prototype[key] = obj[key];
                    }
                    continue;
                }
                BannerPlugin.prototype[key] = obj[key];
            }
        }
    };

    //=>让INIT的原型指向BANNER-PLUGIN的原型,目的:当执行BANNER-PLUGIN方法的时候创建出来的依然是BANNER-PLUGIN类的实例
    BannerPlugin.prototype.init.prototype = BannerPlugin.prototype;
    window.$banner = window.BannerPlugin = BannerPlugin;
}();


$banner({
    container: document.getElementById('container'),
    url: 'json/banner.json',
    autoInterval: 3000,
    initIndex: 2
});

var bannerExample = $banner({
    container: document.getElementById('container2'),
    url: 'json/banner2.json',
    needFocusChange: false,
    isArrowShow: false,
    speed: 100,
    lazyImgTime: 2000
});


$banner.extend({
    change: function () {
        animate({
            curEle: this.wrapper,
            target: {left: -this.initIndex * this.containerWidth},
            duration: this.speed,
            effect: animateEffect.Bounce.easeOut
        });

        //->CHANGE FOCUS
        if (this.isFocusShow) {
            var tempIndex = this.initIndex;
            tempIndex === this.bannerData.length ? tempIndex = 0 : null;
            [].forEach.call(this.focusList, function (item, index) {
                item.className = index === tempIndex ? 'select' : null;
            });
        }
    }
}, true);
bannerExample.speed = 500;







