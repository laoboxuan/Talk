/**
 * Created by ericguo on 2016/7/14.
 */

alert("connection");

var io = require('socket.io-client');
var socket = io.connect('ws://127.0.0.1:8000');
socket.on('connect', function(){
    alert('connect');
});