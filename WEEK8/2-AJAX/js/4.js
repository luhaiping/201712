ajax({
    url: 'temp.json',
    method: 'post',
    cache: false,
    data: {
        name: '珠峰',
        age: 9
    },
    success: result=> {
        console.log(result);
    }
});