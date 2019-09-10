/*
///��Դ http://wwww.css88.com
///�������ã�
scaling     �Ƿ�ȱ����Զ�����
width       ͼƬ����
height      ͼƬ����
*/
(function($){
	jQuery.fn.LoadImage=function(settings){
		 settings = jQuery.extend({
        	scaling : true,
			width : 500,
			height : 500
    	}, settings);
		return this.each(function() {
			$.fn.LoadImage.Showimg( $( this ), settings );
    	});
		};
	$.fn.LoadImage.Showimg = function($this, settings){
		var src=$this.attr("src");
		var img=new Image();
		img.src=src;
		var autoScaling=function(){
			if (settings.scaling) {
				if (img.width > 0 && img.height > 0) {
					if (img.width / img.height >= settings.width / settings.height) {
						if (img.width > settings.width) {
							$this.width(settings.width);
							$this.height((img.height * settings.width) / img.width);
						}
						else {
							$this.width(img.width);
							$this.height(img.height);
						}
					}
					else {
						if (img.height > settings.height) {
							$this.height(settings.height);
							$this.width((img.width * settings.height) / img.height);
						}
						else {
							$this.width(img.width);
							$this.height(img.height);
						}
					}
				}
			}
		}
		$(img).load(function(){
			autoScaling();
		});
	}
})(jQuery);
