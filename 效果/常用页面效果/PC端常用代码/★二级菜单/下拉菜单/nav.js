(function(){
	function gE(e) {
	    return (typeof (e) == "object") ? e : document.getElementById(e)
	}
	function showE(o) {
		gE(o).style.display = "block";
	}
	function hideE(o) {
		gE(o).style.display = "none";
	}
	var li_hover = gE("navigation").getElementsByTagName("li");
	var div_hover = gE("sub-nav-i").getElementsByTagName("div");
	for(var i = 0; i < div_hover.length; i++) {
		(function(i) {
			li_hover[i].onmouseover = gE("sub-nav").onmouseover = function() {
				showE("sub-nav");
			};
			li_hover[i].onmouseout = gE("sub-nav").onmouseout = function() {
				hideE("sub-nav");
			};
			div_hover[i].onmouseover = function() {
				div_hover[i].className = "on";
			};
			div_hover[i].onmouseout = function() {
				div_hover[i].className = "";
			};
		})(i)
	}
})()