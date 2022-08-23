var fs = require('fs')
var src = 'html',filename = 'example.html'
var date=new Date();
var month=(date.getMonth()+1).toString();
var day=date.getDate().toString();
var name = month+day+Math.random().toString().slice(2,6)+'.html'
var fnImport = function (src,filename) {
    fs.readFile(src+'/'+filename,{encoding:'utf8'},function (err,data) {
        var dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi,function(matchs,m1){
            console.log(m1)
            return fs.readFileSync(src+'/'+m1,{encoding:'utf8'})
        })

        dataReplace = dataReplace.replace(/\.\.\//g,'');
        console.log(dataReplace)
        fs.writeFile(name,dataReplace,{encoding:'utf8'},function () {
            
        })
    })
}
fnImport(src,filename)