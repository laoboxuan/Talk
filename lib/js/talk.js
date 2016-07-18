/**
 * Created by ericguo on 2016/7/14.
 */

var socket = io.connect('http://localhost:8000');
socket.on('connect', function(){
    alert('聊天已建立');

});

socket.on("server_pushMsg",function(msg,color){
    alert('server_pushMsg');
    var user = "";
    var msg = msg;
    var color = color;
    _displayNewMsg(user, msg, color);
})

//回车确认发送消息
document.getElementById('messageInput').addEventListener('keyup', function(e) {
    var messageInput = document.getElementById('messageInput');
    var msg = messageInput.value;
    var color = document.getElementById('colorStyle').value;
    if (e.keyCode == 13 && msg.trim().length != 0) {
        socket.emit('client_postMsg',msg,color);
        messageInput.value = '';
    }
    if(e.keyCode == 13 && msg.trim().length === 0){
        alert('请勿发送空白消息');
        messageInput.value = '';
    }
}, false);

function _displayNewMsg(user, msg, color) {
    alert('_displayNewMsg');
    var container = document.getElementById('historyMsg'),
        msgToDisplay = document.createElement('p'),
        date = new Date().toTimeString().substr(0, 8);
    //将消息中的表情转换为图片
    //msg = this._showEmoji(msg);
    msgToDisplay.style.color = color || '#000';
    msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
    container.appendChild(msgToDisplay);
    container.scrollTop = container.scrollHeight;
}


