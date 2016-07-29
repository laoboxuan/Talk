/**
 * Created by Administrator on 2016/7/25 0025.
 */

//function userInput_msg(nickNameInput,tokenInput,messageInput,colorInput){
//    alert("userInput_msg");
//    alert("socket :" + window.socket);
//    socket.emit('userInput_msg',nickNameInput,tokenInput,messageInput,colorInput);
//}


$(document).ready(function(){
    alert("client ");

    var url = window.document.URL;
    var urlData = url.split("?")[1];
    var nickNameSelf = "";
    var token = "";


    function userInput_msg(nickNameInput,tokenInput,messageInput,colorInput){
        alert("userInput_msg ");
        socket.emit('userInput_msg',nickNameInput,tokenInput,messageInput,colorInput);
    }

    if(urlData === undefined){//url格式不对，回退到登陆界面
        window.location.href = "http://localhost:1335/login";
    }
    if(urlData != undefined){

        var paramDataList = urlData.split("&");
        nickNameSelf = paramDataList[0].split("=")[1];
        token = paramDataList[1].split("=")[1];

        if(nickNameSelf === undefined || nickNameSelf === null || token === undefined || token === null){//url数据不对，回退到登陆界面
            window.location.href = "http://localhost:1335/login";
        }else{

            var socket = io.connect('http://localhost:8000');//socket连接地址
            socket.on('connect',function(){//socket连接成功
                alert("connect");

                $.getScript("/js/login.js",function(){
                    getSocket(socket);
                });

                $("onLine").empty();
                $("userIndex_online").empty();
                var talkRoomUrl = '<a href = /talkPage.html?nickName=' + nickNameSelf + "&token=" + token +'>点击进入聊天室</a>';
                $("talkRoom").append(talkRoomUrl);
            });

            socket.emit('login',nickNameSelf,token);//向服务器发送登陆成功请求

            socket.on('broadcast', function (pushData,pushType) {//接收广播
                if(pushType === "broadcastMsg"){//广播消息
                    var nickNameInput = pushData.nickName;
                    var messageInput = pushData.message;
                    var colorInput = pushData.color;

                    if(nickNameInput != nickNameSelf){
                        $.getScript("/talkPage.js",function(){
                            dispalyNewMsg(nickNameInput,messageInput,colorInput);
                        });
                    }
                }
                if((pushType === "offLine" || pushType === "onLine") && pushData.userNickName != nickNameSelf){//好友上下线广播
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
                    //systemNotifyMsg(notifyMessage,notifyColor);
                }
            });

            socket.on('userIndex_' + token, function (pushData) {
                var userIndex_online = pushData.onlineNum;
                var friendList = pushData.friendList;

                $("nickName").append(nickNameSelf);
            });

            function systemNotifyMsg(message,color){
                var container = document.getElementById('historyMsg'),
                    msgToDisplay = document.createElement('p'),
                    date = new Date().toTimeString().substr(0, 8);

                msgToDisplay.style.color = color || '#000';

                msgToDisplay.innerHTML = '<br><span style="text-align: center"> ' + message + "   (" + date + ")" + '</span></br>';

                container.appendChild(msgToDisplay);
                container.scrollTop = container.scrollHeight;
            }

        }
    }


});



