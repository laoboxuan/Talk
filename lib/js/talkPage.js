/**
 * Created by Administrator on 2016/7/21 0021.
 */

alert("talkPage");



$(document).ready(function() {

    alert("ready");

    var url = window.document.URL;
    var urlData = url.split("?")[1];
    var nickName = "";
    var token = "";

    if(urlData === undefined){
        window.location.href = "http://localhost:1335/login";
    }
    if(urlData != undefined){
        var paramDataList = urlData.split("&");

        nickName = paramDataList[0].split("=")[1];
        token = paramDataList[1].split("=")[1];

        if(nickName === undefined || nickName === null || token === undefined || token === null){
            window.location.href = "http://localhost:1335/login";
        }
    }

    //点击发送按钮
    $("#sendBtn").click(function () {
        var message = $("#messageInput").val();
        alert("nickName:" + nickName);
        alert("token:" + token);
    });

    //点击清除按钮
    $("#clearBtn").click(function(){
        window.location.href = "http://localhost:1335/login";
    });

    //点击颜色按钮
    $("#colorStyle").click(function(){
        window.location.href = "http://localhost:1335/login";
    });

    //点击emoji按钮
    $("#emoji").click(function(){
        window.location.href = "http://localhost:1335/login";
    });
});

