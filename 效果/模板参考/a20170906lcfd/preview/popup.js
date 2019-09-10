var isWTMobile = 0;
if(/iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent)){
  var isWTMobile = 1;
}else if(/Awesomium/i.test(navigator.userAgent)){
  var isWTMobile = 3;
}else{
  var isWTMobile = 2;
} 

if(/cfapp/i.test(navigator.userAgent)){
  var isWTMobile = 4;
}


if(!getUrlParam("debug")){
	initTemplateHtml();
	initTemplateEvent();
	initCommonEvent();
}else{
	setTimeout(function(){
	initTemplateHtml();
	initTemplateEvent();
	},10)
}
<!-- Encoding: GBK -->

//解析json
function formatJson(str,data){
    var fn = !/\W/.test(str)?
        formatJson(document.getElementById(str).innerHTML) :
        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" +str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") + "');}return p.join('');");
    return data ? fn( data ) : fn;
}

//初始化页面的弹窗的结构
function initTemplateHtml() {
    //渲染头图
    $('#tabFocus').attr('src',window.tabFocusImg);
    var navHtml = '';
    var recordHtml = '';
    for(var i=0; i<popupJson.length; i++){
        recordHtml += formatJson($('#temple'+i).html(),{data:popupJson[i]});
        navHtml += formatJson($('#templeNav').html(),{data:popupJson[i]});
    }
    $('#recordDom').html(recordHtml);
    $('#navDom').html(navHtml);
}
//初始化页面的事件
function initTemplateEvent(){
    if(typeof(pgvMain) == 'function')pgvMain({statIframe: true});
    if(!popup.isMobile()) {PTTSendClick('useragent','pc','PC访问');}
    else{PTTSendClick('useragent','mobile','移动端访问');}

    popup.on(popup.$("tabBd"), "click", popup.bind(this, pttClick));
    new Tab(popup.$("popup"),popup.getUrlParam("tabId")); //选项卡初始化
}
//初始化公共事件
function initCommonEvent() {
    document.domain = "qq.com";
    //登录
    milo.addEvent(g("dologin"), "click", function() {
        need("biz.login",function(LoginManager){
            LoginManager.init({
                needReloadPage:false
            });
            LoginManager.login(function(){
                g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号

                loginCallBack();
            });
        });
        return false;
    });

    milo.addEvent(g("dologout"), "click", function() {
        need("biz.login",function(LoginManager){
            if(_isMobile_()){
                LoginManager.logout();
                setTimeout(function(){ window.location.reload();},1000)
            }else{
                LoginManager.logout();
            }
        });
        return false;
    });

    milo.ready(function() {
        need("biz.login",function(LoginManager){
            LoginManager.checkLogin(function(){
                g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号

                document.getElementById('unlogin').style.display="none";
                document.getElementById('logined').style.display="block";

                loginCallBack();
            });
        });
    });

    window['no_webtips_flag'] = true;

    // 弹窗
    window.TGDialogS = function(e){
        need("biz.dialog",function(Dialog){
            Dialog.show({
                id:e,
                bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
                opacity:70 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
            });
        });
    }

    window.closeDialog = function(){
        need("biz.dialog",function(Dialog){
            Dialog.hide();
        });
    }
     
    window.alert = function(s){
        TGDialogS('showAlert');
     
        document.getElementById('showAlertContent').innerHTML = s;

        if(document.getElementById('lotteryBox6'))
            SWFOBJ6.enable();
        if(document.getElementById('lotteryBox8'))
            SWFOBJ8.enable();
        if(document.getElementById('lotteryBox9'))
            SWFOBJ9.enable();
        if(document.getElementById('lotteryBox10'))
            SWFOBJ10.enable();
        if(document.getElementById('lotteryBox12'))
            SWFOBJ12.enable();
        if(document.getElementById('lotteryBox15'))
            SWFOBJ15.enable();
        if(document.getElementById('lotteryBox16'))
            SWFOBJ16.enable();
        if(document.getElementById('lotteryBox18'))
            SWFOBJ18.enable();
        if(document.getElementById('lotteryBox20'))
            SWFOBJ20.enable();
        if(document.getElementById('lotteryBox24'))
            SWFOBJ24.enable();
    }

    // window.iActivityId = 114372;
    // window.iBindAreaId = 373024;
    // window.iInitAreaId = iBindAreaId + 1;
    // window.iLotteryId = 176720;
    // window.iMyListId = 373021;    //我的礼包ID
    // 已经迁移到bridgeTpl.js中，请去该文件修改变量值

    //修改绑定大区ID以适应AMS
    $("#spanNotBind").attr("id","spanNotBind_"+iInitAreaId);
    $("#spanBind").attr("id","spanBind_"+iInitAreaId);
    $("#area_info").attr("id","area_info_"+iInitAreaId);
    $("#role_info").attr("id","role_info_"+iInitAreaId);

    // 登录后回调  查询绑定大区/查询用户数据 
    function loginCallBack(){
        // 初始化绑定大区
        amsInit(iActivityId, iInitAreaId);

        // 初始化的自定义流程
        // amsSubmit(iActivityId,373993)
    }

    // 绑定大区动作
    window.showSelectZone = function(){
        need("biz.login",function(LoginManager){
            LoginManager.checkLogin(function(){
                amsInit(iActivityId, iBindAreaId);
            }, function(){
                LoginManager.init({
                    needReloadPage:false
                });
                LoginManager.login(function(){
                    g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号
                     
                    loginCallBack();
                });        
            });
        });
    }

    //查询是否绑定的配置
    amsCfg_initArea={
        type : "query",
        iQueryFlowID:iInitAreaId,
        service:"codo" ,
        success : function(bindedInfo){
            //已绑定时的扩展处理

        },
        failure : function(){
            //未绑定时的扩展处理
        }
    };

    var amsCfg_initArea_tmp = "amsCfg_"+iInitAreaId+"=amsCfg_initArea;"; // amsCfg_373024
    eval(amsCfg_initArea_tmp);

    //提交绑定的配置
    amsCfg_bindArea={
        type : "comit",
        iQueryFlowID:iInitAreaId,
        service:"codo" ,
        success : function(bindedInfo){
            //已绑定时的扩展处理
            alert("恭喜您，您已经成功绑定游戏大区！");

            // setTimeout("window.location.reload()",2000);
        },
        failure : function(){
            //未绑定时的扩展处理
        }
    };

    var amsCfg_bindArea_tmp = "amsCfg_"+iBindAreaId+"=amsCfg_bindArea;"; // amsCfg_373024
    eval(amsCfg_bindArea_tmp);

    // 我的礼包关闭动作
    window.giftDialogHide = function(){
        need("biz.dialog",function(Dialog){
            Dialog.hide();
        });
    }
     
    // 个人获奖记录初始化
    amsCfg_myList = {
        'iAMSActivityId' : iActivityId, // AMS活动号
        'iLotteryFlowId' : iMyListId, //  查询获奖轮播的流程号
        'activityId' : iLotteryId, // 模块实例号
        'isForce' : true,
        'contentId' : 'getGiftContent', //容器ID
        'templateId' : 'getGiftTemplate', //模板ID
        'contentPageId' : 'getGiftPageContent', //分页容器ID
        'showContentId' : 'showMyGiftContent' //弹出层ID
    };

    var amsCfg_myList_tmp = "amsCfg_"+iMyListId+"=amsCfg_myList;"; // amsCfg_373024
    eval(amsCfg_myList_tmp);

    window.showMyGiftList = function(){
        amsSubmit(iActivityId,iMyListId);
    }


}

amsCfg_398479 = amsCfg_398490 = {
    'iAMSActivityId' : '122991', // AMS活动号
    'activityId' : '185245', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        LotteryManager.alert(callbackObj.sMsg);
    }
}