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

        var paramDataList = urlData.split("&");

        nickNameSelf = paramDataList[0].split("=")[1];
        token = paramDataList[1].split("=")[1];

        if(nickNameSelf === undefined || nickNameSelf === null || token === undefined || token === null){
            window.location.href = "http://localhost:1335/login";
        }else{


            getJson(nickNameSelf,token,function (userListData){

                var userList = userListData.msg;

                if(userList.length>0){
                    $.each(userList,function(index,json){
                        var row=$("#template").clone();//克隆一份模板
                        row.find("#nickName").html(json.nickName);//替换标记内容
                        if(json.status === 1){
                            row.find("#status").html("在线");
                        }
                        if(json.status === 0){
                            row.find("#status").html("离线");
                        }

                        row.find("#privateTalk").html('<a href = "/privateTalk.html?friendNickName=" + json.nickName">聊天</a>');
                        row.attr("id",index);//改变行的Id
                        row.appendTo("#tableTemp");//添加到模板的容器中
                    });
                    $("#template").css("display","none");//隐藏行模块
                    $("#trLoad").css("display","none");//隐藏提示行模块
                }
                else{
                    $("#spnLoad").html("<font color=green>没有查询到数据！</font>");
                }
            })
        }
    }
});

function getJson(nickNameSelf,token,userList){

    var nickName = nickNameSelf;
    var token = token;
    $.ajax({
        type: "GET",
        url: "http://localhost:1335/get/userList/" + nickName + "/" + token,
        //data: data,
        timeout: 30 * 1000,
        processData:false,
        dataType:'json',
        contentType:"application/json; charset=utf-8",
        beforeSend:function(xhr){
            this.data=JSON.stringify(this.data);
        },
        success: function (data, textStatus, jqXHR) {
            alert("userIndex");
            if(data != undefined){
                if(data.code === 200){
                    userList(data);
                }else{
                    alert("验证错误,请重新登录");
                }
            }else{
                alert("获取好友列表异常，请稍后再试");
            }
        },
        error: function (data, textStatus, jqXHR) {
            alert("服务器异常，请稍后再试");
        }
    });
}