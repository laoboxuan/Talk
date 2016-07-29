/**
 * Created by Administrator on 2016/7/25 0025.
 */



$(document).ready(function(){
    var url = window.document.URL;
    var urlData = url.split("?")[1];
    var nickNameSelf = "";
    var token = "";
    var nickNameSession = $.session.get('nickName');
    var tokenSession = $.session.get('token');

    if(urlData === undefined){
        window.location.href = "http://localhost:1335/login";
    }
    if(urlData != undefined){

        var paramDataList = urlData.split("&");

        nickNameSelf = paramDataList[0].split("=")[1];
        token = paramDataList[1].split("=")[1];
        if(nickNameSelf != nickNameSession || token != tokenSession){
            window.location.href = "http://localhost:1335/login";
        }else{

            var socket = io.connect('http://localhost:8000');//socket连接地址
            socket.on('connect',function() {//socket连接成功
                $("userIndex_online").empty();
                //初始化表格
                var selfData = [
                    [nickNameSelf,"1","自己"]
                ];
                $('#userIndex').html( '<table width="490px" id="tableTemp"></table>' );
                $('#tableTemp').dataTable( {
                    "data": selfData,
                    "columns": [
                        { "title": "nickName" },
                        { "title": "status" },
                        { "title": "talk" }
                    ]
                } );
            });
            socket.emit('login',nickNameSession,tokenSession);
            socket.emit('getOnlineUser');
            socket.on('userIndexUserList',function(userList,onlineUserList){
                $.session.set('userList',userList);
                $.session.set('onlineUserList',onlineUserList);
                if(userList.length>0){
                    $("userIndex_online").append("在线人数:" + onlineUserList.length);
                    inputEachUser(userList,onlineUserList);
                }
                else{
                    $("#spnLoad").html("<font color=green>暂时无在线用户！</font>");
                }
            });

            socket.on('userIndexUserListUpdate',function(nickName,status){
                alert("userIndexUserListUpdate");
                var userList = $.session.get('userList');
                var onlineUserList = $.session.get('onlineUserList');
                if(status === 1){
                    onlineUserList.push(nickName);
                    $.session.set('onlineUserList',onlineUserList);
                    inputEachUser(userList,onlineUserList);
                }
                if(status === 0){
                    var indexNum = onlineUserList.indexOf(nickName);
                    if(indexNum != -1){
                        onlineUserList.splice(indexNum,1);
                        $.session.set('onlineUserList',onlineUserList);
                        inputEachUser(userList,onlineUserList);
                    }
                }
            });
        }
    }
});


function inputEachUser(userList,onlineUserList){

    var userList = userList;
    var onlineUserList = onlineUserList;
    var dataStr = [];
    for(var i in userList){
        dataStr[i] = [];
        dataStr[i][0] = userList[i];
        dataStr[i][1] = 0;
        dataStr[i][2] = '<a href = /privateTalk.html?friendNickName=' + userList[i] + '>聊天</a>';
        if(onlineUserList.indexOf(userList[i]) != -1){
            dataStr[i][1] = 1;
        }
    }
    $('#template').dataTable().fnClearTable();
    $('#template').dataTable().fnAddData(dataStr);
    //$.each(userList,function(index){
    //    var row=$("#template").clone();//克隆一份模板
    //    row.find("#nickName").html(userList[index]);//替换标记内容
    //    if(onlineUserList.indexOf(userList[index]) === -1){
    //        row.find("#status").html("离线");
    //    }
    //    if(onlineUserList.indexOf(userList[index]) != -1){
    //        row.find("#status").html("在线");
    //    }
    //
    //    var friendName = userList[index];
    //    row.find("#privateTalk").html('<a href = /privateTalk.html?friendNickName=' + friendName + '>聊天</a>');
    //    row.attr("id",index);//改变行的Id
    //    row.appendTo("#tableTemp");//添加到模板的容器中
    //});
    //$("#template").css("display","none");//隐藏行模块
    //$("#trLoad").css("display","none");//隐藏提示行模块

    //tableTemp
};

var dataSet01 = [
    ['dataSet01','Internet Explorer 4.0','Win 95+','4','X'],
    ['dataSet01','Internet Explorer 5.0','Win 95+','5','C'],
    ['dataSet01','Internet Explorer 5.5','Win 95+','5.5','A'],
    ['dataSet01','Internet Explorer 6','Win 98+','6','A'],
    ['dataSet01','Internet Explorer 7','Win XP SP2+','7','A'],
    ['dataSet01','AOL browser (AOL desktop)','Win XP','6','A'],
    ['dataSet01','Firefox 1.0','Win 98+ / OSX.2+','1.7','A'],
    ['dataSet01','Firefox 1.5','Win 98+ / OSX.2+','1.8','A'],
    ['dataSet01','Firefox 2.0','Win 98+ / OSX.2+','1.8','A'],
    ['dataSet01','Firefox 3.0','Win 2k+ / OSX.3+','1.9','A'],
    ['dataSet01','Camino 1.0','OSX.2+','1.8','A'],
    ['dataSet01','Camino 1.5','OSX.3+','1.8','A'],
    ['dataSet01','Netscape 7.2','Win 95+ / Mac OS 8.6-9.2','1.7','A'],
    ['dataSet01','Netscape Browser 8','Win 98SE+','1.7','A'],
    ['dataSet01','Netscape Navigator 9','Win 98+ / OSX.2+','1.8','A'],
    ['dataSet01','Mozilla 1.0','Win 95+ / OSX.1+',1,'A'],
    ['dataSet01','Mozilla 1.1','Win 95+ / OSX.1+',1.1,'A'],
    ['dataSet01','Mozilla 1.2','Win 95+ / OSX.1+',1.2,'A'],
    ['dataSet01','Mozilla 1.3','Win 95+ / OSX.1+',1.3,'A']
];