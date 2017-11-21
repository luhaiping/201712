var dialogRender = (function () {
    var dialogBg = document.getElementById('dialogBg'),
        dialogBox = document.getElementById('dialogBox'),
        close = utils.getElementsByClassName('close', dialogBox)[0];

    function closeDialog() {
        close.onclick = function () {
            utils.css(dialogBg, 'display', 'none');
            utils.css(dialogBox, {
                display: 'none',
                width: 0,
                height: 0,
                marginTop: 0,
                marginLeft: 0
            });
        }
    }

    return {
        init: function () {
            //=>控制显示
            utils.css(dialogBg, 'display', 'block');
            utils.css(dialogBox, 'display', 'block');

            //=>DIALOG-BOX需要有动画的效果:从宽高为零变为我们的目标值(固定时间:500MS)
            animate({
                curEle: dialogBox,
                target: {
                    width: 400,
                    height: 500,
                    marginTop: -250,
                    marginLeft: -200
                },
                duration: 2000,
                effect: animateEffect.Bounce.easeOut,
                callBack: function () {
                    //=>this:dialogBox
                    //utils.css(this, 'backgroundColor', 'lightcoral');
                }
            });

            //=>控制隐藏
            closeDialog();
        }
    }
})();

//=>点击登录按钮显示DIALOG
document.getElementById('login').onclick = function () {
    dialogRender.init();
};
