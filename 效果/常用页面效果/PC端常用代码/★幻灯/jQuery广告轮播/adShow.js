(function($) {
	$.fn.adShow = function (options) {
		var defaults = {
			auto: true,
			delay: 5000
		};
		var opts = $.extend(defaults, options);
		return this.each(function () {
			var ctrl = $(this).find("ol li"),
				con = $(this).find("ul li"),
				cur = 0,
				tol = ctrl.length,
				autoTimer;
			ctrl.each(function (index, element) {
				$(this).click(function () {
					cur = index;
					showAd(index);
					return false;
				});
			});

			function showAd() {
				con.fadeOut("fast");
				con.eq(cur).fadeIn("slow");
				ctrl.removeClass("on");
				ctrl.eq(cur).addClass("on");
			}

			function autoShow() {
				cur++;
				cur = cur == tol ? 0 : cur;
				showAd();
			}
			if (opts.auto) {
				autoTimer = setInterval(autoShow, opts.delay)
				$(this).hover(function () {
					clearInterval(autoTimer)
				}, function () {
					clearInterval(autoTimer)
					autoTimer = setInterval(autoShow, opts.delay)
				})
			}
			showAd(cur)
		})
	};	
})(jQuery);