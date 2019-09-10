milo.string.isEmpty = function(s) {
    return !s || s == "";
}



var Global = Global || {};
Global.TotalPage = 11;
Global.TotalQues = 12;
Global.NowPage = 1;
Global.MaxPage = 1;
Global.CanDoNext = false;
Global.Changing = false;


Global.MultiData = [
    [],
    [false, false, false, false, false, false, false]
];
Global.SingleData = [];
Global.Data = {
    multiMap: {},
    singleMap: {
        1: 2,
        2: 3,
        3: 7,
        4: 7,
        5: 6,
        6: 4,
        7: 4,
        8: 2,
        9: 6,
        10: 7,
        11: 5
    },
    textMap: {
        12: 1
    }
}
Global.GenerateMulti = function(i) {
    var arr = Global.MultiData[i];
    var ret = "";
    for (var j = 1; j <= 6; j++) {
        if (arr[j])
            ret += "_" + j;
    }
    if (milo.string.isEmpty(ret))
        return "";
    return ret.substr(1);
}
Global.UpdateSingle = function(i) {
    var t = Global.SingleData[i];
    if (!t)
        t = 0;
    for (var j = 1; j <= Global.Data.singleMap[i]; j++) {
        $(".question" + i + "a_" + j).parent("li").removeClass("current");
    }
    $(".question" + i + "a_" + t).parent("li").addClass("current");
}
Global.UpdateMulti = function(i) {
    for (var j = 1; j <= Global.Data.multiMap[i]; j++) {
        if (Global.MultiData[i][j])
            $(".question" + i + "a_" + j).parent("li").addClass("current");
        else
            $(".question" + i + "a_" + j).parent("li").removeClass("current");
    }
}
Global.SubmitSingle = function(i, t) {
    Global.SingleData[i] = t;
    var uf = "user_field" + i;
    Global.UpdateSingle(i);
    var subobj = {};
    subobj[uf] = t;
    Global.CanDoNext = true;
    changeTab(i + 1);
}
Global.SubmitMulti = function(i, t) {
    Global.MultiData[i][t] = !Global.MultiData[i][t];
    var uf = "user_field" + i;
    Global.UpdateMulti(i);
    var v = Global.GenerateMulti(i);
    var subobj = {};
    subobj[uf] = v;
}

need(["util.jquery"], function() {
    initBind();
    changeTab(1);

    Global.init = true;

});


function changeTabDelta(delta) {
    changeTab(Global.NowPage + delta);
}

function changeTab(tab) {
    if (Global.Changing)
        return;
    if (tab > Global.MaxPage && !Global.CanDoNext) {
        alert("请先答完当前问题！");
        return;
    }
    if (tab < 1) {
        alert("前面没有问题了！");
        return;
    }
    Global.CanDoNext = false;
    if (tab == Global.TotalQues) {
        $('#popup_phone1').show();
    } else {
        $(".question" + Global.NowPage).css("display", "none");
        $(".question" + tab).css("display", "block");
        Global.NowPage = tab;
    }
    if (tab > Global.MaxPage)
        Global.MaxPage = tab;
}

// 表单验证
function submit() {
    var obj, t, cansubmit = true;
    obj = $(".input_phone");
    t = $(obj).attr("value");
    if (milo.string.isEmpty(t) || !milo.string.isMobile(t)) {
        $(".tip_phone").css("display", "block");
        cansubmit = false;
    } else {
        $(".tip_phone").css("display", "none");
        var uf = "user_field12";
        var subobj = {};
        subobj[uf] = t;
    }
    obj = $(".input_name");
    t = $(obj).attr("value");
    if (milo.string.isEmpty(t) || !milo.string.isChinese(t) || milo.string.getChineseNum(t) < 2 || milo.string.getChineseNum(t) > 5) {
        $(".tip_name").css("display", "block");
        cansubmit = false;
    } else {
        $(".tip_name").css("display", "none");
        var uf = "user_field13";
        var subobj = {};
        subobj[uf] = t;
    }
    if (!cansubmit)
        return;
}

function checkMulti(i) {
    if (milo.string.isEmpty(Global.GenerateMulti(i))) {
        alert("请选择至少一个选项！");
        return;
    }
    changeTab(i + 1, true);
}

function initBind() {
    var multiMap = Global.Data.multiMap;
    var singleMap = Global.Data.singleMap;
    var textMap = Global.Data.textMap;
    for (var i in multiMap) {
        for (var j = 1; j <= multiMap[i]; j++){
            $(".question" + i + "a_" + j).attr("href", "javascript:Global.SubmitMulti(" + i + ", " + j + ");");
        }
    }
    for (var i in singleMap) {
        for (var j = 1; j <= singleMap[i]; j++){
            $(".question" + i + "a_" + j).attr("href", "javascript:Global.SubmitSingle(" + i + ", " + j + ");");
        }
    }
    for (var i = 1; i <= Global.TotalPage; i++) {
        $(".q" + i).attr("href", "javascript:changeTab(" + i + ");");
    }
}

function hides(id) {
    $(id).hide();
}
