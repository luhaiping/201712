let fs = require('fs'),
    data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

let n = 0,
    str = '';
data.forEach((item)=> {
    str += '<div class="title"><strong>' + item.title + '<em>&nbsp;</em></strong></div><div class="textInfo">';

    item.list.forEach((cur)=> {
        n++;
        str += '<div><em>' + (n < 100 ? (n > 10 ? '0' + n : '00' + n) : n) + ':</em><a href="javascript:;">' + cur + '</a></div>';
    });

    str += '</div>';
});

fs.writeFileSync('./result.txt', str, 'utf-8');

