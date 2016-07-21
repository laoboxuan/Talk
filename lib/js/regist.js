/**
 * Created by Administrator on 2016/7/21 0021.
 */



$(document).ready(function() {

    //点击注册按钮
    $("#regist").click(function () {
        alert('regist');
        var nickName = $("#nicknameInput").val();
        var passWord = $("#passwordInput").val();
        var rePassWord = $("#rePasswordInput").val();

        var url = "http://localhost:1335/regist";
        var data = {
            "nickName" : nickName,
            "passWord" : passWord,
            "rePassWord" : rePassWord
        };
        post(url,data);
    });

    //点击登录按钮
    $("#login").click(function(){
        alert('login');

    });

    //回车确认注册
    $('#id').keydown(function(e){
        var nickName = $("#nicknameInput").val();
        var passWord = $("#passwordInput").val();
        var rePassWord = $("#rePasswordInput").val();

        var url = "http://localhost:1335/regist";
        var data = {
            "nickName" : nickName,
            "passWord" : passWord,
            "rePassWord" : rePassWord
        };
        post(url,data);
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
                    window.location.href = "http://localhost:1335/login";
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
