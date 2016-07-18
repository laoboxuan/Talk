/**
 * Created by ericguo on 2016/7/14.
 */


var server = require('http').createServer();
var io = require('socket.io')(server);
var handleTalk = require('./handleTalk');

io.use(function(socket, next){
//    if (socket.request.headers.host === "127.0.0.1:8000")
    return next();
//    next(new Error('Authentication error'));
});

io.on('connection', function(socket){
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});

    socket.on("client_postMsg",function(msg,color){
        handleTalk.postMsg(msg,color);
    });

    socket.on("server_postMsg",function(msg,color){
        server_pushMsg(msg,color);
    });
    function server_pushMsg(msg,color){
        socket.emit('server_pushMsg',msg,color);
    }
});


server.listen(8000);