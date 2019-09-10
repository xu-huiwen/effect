//统计
if(typeof(pgvMain) == 'function')pgvMain();

 // 隐藏标题栏
window.scrollTo(0, 1);

//阻止默认事件
var defaultEvent = function(e) {
	e.preventDefault();
}
document.documentElement.addEventListener('touchmove', defaultEvent);

//微信分享
function onBridgeReady() {
	var mainTitle = "",
		mainDesc = "",
		mainURL = "",
		mainImgUrl = "images/share.png";
	//转发朋友圈
	WeixinJSBridge.on("menu:share:timeline", function(e) {
		var data = {
			img_url: mainImgUrl,
			img_width: "120",
			img_height: "120",
			link: mainURL,
			//desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
			desc: mainDesc,
			title: mainTitle
		};
		WeixinJSBridge.invoke("shareTimeline", data, function(res) {
			WeixinJSBridge.log(res.err_msg)
		});
	});
	//同步到微博
	WeixinJSBridge.on("menu:share:weibo", function() {
		WeixinJSBridge.invoke("shareWeibo", {
			"content": mainDesc,
			"url": mainURL
		}, function(res) {
			WeixinJSBridge.log(res.err_msg);
		});
	});
	//分享给朋友
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		WeixinJSBridge.invoke("sendAppMessage", {
			img_url: mainImgUrl,
			img_width: "120",
			img_height: "120",
			link: mainURL,
			desc: mainDesc,
			title: mainTitle
		}, function(res) {
			WeixinJSBridge.log(res.err_msg)
		});
	});
};
//执行
try {
	document.addEventListener('WeixinJSBridgeReady', function() {
		onBridgeReady();
	});
} catch (e) {};

//弹窗
function gE(e) {
	return document.querySelector(e)
}

function pop(e) {
	if (!gE('#pop-mask')) {
		gE(e).style.display = "block";
		var popH = gE(e).offsetHeight,
			popW = gE(e).offsetWidth;
		gE(e).style.cssText = "position:fixed;left:50%;display:block;top:50%;z-index:999;"+"margin-left:-"+popW/2+"px;"+"margin-top:-"+popH/2+"px;"
		var bgObj = document.createElement("div");
		bgObj.setAttribute('id', 'pop-mask');
		document.body.appendChild(bgObj);
		var conH = document.body.scrollHeight,
			viewH = document.documentElement.clientHeight;
		if (conH > viewH) {
			gE('#pop-mask').style.height = conH + "px";
		} else {
			gE('#pop-mask').style.height = viewH + "px";
		}
		hidePop(e);
	}
}

function hidePop(e) {
	gE('#pop-mask').addEventListener('click', function() {
		gE(e).style.display = "none";
		var bgObj = gE("#pop-mask");
		document.body.removeChild(bgObj);
	});
}

//横竖屏判断
window.addEventListener('load', function() {
	checkDirect();
});
var checkDirect = function() {
    if (document.body.clientWidth > document.body.clientHeight) {
        document.querySelector('.mask').style.display = 'block';
    } else {
       document.querySelector('.mask').style.display = 'none';
    }
}
var evt = "onorientationchanged" in window ? "orientationchanged" : "resize";
window.addEventListener(evt, checkDirect, false);

//图片预加载
var rateNum = document.querySelector('.loading-num'),
	imgPath = "images/",
	sourceArr = ['share.png'];
for (var i = 0; i < sourceArr.length; i++) {
	sourceArr[i] = imgPath + sourceArr[i] ;
};
var loadImage = function(path, callback) {
	var img = new Image();
	img.onload = function() {
		img.onload = null;
		callback(path);
	}
	img.src = path;
}
var imgLoader = function(imgs, callback) {
	var len = imgs.length,
		i = 0;
	while (imgs.length) {
		loadImage(imgs.shift(), function(path) {
			callback(path, ++i, len);
		});
	}
}
imgLoader(sourceArr, function(path, curNum, total) {
	var percent = curNum / total
	rateNum.innerHTML = Math.floor(percent * 100);
	if (percent == 1) {
		setTimeout(showPage, 500);
	}
});

var showPage = function() {
	document.querySelector(".loading").parentNode.removeChild(document.querySelector(".loading"));
	document.addEventListener('DOMContentLoaded', function(){
    	document.documentElement.style.height = window.innerHeight + 'px';
	});
	
	// 主体切换
	slide = new m.Tab({
		target: document.querySelectorAll('.slide .item'),
		touchMove: true,
		direction: 'y',
		lazyClass: 'lazy',
		onchange: function(i) {
			var items = document.querySelectorAll('.slide .item');
			for (n=0;n<items.length;n++) {
				items[n].classList.remove('play');
			}
			items[i].classList.add('play');
		}
	});
	
//	slide.playTo(5);
}