(function($) {
	$.fn.conSlide = function (options) {
		var defaults = {
			delay: 1000
		};
		var opts = $.extend(defaults, options);
		return this.each(function () {
			var con = $(this).find("li"),
				cur = 0,
				tol = con.length,
				autoTimer;

			function showAd() {
				con.hide();
				con.eq(cur).fadeIn();
			}

			function autoShow() {
				cur++;
				cur = cur == tol ? 0 : cur;
				showAd();
			}
			
			autoTimer = setInterval(autoShow, opts.delay)
			$(this).hover(function () {
				clearInterval(autoTimer)
			}, function () {
				clearInterval(autoTimer)
				autoTimer = setInterval(autoShow, opts.delay)
			})
			showAd(cur)
		})
	};	
})(jQuery);