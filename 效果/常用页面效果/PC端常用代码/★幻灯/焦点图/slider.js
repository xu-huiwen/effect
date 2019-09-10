(function($) {
	$.slider = function(options) {
		var tabs = $(options.tabs),
			output = $(options.output),
			itemNum		= tabs.length,
			itemCurr	= options.startIndex || 0,//开始索引值
			hoverPause	= options.hoverPause || true, //鼠标覆盖暂停,
			speed 	    = options.speed || 0,//自动播放时间,单位毫秒,0为不自动播放
			currStyle   = options.currStyle || 'current',
			ease        = options.ease || 'fade',
			animateSpeed= options.animateSpeed,
			actionType  = options.actionType || 'click',
			itemWidth   = output.outerWidth();

		//初始化
		if(ease === 'fade'){
			output.hide().eq(itemCurr).show();
		}else if(ease === 'slide'){
			var oParent =  output.parent();
			output.clone().appendTo(oParent);
			oParent.animate({left: -itemWidth*itemCurr});
		}
		tabs.removeClass(currStyle).eq(itemCurr).addClass(currStyle);

		//切换展示
		function jump(n) {
			if(isNaN(animateSpeed)){
				animateSpeed = 200;
			}
			if (typeof n == "undefined") {
				n = itemCurr + 1;
			}
			if(ease === 'fade'){
				n = n >= itemNum ? 0 : n;
				tabs.removeClass(currStyle).eq(n).addClass(currStyle);
				output.stop(true, true).filter(":visible").fadeOut(animateSpeed);
				output.eq(n).fadeIn(animateSpeed,function() {
					itemCurr = n;
				});
			}else if(ease === 'slide'){
				var oParent =  output.parent();
				oParent.stop(true).animate({left: -itemWidth*n},animateSpeed,function(){
					if(n >= itemNum || n==0 ){
						oParent.css({left: 0});
						n = 0;
					}
					itemCurr = n;
				});
				n = n >= itemNum ? 0 : n;
				tabs.removeClass(currStyle).eq(n).addClass(currStyle);
			}else{
				return;
			}
		}

		tabs.bind(actionType,function() {
			if ($(this).hasClass(currStyle)) {
				return false;	
			}
			jump( tabs.index(this) );
		});

		//计时器
		if (speed > 0) {
			var timer = setInterval(function () {
				jump();
			}, speed);
			//鼠标覆盖暂停计时器
			if (hoverPause) {
				tabs.add(output).bind('mouseenter',function() {
					clearInterval( timer );
				}).bind('mouseleave',function() {
					clearInterval( timer );
					timer = setInterval(function () {
						jump();
					}, speed);
				});
			}
		}
	};

	//Jquery选择器模式
	$.fn.slider = function(output,opt) {
		if(output){
			if(typeof(opt)==='object'){
				var options = opt;
			}else{
				var options = {};
			}
			options.tabs    =   $(this);
			options.output  =   output;
			$.slider(options);
		}else{
			return;
		}
	};
})(jQuery);