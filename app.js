//引用http
const http = require('http');
//引入url模块
const url = require('url');
//引入fs读取文件
const fs = require('fs');
const path = require('path');
const common = require('./module/common')
//创建连接
http.createServer((req, res) => {
    // 获取路由传的参数
    let pathName = req.url;
    pathName = pathName === '/' ? '/index.html' : pathName;
    if (pathName != '/favicon.ico') {
        //根据参数显示html
        let name = path.extname(url.parse(pathName, true).pathname);

        fs.readFile('./html' + pathName, (err, data) => {
            if (err) {
                // 如果报错，404
                res.writeHead(404, { 'Content-type': 'text/html;charset=utf-8' });
                res.end('页面不存在');
            }
            // common.getMine(name) 根据不同的文件类型设置请求头
            res.writeHead(200, { 'Content-type': ''+common.getMine(name)+'/html;charset=utf-8' });
            res.end(data);
        })
    }
}).listen(3000)//监听的端口号