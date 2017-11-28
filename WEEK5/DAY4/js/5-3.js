// outer.onmouseover = function () {
//     console.log(`outer over`);
// };
// outer.onmouseout = function () {
//     console.log(`outer out`);
// };
//
// inner.onmouseover = function (e) {
//     console.log(`inner over`);
//     e = e || window.event;
//     e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
// };
// inner.onmouseout = function (e) {
//     console.log(`inner out`);
//     e = e || window.event;
//     e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
// };

outer.onmouseenter = function () {
    console.log(`outer enter`);
};
outer.onmouseleave = function () {
    console.log(`outer leave`);
};

inner.onmouseenter = function (e) {
    console.log(`inner enter`);
};
inner.onmouseleave = function (e) {
    console.log(`inner leave`);
};