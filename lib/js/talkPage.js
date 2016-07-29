/**
 * Created by Administrator on 2016/7/21 0021.
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

        var paramDataList = urlData.split("&");

        nickNameSelf = paramDataList[0].split("=")[1];
        token = paramDataList[1].split("=")[1];

        if(nickNameSelf === undefined || nickNameSelf === null || token === undefined || token === null){
            window.location.href = "http://localhost:1335/login";
        }else{
            //alert("talkPage03");
            $("nickName").append(nickNameSelf);

            //点击发送按钮
            $("#sendBtn").click(function(){

                var message = $("#messageInput").val();
                var color = $("#colorStyle").val();

                var messageStr = document.getElementById("messageInput");
                messageStr.value = '';
                messageStr.focus();

                if (message.trim().length != 0) {
                    dispalyNewMsg(nickNameSelf,message,color)
                };

                $.getScript("/js/client.js",function(){
                    alert("01");
                    userInput_msg(nickNameSelf,token,message,color);
                });
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

