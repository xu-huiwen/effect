function sltNav(){
	var localHref = location.href;
	var obj, i;
	i = 0;
	if (document.getElementsByName("nav")) {
		obj = document.getElementsByName("nav");
		while (i < obj.length) {
			if (obj[i].href == localHref) {
				obj[i].className = "on";
				return;
			}
			i++;
		}
	}
}
if (document.getElementById("nav")) sltNav();