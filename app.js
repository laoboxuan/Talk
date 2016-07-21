var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    querystring = require('querystring'),
    fs = require('fs'),
    app = express();

var userJson = require('./lib/db/user.json');
var socket = require('./lib/js/socket');
var handleTalk = require('./lib/js/handleTalk');

app.use(favicon(__dirname + '/image/favicon.ico'));
app.use('/', express.static(__dirname + '/lib/www'));

app.use(bodyParser.text({type: 'text/xml'}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

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


app.get('/login_success/:userName/:token',function(req,res){

    var userName = req.params.userName;
    var token = req.params.token;
    console.log("userName:" + userName);
    console.log("token:" + token);
    var filePath = __dirname + '/lib/www/talkPage.html';
    res.sendFile(filePath);
});


app.post('/login',function(req,res){

    console.log("login");
    var body = req.body;
    var nickName = body.nickName;
    var passWord = body.passWord;
    if(userJson[nickName] != undefined){
        if(userJson[nickName] === passWord){
            res.send({"code" : 200,"msg" : {"nickName" : nickName,"token" : passWord}});
        }else{
            res.send({"code" : 6500,"errMsg" : "passWord Error"});
        }
    }else{
        res.send({"code" : 6500,"errMsg" : "nickName Error"});
    }
});


app.get('/login',function(req,res){

    var filePath = __dirname + '/lib/www/login.html';
    res.sendFile(filePath);
});


app.post('/regist',function(req,res){

    console.log("regist");
    var body = req.body;
    var nickName = body.nickName;
    var passWord = body.passWord;
    var rePassWord = body.rePassWord;
    if(userJson[nickName] === undefined){
        if(passWord === rePassWord){
            userJson[nickName] = passWord;
            var fsResult = fs.writeFileSync("./lib/db/user.json",JSON.stringify(userJson));
            res.send({"code" : 200,"msg" : {"nickName" : nickName,"token" : passWord}});
        }else{
            res.send({"code" : 6500,"errMsg" : "passWord Error"});
        }
    }else{
        res.send({"code" : 6500,"errMsg" : "nickName Error"});
    }
});


app.get('/regist',function(req,res){

    var filePath = __dirname + '/lib/www/regist.html';
    res.sendFile(filePath);
});

app.listen(1335);
console.log("start,1335");