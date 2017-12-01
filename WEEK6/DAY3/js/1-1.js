var fn1 = function (e) {
    console.log(1, this);
};
var fn2 = function (e) {
    console.log(2);
};
var fn3 = function (e) {
    console.log(3);
};
var fn4 = function (e) {
    console.log(4);
    $event.off(document.body, 'click', fn1);
    $event.off(document.body, 'click', fn2);
    $event.off(document.body, 'click', fn3);
};
var fn5 = function (e) {
    console.log(5);
};
var fn6 = function (e) {
    console.log(6);
};
var fn7 = function (e) {
    console.log(7);
};
var fn8 = function (e) {
    console.log(8);
};
var fn9 = function (e) {
    console.log(9);
};
var fn10 = function (e) {
    console.log(10);
};
var fn11 = function (e) {
    console.log(11);
};
var fn12 = function (e) {
    console.log(12);
};

$event.on(document.body, 'click', fn1);
$event.on(document.body, 'click', fn2);
$event.on(document.body, 'click', fn3);
$event.on(document.body, 'click', fn4);
$event.on(document.body, 'click', fn5);
$event.on(document.body, 'click', fn6);
$event.on(document.body, 'click', fn7);
$event.on(document.body, 'click', fn8);
$event.on(document.body, 'click', fn9);
$event.on(document.body, 'click', fn10);
$event.on(document.body, 'click', fn11);
$event.on(document.body, 'click', fn12);
$event.on(document.body, 'click', fn12);
$event.on(document.body, 'click', fn12);
$event.on(document.body, 'click', fn12);