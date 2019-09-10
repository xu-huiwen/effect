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

//����json
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

//��ʼ��ҳ��ĵ����Ľṹ
function initTemplateHtml() {
    //��Ⱦͷͼ
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
//��ʼ��ҳ����¼�
function initTemplateEvent(){
    if(typeof(pgvMain) == 'function')pgvMain({statIframe: true});
    if(!popup.isMobile()) {PTTSendClick('useragent','pc','PC����');}
    else{PTTSendClick('useragent','mobile','�ƶ��˷���');}

    popup.on(popup.$("tabBd"), "click", popup.bind(this, pttClick));
    new Tab(popup.$("popup"),popup.getUrlParam("tabId")); //ѡ���ʼ��
}
//��ʼ�������¼�
function initCommonEvent() {
    document.domain = "qq.com";
    //��¼
    milo.addEvent(g("dologin"), "click", function() {
        need("biz.login",function(LoginManager){
            LoginManager.init({
                needReloadPage:false
            });
            LoginManager.login(function(){
                g("login_qq_span").innerHTML = LoginManager.getUserUin();//��ȡQQ��

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
                g("login_qq_span").innerHTML = LoginManager.getUserUin();//��ȡQQ��

                document.getElementById('unlogin').style.display="none";
                document.getElementById('logined').style.display="block";

                loginCallBack();
            });
        });
    });

    window['no_webtips_flag'] = true;

    // ����
    window.TGDialogS = function(e){
        need("biz.dialog",function(Dialog){
            Dialog.show({
                id:e,
                bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
                opacity:70 //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
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
    // window.iMyListId = 373021;    //�ҵ����ID
    // �Ѿ�Ǩ�Ƶ�bridgeTpl.js�У���ȥ���ļ��޸ı���ֵ

    //�޸İ󶨴���ID����ӦAMS
    $("#spanNotBind").attr("id","spanNotBind_"+iInitAreaId);
    $("#spanBind").attr("id","spanBind_"+iInitAreaId);
    $("#area_info").attr("id","area_info_"+iInitAreaId);
    $("#role_info").attr("id","role_info_"+iInitAreaId);

    // ��¼��ص�  ��ѯ�󶨴���/��ѯ�û����� 
    function loginCallBack(){
        // ��ʼ���󶨴���
        amsInit(iActivityId, iInitAreaId);

        // ��ʼ�����Զ�������
        // amsSubmit(iActivityId,373993)
    }

    // �󶨴�������
    window.showSelectZone = function(){
        need("biz.login",function(LoginManager){
            LoginManager.checkLogin(function(){
                amsInit(iActivityId, iBindAreaId);
            }, function(){
                LoginManager.init({
                    needReloadPage:false
                });
                LoginManager.login(function(){
                    g("login_qq_span").innerHTML = LoginManager.getUserUin();//��ȡQQ��
                     
                    loginCallBack();
                });        
            });
        });
    }

    //��ѯ�Ƿ�󶨵�����
    amsCfg_initArea={
        type : "query",
        iQueryFlowID:iInitAreaId,
        service:"codo" ,
        success : function(bindedInfo){
            //�Ѱ�ʱ����չ����

        },
        failure : function(){
            //δ��ʱ����չ����
        }
    };

    var amsCfg_initArea_tmp = "amsCfg_"+iInitAreaId+"=amsCfg_initArea;"; // amsCfg_373024
    eval(amsCfg_initArea_tmp);

    //�ύ�󶨵�����
    amsCfg_bindArea={
        type : "comit",
        iQueryFlowID:iInitAreaId,
        service:"codo" ,
        success : function(bindedInfo){
            //�Ѱ�ʱ����չ����
            alert("��ϲ�������Ѿ��ɹ�����Ϸ������");

            // setTimeout("window.location.reload()",2000);
        },
        failure : function(){
            //δ��ʱ����չ����
        }
    };

    var amsCfg_bindArea_tmp = "amsCfg_"+iBindAreaId+"=amsCfg_bindArea;"; // amsCfg_373024
    eval(amsCfg_bindArea_tmp);

    // �ҵ�����رն���
    window.giftDialogHide = function(){
        need("biz.dialog",function(Dialog){
            Dialog.hide();
        });
    }
     
    // ���˻񽱼�¼��ʼ��
    amsCfg_myList = {
        'iAMSActivityId' : iActivityId, // AMS���
        'iLotteryFlowId' : iMyListId, //  ��ѯ���ֲ������̺�
        'activityId' : iLotteryId, // ģ��ʵ����
        'isForce' : true,
        'contentId' : 'getGiftContent', //����ID
        'templateId' : 'getGiftTemplate', //ģ��ID
        'contentPageId' : 'getGiftPageContent', //��ҳ����ID
        'showContentId' : 'showMyGiftContent' //������ID
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
//��ʼ�齱flash->js
    window.callJsToStart16 = function(){
        //alert("�齱ʧ��");
        //SWFOBJ.reset();
        callFlashToRoll16(3);
        //PTTSendClick('lottery','start','��ʼ�齱');   164 411 616
    }
//������ó齱��� ֪ͨflash��ʼ����Ч�� js->flash
    window.callFlashToRoll16 = function(id){
        //֪ͨת��ת����Ӧ���н���Ʒ��id ����Ŵ�0,1,2.....����Ч�����ߵ�˳�򣬶�Ӧ���������н�Ʒ��Ч��λ�� ��id=0 ��Ӧ��ʾ��19_16��λ�ã�
        if(SWFOBJ16)SWFOBJ16.stopRoll(id);
        PTTSendClick('lottery','award'+id,'��Ʒ');
    }
//3��flash�������֪ͨjs  flash->js
    window.callJsToComplete16 = function(){
        PTTSendClick('lottery','complete','�齱���');
        alert('��ϲ���ô�Ӵ����');
    }
    window.SWFOBJ16= new Lottery({
        'lighturl':'http://game.gtimg.cn/images/codo/2017/atemple/img/sel.png',//�ⲿ��Ȧpng  ����д����Ĭ�ϵ�Ч��
        'width':826,//flash ��� 79 157 235
        'height':395,//flash �߶�
        'total':16,//�齱��Ʒ������
        'sbtnx':274,// ��ʼ�齱��ť��λ��x����
        'sbtny':128 ,// ��ʼ�齱��ť��λ��y����  146 283 420 557 694
        'sbtnw':275,// ��ʼ�齱��ť�Ŀ��
        'sbtnh':129,// ��ʼ�齱��ť�ĸ߶� 166 331 496 661
        'boxw':136,// ��Ʒ��Ч�Ŀ��
        'boxh':127,//��Ʒ��Ч�ĸ߶�
        'position':"1_1,138_1,275_1,412_1,549_1,686_1,1_129,138_129,549_129,686_129,1_257,138_257,275_257,412_257,549_257,686_257",
        'contentId' : 'lotteryBox16',
        'onClickRollEvent' : callJsToStart16,
        'onCompleteRollEvent':callJsToComplete16
    });
}

}