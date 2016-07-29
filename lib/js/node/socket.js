/**
 * Created by ericguo on 2016/7/14.
 */


var server = require('http').createServer();
var io = require('socket.io')(server);
var handleTalk = require('./handleTalk');
var userList = [];
var fs = require('fs');
var userJson = require('../../db/user.json');

io.use(function(socket, next){
    console.log("socket.request.headers.host:" + socket.request.headers.host);
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
        updateUserIndexUserList(socket.nickName,0);
    });

    socket.on('login', function(nickName,token){
        socket.userListIndex = userList.length;
        socket.nickName = nickName;
        socket.token = token;
        userList.push(nickName);
        updateUserIndexUserList(nickName,1);
    });

    //getOnlineUser
    socket.on('getOnlineUser', function() {
        userIndexUserList(userList);
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
    function userIndexUserList(onUserList){
        var onUserList = onUserList;
        var users = require('../../db/user.json');
        var userList = [];
        var userListIndex = 0;
        for(var key in users){
            userList[userListIndex] = key;
            userListIndex += 1;
        }
        socket.emit('userIndexUserList',userList,onUserList);
    }
    function updateUserIndexUserList(nickName,status){
        socket.broadcast.emit('userIndexUserListUpdate',nickName,status);
    }
});


server.listen(8000);
console.log("socket start,port is 8000");
