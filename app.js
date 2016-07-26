var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    querystring = require('querystring'),
    fs = require('fs'),
    app = express();

var userJson = require('./lib/db/user.json');
var socket = require('./lib/js/node/socket');
var handleTalk = require('./lib/js/node/handleTalk');

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

    var body = req.body;
    var nickName = body.nickName;
    var passWord = body.passWord;
    if(userJson[nickName] != undefined){
        if(userJson[nickName].passWord === passWord){
            res.send({"code" : 200,"msg" : {"nickName" : nickName,"token" : passWord}});
            userJson[nickName].status = 1;
            var fsResult = fs.writeFileSync("./lib/db/user.json",JSON.stringify(userJson));
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

    //console.log("regist");
    var body = req.body;
    var nickName = body.nickName;
    var passWord = body.passWord;
    var rePassWord = body.rePassWord;
    if(userJson[nickName] === undefined){
        if(passWord === rePassWord){
            userJson[nickName] = {
                "passWord" : passWord,
                "status" : 0
            };
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

app.get('/get/userList/:nickName/:token',function(req,res){

    var nickName = req.params.nickName;
    var token = req.params.token;
    var file = require( './lib/db/user.json');

    var reStr = {
        "code" : 200,
        "msg" : []
    };
    var num = 0;
    for(var key in file){
        reStr.msg[num] = {
            "nickName" : key,
            "status" : file[key].status
        }
        num ++ ;
    }
    //console.log("reStr:" + JSON.stringify(reStr));
    res.send(reStr);

});

app.listen(1335);
console.log("start,1335");