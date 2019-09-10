// 根据ID获取元素
function gE(e) {
    return (typeof (e) == "object") ? e : document.getElementById(e)
}

// 根据标签获取元素
function gTag(o,t) {
	return o.getElementsByTagName(t)
}

// 判断是否有类
function hasClass(o,c) {
	var regexp = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    return regexp.test(o.className)
}

// 添加类
function addClass(o,c) {
  if (!hasClass(o,c)) {
    o.className += (o.className ? " " : "") + c;
  }
}

// 删除类
function removeClass(o,c) {
  if (hasClass(o,c)) {
      o.className = o.className.replace(RegExp("(^|\\s)" + c + "(\\s|$)", "g"), "");
  }
}

//根据类名获取元素
function gClass(o, c) {
  var e = [],
      t = gTag(o, "*");
  for (var i = 0; i < t.length; i++) {
    if (hasClass(t[i], c)) {
      e[e.length] = t[i]
    }
  }
  return e
}

// 事件绑定
function addEventSimple(obj, evt, fn) {
  if (obj.addEventListener) obj.addEventListener(evt, fn, false);
  else if (obj.attachEvent) obj.attachEvent('on' + evt, fn);
}