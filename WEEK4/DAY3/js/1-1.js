var dialogRender = (function () {
    var dialogBg = document.getElementById('dialogBg'),
        dialogBox = document.getElementById('dialogBox'),
        close = document.getElementById('close');

    function show() {
        utils.css(dialogBg, 'display', 'block');
        utils.css(dialogBox, 'display', 'block');
        animate(dialogBox, {
            width: 400,
            height: 500,
            marginLeft: -200,
            marginTop: -250
        }, 500);
    }

    function hide() {
        close.onclick = function () {
            utils.css(dialogBg, 'display', 'none');
            utils.css(dialogBox, {
                display: 'none',
                width: 0,
                height: 0,
                marginLeft: 0,
                marginTop: 0
            });
        }
    }

    return {
        init: function () {
            //=>控制显示
            show();

            //=>控制隐藏
            hide();
        }
    }
})();

//=>点击登陆的时候执行DIALOG中的方法
var loginBtn = document.getElementById('login');
loginBtn.onclick = function () {
    dialogRender.init();
};