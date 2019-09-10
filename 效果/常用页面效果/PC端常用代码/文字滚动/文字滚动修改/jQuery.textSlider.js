/**
 * @author feiwen
 */
(function($){
	$.fn.textSlider = function(settings){
            settings = jQuery.extend({
                speed : "normal",
                line : 1,
                timer : 3000
            }, settings);
            return this.each(function() {
                $.fn.textSlider.scllor( $( this ), settings );
            });
        };
	$.fn.textSlider.scllor = function($this, settings){
            var ul = $("ul:eq(0)",$this );
            var timerID;
            var li = ul.children();
            var liHight=$(li[0]).height();
            var upHeight=0-settings.line*liHight;//滚动的高度；
            var x = 2;
            
            var scrollUp=function(){
                if (x < 11) {
                    ul.animate({marginTop:upHeight},settings.speed,function(){
                        x++;
                        ul.find('li').removeClass('on');
                        ul.find('li').eq(x).addClass('on');
                        if (x == 11) {
                            autoStop();
                            $('.arrow').fadeIn();//箭头出现
                        }
                    });
                }
                upHeight = 0-liHight*x;
            };
            var autoPlay=function(){
                timerID = window.setInterval(scrollUp,settings.timer);
            };
            var autoStop = function(){
                window.clearInterval(timerID);
            };
            //事件绑定
            ul.hover(autoStop,autoPlay).mouseout();
	};
})(jQuery);
