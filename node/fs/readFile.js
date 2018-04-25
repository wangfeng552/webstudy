var fs = require('fs');

//writeFile 是追加模式写文件
fs.open('wf.txt','a+',function (err ,fd) {
    console.log(fd)
    fs.writeFile(fd,'我是大佛寺',function (err) {
        fs.readFile(fd,function (err,data) {
            fs.rename('wf.txt','wfnew.txt',function () {

            })
        })
    })
})