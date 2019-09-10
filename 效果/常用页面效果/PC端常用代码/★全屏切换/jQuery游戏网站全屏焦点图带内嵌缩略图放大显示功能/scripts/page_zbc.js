var glb={
    tag:function(p,o){return p.getElementsByTagName(o);},
    now:0,
    hash:{
		 last:"",
		 get:function(){
		    return window.location.hash.replace(/[^a-zA-Z0-9_-]/g,'')||(window.location.href.indexOf("#")>-1?"":"index");
		 },
		  init:function(scope){
		    var that=this,hdl=window[scope],
		    fx=function(){
		      var h=that.get(),arr=h.split("-");
		      if(h&&that.last!=h&&hdl[arr[0]]){
		        hdl[arr[0]](arr[1],arr[2],arr[3]);
		        that.last=h;
		      }
		};
		hdl["init"]?hdl["init"]():0;
		setInterval(fx,60);
		}
	}
},
move = function(vid,e,cnt,sty){
	var ab={
		obj:g(vid),
		mlen:cnt
	},
	nowtop=e*ab.mlen,
	af={
		mv:function(t, b, c, d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		run:function(t, b, c, d){
			t++;
		    (sty=="top")?(ab.obj.style.top = -Math.ceil(af.mv(t, b, c, d)) + "px"):(ab.obj.style.left = -Math.ceil(af.mv(t, b, c, d)) + "px");
		    if (t < d) {
		        setTimeout(function() {
		            af.run(t, b, c, d)
		        },
		        10);
		    } 
		},
		go:function(){
			var b,c;
		   	(sty=="top")?(b = Math.abs(parseInt(ab.obj.style.top))):(b = Math.abs(parseInt(ab.obj.style.left)));
		    if (!b) {
		        b = 0
		    };
		    c = nowtop - b;
		    af.run(0, b, c, 40);
		}
	},
	s=af.go();
},
movebg = function(vid,pre,nx,y){
	var ab={
		obj:g(vid),
		nownum:1
	},
	af={
		mv:function(t, b, c, d){
			(pre>nx)?"":ab.nownum=-1;
			return (t==d) ? b+c : c * (ab.nownum*Math.pow(2, -10 * t/d) + 1) + b;
		},
		run:function(t, b, c, d){
			t++;
		   (y==0)?(ab.obj.style.backgroundPosition = Math.ceil(af.mv(t, b, c, d)) + "% 0"):(ab.obj.style.backgroundPosition = Math.ceil(af.mv(t, b, c, d)) + "% 380px");
		    if (t < d) {
		        setTimeout(function() {
		            af.run(t, b, c, d)
		        },
		        10);
		    } 
		}
	},
	s=af.run(-25, 0, 50, 25);
},
emove=function(e,v){
	var sw = glb.tag(g("menu"), "a");
	sw[e].className = "";
	sw[v].className = "curr";
	g("wrap-page"+e).style.display="none";
	g("wrap-page"+v).style.display="block";
	g("mainer2-page"+v).style.left="-1000px";
	movebg("wrap-page"+v,e,v,0);
	movebg("wrapinner-page"+v,e,v,1);
	move("mainer2-page"+v,1,0,"left");
	if(v==0){g("prevLink").style.display="none";
	}else{g("prevLink").style.display="block";}
	if(v==2){g("nextLink").style.display="none";}else{g("nextLink").style.display="block";}
	pgvSendClick({hottag:'act.a20130425aram.menu.page'+v});
},
swap=function(o) {
	var sw = glb.tag(g(o), "a"),ordin=0;
	len=sw.length;
	for (var i = len; i--;) {
		sw[i].count = i;
		sw[i].onclick = function() {
			sw[ordin].className = "";
			sw[this.count].className = "curr";
			move("guideInner",this.count,660,"top");
			ordin=this.count;
			return false;
		};
	}
	g("prevLink").onclick=function(){
		if(glb.now>0){
			emove(glb.now,glb.now-1);
			glb.now--;
		}
    	pgvSendClick({hottag:'act.a20130425aram.move.prevlink'});
	}
	g("nextLink").onclick=function(){
		if(glb.now<2){
			emove(glb.now,glb.now+1);
			glb.now++;
		}
    	pgvSendClick({hottag:'act.a20130425aram.move.nextlink'});
	}
},
showd=function(o){
	need("biz.dialog",function(Dialog){
		Dialog.show({
		id:o,
		bgcolor:"#000",
		isNoAccessible:true,
		opacity:90
		});
	});
},
/*hidDialogs=function(){
	g("popVodBox").innerHTML="";
	need("biz.dialog",function(Dialog){Dialog.hide();});return;
},*/
/*videoPlayer=function(){
	showd('popVod');
    var video = new tvp.VideoInfo();
    video.setVid("u0012stjkh2");
    var player = new tvp.Player(763,474);
    player.setCurVideo(video);
    player.addParam("adplay","0");
    player.addParam("flashskin","http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");
    player.write("popVodBox");
    pgvSendClick({hottag:'act.a20130425aram.video'});
},*/
imgshow=function(o,cnt){
	var ma = glb.tag(g(o), "a"),mg = glb.tag(g(o), "img"),ordin=0,ssrc,surl,
	put=function(c){
		g("popPrev").className="pop-prev";
		g("popNext").className="pop-next";
		ssrc=mg[c].getAttribute("src");
		surl=ssrc.split(".jpg")[0];
		g("popImgBox").innerHTML='<img src="'+surl+'-big.jpg" width="760" height="580">';
		ordin=c;
	};
	showd("popImg");
	put(cnt);
	g("popPrev").onclick=function(){
		if(ordin>0){
			put(ordin-1);
		}else{
			this.className="pop-prev pop-not";
		}
	}
	g("popNext").onclick=function(){
		if(ordin<ma.length-1){
			put(ordin+1)
		}else{
			this.className="pop-next pop-not";
		}
	}
},
Page = {
    "intro": function() {emove(glb.now,0);glb.now = 0;},
    "feature": function() {emove(glb.now,1);glb.now = 1;},
    "guide": function() {emove(glb.now,2);glb.now = 2;},
    "happy":function(){}
};
/*  |xGv00|285619eef3133bbd3ec91cd061a01690 */