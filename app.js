var express = require('express'),
    favicon = require('serve-favicon'),
    html = require('html'),
    app = express();

var socket = require('./lib/js/socket');
var handleTalk = require('./lib/js/handleTalk');

app.use(favicon(__dirname + '/image/favicon.ico'));
app.use('/', express.static(__dirname + '/lib/www'));


app.get('/image/:fileName',function(req,res){

    var fileName = req.params.fileName;
    var filePath = __dirname + '/image/' + fileName;
    res.sendFile(filePath);
});

app.get('/css/:fileName',function(req,res){

    var fileName = req.params.fileName;
    var filePath = __dirname + '/css/' + fileName;
    res.sendFile(filePath);
});

app.get('/js/:fileName',function(req,res){

    var fileName = req.params.fileName;
    var filePath = __dirname + '/lib/js/' + fileName;
    res.sendFile(filePath);
});

app.listen(1335);
console.log("start,1335");