if(!getUrlParam("debug")){
	initTemplateHtml();
	initTemplateEvent();
	initLotteryEvent();
	initCommonEvent();
}else{
	setTimeout(function(){
	initTemplateHtml();
	initTemplateEvent();
	initLotteryEvent();
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
function initLotteryEvent(){
// Encoding: GBK

if(document.getElementById('lotteryBox16')) {
//开始抽奖flash->js
    window.callJsToStart16 = function(){
        //alert("抽奖失败");
        //SWFOBJ.reset();
        callFlashToRoll16(3);
        //PTTSendClick('lottery','start','开始抽奖');   164 411 616
    }
//开发获得抽奖结果 通知flash开始播放效果 js->flash
    window.callFlashToRoll16 = function(id){
        //通知转盘转到对应的中奖产品的id （序号从0,1,2.....沿着效果光走的顺序，对应下面配置中奖品光效的位置 如id=0 对应显示在19_16的位置）
        if(SWFOBJ16)SWFOBJ16.stopRoll(id);
        PTTSendClick('lottery','award'+id,'奖品');
    }
//3、flash动画完成通知js  flash->js
    window.callJsToComplete16 = function(){
        PTTSendClick('lottery','complete','抽奖完成');
        alert('恭喜你获得大奖哟！！');
    }
    window.SWFOBJ16= new Lottery({
        'lighturl':'http://game.gtimg.cn/images/codo/2017/atemple/img/sel.png',//外部光圈png  不填写就用默认的效果
        'width':826,//flash 宽度 79 157 235
        'height':395,//flash 高度
        'total':16,//抽奖产品的总数
        'sbtnx':274,// 开始抽奖按钮的位置x坐标
        'sbtny':128 ,// 开始抽奖按钮的位置y坐标  146 283 420 557 694
        'sbtnw':275,// 开始抽奖按钮的宽度
        'sbtnh':129,// 开始抽奖按钮的高度 166 331 496 661
        'boxw':136,// 奖品光效的宽度
        'boxh':127,//奖品光效的高度
        'position':"1_1,138_1,275_1,412_1,549_1,686_1,1_129,138_129,549_129,686_129,1_257,138_257,275_257,412_257,549_257,686_257",
        'contentId' : 'lotteryBox16',
        'onClickRollEvent' : callJsToStart16,
        'onCompleteRollEvent':callJsToComplete16
    });
}

}