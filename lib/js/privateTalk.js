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


        }
    }
});

