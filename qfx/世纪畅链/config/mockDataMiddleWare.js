var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require('path');
var rd = require('rd');
var colors = require('colors');
var CWD = process.cwd();
var checkMark = /\.json$|\.js$/;
//var checkMark = /\.json|\.js/;

module.exports = function(mockDir) {
    return function(req, res, next) {
        // mt is mocktag 作为标示,相同url参数不同请求的数据不同
        // var mt = req.query.mt || req.body.mt || '';
        var urlObj = url.parse(req.url, true);
        // var fullName = urlObj.pathname + mt;
        var fullName = urlObj.pathname;
        //var dir = path.join(CWD, './data/');
        var dir = path.join(CWD, mockDir);
        // 遍历整个目录下所有文件
        /**
         * fileNames
         * @param  {string} dir 目录
         * @return {Array}     返回处理后的文件信息
         * demo
         * [ { name: '/check.do', verb: '.js' },
          { name: '/login', verb: '.json' } ]
         */
        var fileNames = rd.readSync(dir)
            .filter(function(x) {
                //只匹配json和js后缀
                return checkMark.test(x);
            })
            //.map(function(x) {return x.split(path.sep + 'data' + path.sep)[1];})
            //
            .map(function(x) {
                //获取文件名 check.do.js
                return x.split(path.sep + mockDir.replace(/^\.\//, '').replace(/\//g, path.sep) + path.sep)[1];
            })
            .map(function(x) {
                //check.do.js
                //name返回当前文件的名称 check
                //verb返回当前文件的后缀 .js
                return {
                    name: '/' + x.replace(checkMark, ''),
                    verb: x.match(checkMark).pop()
                };
            });
        var hasFile = false;
        var verb = 'json'; // 文件后缀

        // 查找本地是否存在这个文件
        fileNames.forEach(function(name) {
            var _name = name.name.replace(new RegExp('\\' + path.sep, 'g'), '/');
            if (fullName === _name) {
                hasFile = true;
                verb = name.verb;
            }
        });
        // 拦截到请求里本地存在这个文件
        if (hasFile) {
            var inlineData; // 写在check条件里的数据
            var delay = 0;
            var filePath = path.join(dir + fullName + verb);
            if (verb === '.js') {
                delete require.cache[require.resolve(filePath)];
                var checks = require(filePath);
                console.log('checks',checks);
                if (util.isObject(checks) && !util.isArray(checks)) {
                    checks = [checks];
                }
                checks.every(function(item) {
                    var isCheck = true;
                    // 检查params参数
                    for (var k in item.params) {
                        if (item.params[k] != req.query[k] && item.params[k] != req.body[k]) {
                            isCheck = false;
                        }
                    }
                    if (isCheck) {
                        if (item.delay) {
                            delay = item.delay;
                        }
                        if (typeof(item.response) === 'string') {
                            //filePath = path.join(dir + fullName.replace(/^\.|\/.+$/, '') + item.response);
                            filePath = path.join(dir + item.response.replace(/^\./, ''));
                        } else {
                            inlineData = item.response;
                        }
                        return false;
                    }
                    return true;
                });
            }

            // 如果是JS文件则根据参数请求文件
            console.log('[gulp-mock-server]', req.method + ':' + req.url + '=>' + filePath);

            // 删除缓存区里的某个模块 删除该模块后，下次加载该模块时重新运行该模块
            delete require.cache[require.resolve(filePath)];
            res.setHeader("Access-Control-Allow-Origin", "*");
            if (urlObj.query && urlObj.query.callback) {
                res.setHeader('Content-type', 'application/javascript;charset=utf-8');
                setTimeout(function() {
                    res.end(urlObj.query.callback + '(' + JSON.stringify(inlineData || require(filePath)) + ')');
                }, delay);
            } else {
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                setTimeout(function() {
                    res.end(JSON.stringify(inlineData || require(filePath)));
                }, delay);
            }
            return;
        } else {
            //所有的非匹配文件都会经过这里
            // console.log('No file:'.red + path.join(dir + fullName + '[.json|.js]').red);
        }

        next();
    }
};
