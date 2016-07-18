var msg = "tets";

var io = require('socket.io-client');
var socket = io.connect('ws://localhost:8000');
socket.on('connect', function(){
    console.log('connect');
    socket.emit("postMsg",msg);
});



socket.on("server_pushMsg",function (msg,c){
    console.log("a_msg:" + msg);
});

//var handleTalk = require('./handleTalk');
//handleTalk.postMsg(msg);
