//
//var io = require('socket.io-client');
//var socket = io.connect('ws://127.0.0.1:8000');
//socket.on('connect', function(){
//    //console.log('connect');
//    //按钮代码
//    document.getElementById('sendBtn').addEventListener('click', function () {
//        var messageInput = document.getElementById('messageInput');
//        var msg = messageInput.value;
//        var color = document.getElementById('colorStyle').value;
//
//        messageInput.value = '';
//        messageInput.focus();
//
//
//        socket.emit('sendBtnMsg', msg,color);
////        socket.once(eventname,function result(str){
////        })
//
//    }, false);
//    //回车确认发送消息
//    document.getElementById('messageInput').addEventListener('keyup', function (e) {
//        var messageInput = document.getElementById('messageInput');
//        var msg = messageInput.value;
//        var color = document.getElementById('colorStyle').value;
//
//        socket.emit('messageInputMsg', msg,color);
////        socket.once(eventname,function result(str){
////        })
//    }, false);
//});


//window.onload = function() {
//    //实例并初始化我们的hichat程序
//    var hichat = new HiChat();
//    hichat.init();
//};
//
////定义我们的hichat类
//var HiChat = function() {
//    this.socket = null;
//};
//
////向原型添加业务方法
//HiChat.prototype = {
//    init: function() {//此方法初始化程序
//        var that = this;
//        //建立到服务器的socket连接
//        this.socket = io.connect('ws://127.0.0.1:8000');
//        this.socket.on('connect', function () {
//            console.log("connect");
//        });
//        //按钮代码
//        document.getElementById('sendBtn').addEventListener('click', function () {
//            var messageInput = document.getElementById('messageInput');
//            var msg = messageInput.value;
//            //获取颜色值
//            var color = document.getElementById('colorStyle').value;
//            messageInput.value = '';
//            messageInput.focus();
//
//            that.socket.emit('postMsg', msg, color); //把消息发送到服务器
//        }, false);
//        //回车确认发送消息
//        document.getElementById('messageInput').addEventListener('keyup', function (e) {
//            var messageInput = document.getElementById('messageInput');
//            var msg = messageInput.value;
//            var color = document.getElementById('colorStyle').value;
//
//            that.socket.emit('postMsg', msg, color);
//        }, false);
//
//    }
//};


window.onload = function() {
    //实例并初始化我们的hichat程序
    var hichat = new HiChat();
    hichat.init();
};

//定义我们的hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
        });
        //按钮代码
        document.getElementById('sendBtn').addEventListener('click', function() {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value;
            //获取颜色值
            color = document.getElementById('colorStyle').value;
            messageInput.value = '';
            messageInput.focus();
            if (msg.trim().length != 0) {
                //显示和发送时带上颜色参数
                that.socket.emit('postMsg', msg); //把消息发送到服务器
                that._displayNewMsg('me', msg,color); //把自己的消息显示到自己的窗口中
            };
        }, false);
        //回车确认发送消息
        document.getElementById('messageInput').addEventListener('keyup', function(e) {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg);
                that._displayNewMsg('me', msg, color);
            };
        }, false);
        //表情的click事件处理程序
        document.getElementById('emojiWrapper').addEventListener('click', function(e) {
            //获取被点击的表情
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
            };
        }, false);
    }
};




