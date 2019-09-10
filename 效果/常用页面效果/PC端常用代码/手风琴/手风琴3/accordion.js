(function($) {
    $.fn.accordion = function(options) {
        var defaults = {
            time: 600
        }
        var options = $.extend(defaults, options);
        this.each(function() {
            var $wraper = $(this);
            var $total_li = $wraper.children();
            var wraper_width = parseInt($wraper.css('width'));
            var total_li_length = $total_li.length;
            var li_width = parseInt($total_li.css('width'));
            var min_li_width = Math.floor((wraper_width - li_width) / (total_li_length - 1));
            var average_width = Math.floor(wraper_width / total_li_length);
            $wraper.on('mouseenter', 'li', function() {
                var index = $(this).index();
                for (var i = 0; i < index;) {
                    ++i;
                    $total_li.eq(i).animate({
                        left: min_li_width * i
                    }, {
                        duration: options.time,
                        queue: false
                    });
                }
                for (var i = index; i < total_li_length; i++) {
                    $total_li.eq(i + 1).animate({
                        left: li_width + i * min_li_width
                    }, {
                        duration: options.time,
                        queue: false
                    });
                }
            })
            $wraper.on('mouseleave', function() {
                for (var i = 0; i < total_li_length; i++) {
                    $total_li.eq(i).animate({
                        left: average_width * i
                    }, {
                        duration: options.time,
                        queue: false
                    });
                }
            })
        });
    };
})(jQuery);
