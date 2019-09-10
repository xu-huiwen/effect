//—”≥Ÿº”‘ÿjs°¢css
function delay_js(url) {
    var type = url.split("."),
        file = type[type.length - 1];
    if (file == "css") {
        var obj = document.createElement("link"),
            lnk = "href",
            tp = "text/css";
        obj.setAttribute("rel", "stylesheet")
    } else var obj = document.createElement("script"),
        lnk = "src",
        tp = "text/javascript";
    obj.setAttribute(lnk, url);
    obj.setAttribute("type", tp);
    file == "css" ? document.getElementsByTagName("head")[0].appendChild(obj) : document.body.appendChild(obj);
    return obj
};

//º”‘ÿjs
function loadjs(url, succ, v) {
    var elem = delay_js(url);
    if ((navigator.userAgent.indexOf('MSIE') == -1) ? false : true) {
        elem.onreadystatechange = function () {
            if (this.readyState && this.readyState == "loading") return;
            else succ(v)
        }
    } else elem.onload = function () {
        succ(v)
    };
    elem.onerror = function () {}
};

//º”‘ÿCSS
function loadcss(u) {
	var l = doc.createElement("link");
	l.href = u;
	l.rel = "stylesheet";
	doc.getElementsByTagName("head")[0].appendChild(l);
}

//onload
function addload(func) {
    var old = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func
    } else {
        window.onload = function () {
            old();
            func()
        }
    }
};