var oBox = document.getElementById('box');

function move() {
    animate(oBox, {top: 0}, 500, function () {
        utils.css(oBox, 'backgroundColor', 'green');
        animate(oBox, {left: 800}, 500, function () {
            utils.css(oBox, 'backgroundColor', 'orange');
            animate(oBox, {top: 300}, 500, function () {
                utils.css(oBox, 'backgroundColor', 'pink');
                animate(oBox, {left: 400}, 500, function () {
                    utils.css(oBox, 'backgroundColor', 'red');
                });
            });
        });
    });
}
// move();
// setInterval(move, 2000);