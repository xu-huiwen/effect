/* ��꾭��Сͼ���ִ�ͼ */
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
	/* �����ʾ */	
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

/* ΢�� */
function postToWb(){
	var _zt="%23"+encodeURI("�ֶ����ɱ������ƴ")+"%23"
	var _t = encodeURI("����")+_zt+encodeURI("����Ͷ�˱����һƱ����Ҳ������İ��ɱ���Ͷ��һƱ�ɣ�");
	var _url = encodeURIComponent(document.location);
	var _appkey = encodeURI("4df3051760024dd6ab9ba2511c022cf2");//�����Ѷ��õ�appkey
	var _pic = encodeURI('');//�����磺var _pic='ͼƬurl1|ͼƬurl2|ͼƬurl3....��
	var _site = '';//�����վ��ַ
	var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
	window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}
