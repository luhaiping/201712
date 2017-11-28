document.onclick = function () {
    console.log('DOC');
};

document.documentElement.onclick = function () {
    console.log('HTML');
};

document.body.onclick = function () {
    console.log('BODY');
};

outer.onclick = function () {
    console.log('OUTER');
};

inner.onclick = function () {
    console.log('INNER');
};