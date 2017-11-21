// var oBox = document.getElementById('box'),
//     target = {
//         left: utils.winBox('clientWidth') - oBox.offsetWidth,
//         top: utils.winBox('clientHeight') - oBox.offsetHeight,
//         opacity: 0.1
//     };
// animate(oBox, target, 500);


var oBox = document.getElementById('box');
animate(oBox, {
    top: -300
}, 1000);

animate(oBox, {
    top: 300
}, 1000);