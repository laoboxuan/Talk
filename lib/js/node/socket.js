/**
 * Created by ericguo on 2016/7/14.
 */


var server = require('http').createServer();
var io = require('socket.io')(server);
var handleTalk = require('./handleTalk');
var userList = [];

io.use(function(socket, next){
    //console.log("socket.request.headers.host:" + socket.request.headers.host);
    if (socket.request.headers.host === "localhost:8000"){
        return next();
    }else{
        next(new Error('Authentication error'));
    }
});


io.on('connection', function(socket){

    socket.on('event', function(data){});
    socket.on('disconnect', function(){
        userList.splice(socket.userListIndex,1);
        var pushData = {
            "onlineNum" : userList.length,
            "userNickName" : socket.nickName
        };
        var pushType = "offLine";
        broadcastServerPush(pushData,pushType);
        //selfServerPush(pushData,pushType);
    });

    socket.on('login', function(nickName,token){
        socket.userListIndex = userList.length;
        socket.nickName = nickName;
        socket.token = token;
        userList.push(nickName);
        var pushData = {
            "onlineNum" : userList.length,
            "userNickName" : nickName
        };
        var pushType = "onLine";
        selfServerPush(pushData,pushType);
        broadcastServerPush(pushData,pushType);
    });

    socket.on("userInput_msg",function(nickName,token,message,color){
        handleTalk.userInput(nickName,token,message,color);

        var pushData = {
            "nickName" : nickName,
            "message" : message,
            "color" : color
        };
        var pushType = "broadcastMsg";
        broadcastServerPush(pushData,pushType);
    });

    function broadcastServerPush(pushData,pushType){
        socket.broadcast.emit('broadcast',pushData,pushType);
    }
    function selfServerPush(pushData,pushType){
        socket.emit('self',pushData,pushType);
    }
});


server.listen(8000);
console.log("socket start,port is 8000");

exports.getOnLineName = function(result){
    result(userList);
};