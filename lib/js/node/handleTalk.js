/**
 * Created by ericguo on 2016/7/14.
 */
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8000');

exports.userInput = function(nickName,token,message,color){

    socket.emit("serverOutput",nickName,message,color);

    //socket.on('newMsg',function result(nickNameInput,message,color){
    //
    //});
};