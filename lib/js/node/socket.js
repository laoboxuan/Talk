/**
 * Created by ericguo on 2016/7/14.
 */


var server = require('http').createServer();
var io = require('socket.io')(server);
var handleTalk = require('./handleTalk');
var userList = [];

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
        userStatus(userList.length);
    });

    socket.on('login', function(nickName,token){
        socket.userListIndex = userList.length;
        socket.nickName = nickName;
        socket.token = token;
        userList.push(nickName);
        userStatus(userList.length);
    });

    socket.on("userInput_msg",function(nickName,token,message,color){
        handleTalk.userInput(nickName,token,message,color);
        server_pushMsg(nickName,message,color);
    });

    function userStatus(onLine){
        socket.broadcast.emit('userStatus',onLine);
    }

    function server_pushMsg(nickName,message,color){
        socket.broadcast.emit('newMsg',nickName,message,color);
    }
});


server.listen(8000);
console.log("socket start,port is 8000");