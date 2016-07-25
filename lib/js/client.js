/**
 * Created by Administrator on 2016/7/25 0025.
 */



$(document).ready(function(){
    var url = window.document.URL;
    var urlData = url.split("?")[1];
    var nickNameSelf = "";
    var token = "";


    if(urlData === undefined){
        window.location.href = "http://localhost:1335/login";
    }
    if(urlData != undefined){
        //alert("talkPage02")
        var socket = io.connect('http://localhost:8000');
        var paramDataList = urlData.split("&");
        nickNameSelf = paramDataList[0].split("=")[1];
        token = paramDataList[1].split("=")[1];

        if(nickNameSelf === undefined || nickNameSelf === null || token === undefined || token === null){
            window.location.href = "http://localhost:1335/login";
        }else{
            //alert("talkPage03");
            $("nickName").append(nickNameSelf);

            socket.on('connect',function(){
                //alert("server connection");
                $("onLine").empty();
                $("userIndex_online").empty();
                //$("nickName").empty();
            });

            socket.emit('login',nickNameSelf,token);

            socket.on('broadcast', function (pushData,pushType) {
                if(pushType === "broadcastMsg"){
                    var nickNameInput = pushData.nickName;
                    var messageInput = pushData.message;
                    var colorInput = pushData.color;

                    if(nickNameInput != nickNameSelf){
                        dispalyNewMsg(nickNameInput,messageInput,colorInput);
                    }
                }
                if((pushType === "offLine" || pushType === "onLine") && pushData.userNickName != nickNameSelf){
                    //$("onLine").append();
                    var onlineNum = pushData.onlineNum;
                    var userNickName = pushData.userNickName;
                    var notifyMessage = "";
                    var notifyColor = "";

                    $("onLine").empty();
                    $("onLine").append("在线人数： " + onlineNum);

                    if(pushType === "offLine"){
                        notifyMessage = "用户：" + userNickName + "已下线";
                    }
                    if(pushType === "onLine"){
                        notifyMessage = "用户：" + userNickName + "上线";
                    }
                    systemNotifyMsg(notifyMessage,notifyColor);
                }
            });

            socket.on('self', function (pushData,pushType) {
                if(pushType === "offLine" || pushType === "onLine"){
                    var onlineNum = pushData.onlineNum;
                    var userNickName = pushData.userNickName;

                    $("onLine").append("在线人数： " + onlineNum);
                    $("userIndex_online").append("在线人数:" + onlineNum);
                    var notifyMessage = "进入聊天室成功~";
                    var notifyColor = "";
                    systemNotifyMsg(notifyMessage,notifyColor);
                }
            });

            socket.on('userIndex_' + token, function (pushData) {
                var userIndex_online = pushData.onlineNum;
                var friendList = pushData.friendList;

                $("nickName").append(nickNameSelf);
            });


            //点击发送按钮
            $("#sendBtn").click(function(){
                var message = $("#messageInput").val();
                var color = $("#colorStyle").val();

                socket.emit('userInput_msg',nickNameSelf,token,message,color);
                var messageStr = document.getElementById("messageInput");
                messageStr.value = '';
                messageStr.focus();

                if (message.trim().length != 0) {
                    dispalyNewMsg(nickNameSelf,message,color)
                };
            });


            function dispalyNewMsg(nickNameInput,message,color){
                var container = document.getElementById('historyMsg'),
                    msgToDisplay = document.createElement('p'),
                    date = new Date().toTimeString().substr(0, 8);
                //将消息中的表情转换为图片
                var msg = showEmoji(message);
                msgToDisplay.style.color = color || '#000';
                if(nickNameInput != nickNameSelf){
                    //msgToDisplay.innerHTML = nickNameInput + '<span class="timespan">(' + date + '): </span>' + msg;
                    msgToDisplay.innerHTML = nickNameInput + ":" + msg
                }
                if(nickNameInput === nickNameSelf){
                    //msgToDisplay.innerHTML = '<br><span class="selfMsg"> ' + msg + '<span class="timespan">(' + date + ')</span></span></br>';
                    msgToDisplay.innerHTML = '<br><span class="selfMsg"> ' + msg + '</span></br>';
                }
                container.appendChild(msgToDisplay);
                container.scrollTop = container.scrollHeight;
            }


            function systemNotifyMsg(message,color){
                var container = document.getElementById('historyMsg'),
                    msgToDisplay = document.createElement('p'),
                    date = new Date().toTimeString().substr(0, 8);

                msgToDisplay.style.color = color || '#000';

                msgToDisplay.innerHTML = '<br><span style="text-align: center"> ' + message + "   (" + date + ")" + '</span></br>';

                container.appendChild(msgToDisplay);
                container.scrollTop = container.scrollHeight;
            }

            function showEmoji(msg) {
                var match, result = msg,
                    reg = /\[emoji:\d+\]/g,
                    emojiIndex,
                    totalEmojiNum = document.getElementById('emojiWrapper').children.length;
                while (match = reg.exec(msg)) {
                    emojiIndex = match[0].slice(7, -1);
                    if (emojiIndex > totalEmojiNum) {
                        result = result.replace(match[0], '[X]');
                    } else {
                        result = result.replace(match[0], '<img class="emoji" src="../content/emoji/' + emojiIndex + '.gif" />');
                    };
                };
                return result;
            }
        }
    }
});
