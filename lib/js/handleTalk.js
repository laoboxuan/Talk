/**
 * Created by ericguo on 2016/7/14.
 */

var io = require('socket.io-client');
var socket = io.connect('http://localhost:8000');
socket.on('connect', function(){
    //console.log('connect');
});

exports.postMsg = function(msg,color){
    //console.log("msg : " + msg);
    //console.log("color : " + color);
    socket.emit("server_postMsg",msg,color);
}