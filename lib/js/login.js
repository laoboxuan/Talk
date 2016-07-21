/**
 * Created by ericguo on 2016/7/19.
 */

$(document).ready(function() {

    //点击注册按钮
    $("#regist").click(function () {
        //alert('regist');
        window.location.href = "http://localhost:1335/regist";
    });

    //点击登录按钮
    $("#login").click(function(){
        //alert('login');
        var nickName = $("#nicknameInput").val();
        var passWord = $("#passwordInput").val();

        var url = "http://localhost:1335/login";
        var data = {
            "nickName" : nickName,
            "passWord" : passWord
        };
        post(url,data);
    });

    //回车确认登录
    $('#id').keydown(function(e){
        var nickName = $("#nicknameInput").val();
        var passWord = $("#passwordInput").val();
        if(e.keyCode==13){
            var url = "http://localhost:1335/login";
            var data = {
                "nickName" : nickName,
                "passWord" : passWord
            };
            post(url,data);
        }
    });
});


function post(url,data){
    //alert('post');
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        timeout: 30 * 1000,
        processData:false,
        dataType:'json',
        contentType:"application/json; charset=utf-8",
        beforeSend:function(xhr){
            this.data=JSON.stringify(this.data);
        },
        success: function (data, textStatus, jqXHR) {
            if(data != undefined){
                if(data.code === 200){
                    var nickName = data.msg.nickName;
                    var token = data.msg.token;

                    window.location.href="/talkPage.html?nickName=" + nickName + "&token=" + token;

                }else{
                    alert("账号不存在或密码错误,请重新登录");
                }
            }else{
                alert("登录异常，请稍后再试");
            }
        },
        error: function (data, textStatus, jqXHR) {
            alert("服务器异常，请稍后再试");
        }
    });
}


////回车确认登录
//document.getElementById('passwordInput').addEventListener('keyup', function(e) {
//    if (e.keyCode == 13) {
//        var nicknameInput = document.getElementById('nicknameInput');
//        var nickname = nicknameInput.value;
//        var passwordInput = document.getElementById('passwordInput');
//        var password = passwordInput.value;
//
//        //预留请求判断
//
//    }
//}, false);


