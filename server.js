//import FastScanner from  fastscan
var FastScanner=require("fastscan")
var express = require('express');
var app = express();
var fs = require("fs");
var url=require("url")
var readline = require('readline');
/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
        callback(arr);

    });
}
app.get('/wordquery', function (req, res) {

    console.log(req.url)
    var params = url.parse(req.url, true).query;
    console.log(params.content)
    if(params.content!=null&&params.content!="")
    {
        if(1){
            readFileToArr("./words.test",function (data) {
                var scanner = new FastScanner(data)
                var content = params.content
                var offWords = scanner.search(content)
                console.log(offWords)
                var hits = scanner.hits(content)
                console.log(hits)
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end( JSON.stringify(hits).toString())
               // res.end(hits)
            })
        }
    }
/*    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        //console.log( data );
        res.end( data );
    });*/
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})