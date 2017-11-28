outer.addEventListener('click', function () {
    console.log(`OUTER 1`);
}, false);

outer.addEventListener('click', function () {
    console.log(`OUTER 2`);
}, true);//=>当前绑定的方法会在捕获阶段触发执行

inner.addEventListener('click', function () {
    console.log(`INNER`);
}, false);//=>FALSE:当前绑定的方法是在目标阶段或者冒泡传播阶段才会被触发执行（等价于DOM0事件绑定）