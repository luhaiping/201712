var oBox = document.getElementById('box');

animate({
    curEle: oBox,
    target: {top: 0},
    duration: 500,
    effect: animateEffect.Bounce.easeOut,
    callBack: function () {
        //=>this:oBox 动画库中处理的
        //=>第二次运动
        animate({
            curEle: this,
            target: {left: 800},
            duration: 500,
            effect: animateEffect.Back.easeOut,
            callBack: function () {
                //=>第三次运动
                animate({
                    curEle: this,
                    target: {top: 300},
                    duration: 500,
                    effect: animateEffect.Elastic.easeOut,
                    callBack: function () {
                        //=>第四次运动
                        animate({
                            curEle: this,
                            target: {left: 400},
                            duration: 500
                        });
                    }
                });
            }
        });
    }
});

