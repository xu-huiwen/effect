<script type="text/javascript" src="http://ossweb-img.qq.com/images/js/top_js/x5_top_201007.js"></script>
<script type="text/javascript" src="http://ossweb-img.qq.com/images/js/foot.js"></script>
<script type="text/javascript" src="http://pingjs.qq.com/ping_tcss_ied.js"></script>
<script type="text/javascript">
if(typeof(pgvMain) == 'function')pgvMain();//统计
var tloca = document.location.href.split('index.shtml')[0];tloca = encodeURIComponent(tloca);//分享到空间
//分享到微博微博
function postToWb(){var _t = encodeURI(document.title);
	var _url = encodeURIComponent(document.location);
	var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
	var _pic = encodeURI('');//（例如：var _pic='图片url1|图片url2|图片url3....）
	var _site = '';//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
	window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
};
//菜单选中状态处理
function sltNav(){
	var localHref = location.href;
	var obj,i;
	i = 0;	
	if(document.getElementsByName("mainNav")) {
		obj = document.getElementsByName("mainNav");	
		while (i< obj.length){
			if (obj[i].href == localHref) {obj[i].parentNode.className = "focus";return;}
			i++;}}
}
if (document.getElementById("main_nav")) sltNav();
</script>
