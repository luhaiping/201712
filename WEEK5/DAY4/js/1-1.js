var oBox = document.getElementById('box');
oBox.onclick = function (e) {
    e = e || window.event;
    console.dir(e);
};

userName.onkeyup = function (e) {
    e = e || window.event;
    console.log(e.which);
};