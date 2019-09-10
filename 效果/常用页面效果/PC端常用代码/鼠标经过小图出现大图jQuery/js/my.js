/* 鼠标经过小图出现大图 */
this.imagePreview = function(){	
	/* CONFIG */
		
		xOffset = 100;
		yOffset = 20;
		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
		
	/* END CONFIG */
	$("a.preview").hover(function(e) {
			this.t = this.title;
			this.title = "";
			var c = (this.t != "") ? "<br/>" + this.t : "";
			$("body").append("<p id='preview'><img src='" + this.href + "' alt='Image preview' />" + c + "</p>");
			$("#preview")
				.css("top", (e.pageY - xOffset) + "px")
				.css("left", (e.pageX + yOffset) + "px")
				.fadeIn("fast");
		},
		function() {
			this.title = this.t;
			$("#preview").remove();
		});
	$("a.preview").mousemove(function(e){
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});
	$("a.preview").click(function(){
		return false;
	});	
	/* 左边显示 */	
	$("a.preview-left").hover(function(e){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<p id='preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</p>");								 
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX - 420) + "px")
			.fadeIn("fast");						
    },
	function(){
		this.title = this.t;	
		$("#preview").remove();
    });	
	$("a.preview-left").mousemove(function(e){
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX - 420) + "px");
	});		
};

imagePreview();

/* 微博 */
function postToWb(){
	var _zt="%23"+encodeURI("乐斗帮派宝贝大比拼")+"%23"
	var _t = encodeURI("我在")+_zt+encodeURI("给她投了宝贵的一票，你也来给你的帮派宝贝投上一票吧！");
	var _url = encodeURIComponent(document.location);
	var _appkey = encodeURI("4df3051760024dd6ab9ba2511c022cf2");//你从腾讯获得的appkey
	var _pic = encodeURI('');//（例如：var _pic='图片url1|图片url2|图片url3....）
	var _site = '';//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
	window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}
