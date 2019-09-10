(function() {
    var doc = document,
        win = window;
    if (!_$) {
        var _$ = {
            isArray: function(o) {
                return '[object Array]' == Object.prototype.toString.call(o)
            },
            gId: function(o) {
                return doc.getElementById(o)
            },
            gTag: function(o, t) {
                return o.getElementsByTagName(t)
            },
            hasClass: function(o, c) {
                var regexp = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
                return regexp.test(o.className)
            },
            gClass: function(o, c) {
                var e = [],
                    t = _$.gTag(o, "*");
                for (var i = 0; i < t.length; i++) {
                    if (_$.hasClass(t[i], c)) {
                        e[e.length] = t[i]
                    }
                }
                return e
            },
            addClass: function(o, c) {
                if (_$.isArray(o)) {
                    for (var i = 0; i < o.length; i++) {
                        if (!_$.hasClass(o[i], c)) {
                            o[i].className += (o[i].className ? " " : "") + c
                        }
                    }
                } else {
                    if (!_$.hasClass(o, c)) {
                        o.className += (o.className ? " " : "") + c
                    }
                }
            },
            removeClass: function(o, c) {
                var regexp = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
                if (_$.isArray(o)) {
                    for (var i = 0; i < o.length; i++) {
                        o[i].className = o[i].className.replace(regexp, " ").replace(/(^\s*)|(\s*$)/g, "")
                    }
                } else {
                    o.className = o.className.replace(regexp, " ").replace(/(^\s*)|(\s*$)/g, "")
                }
            },
            loadJs: function(u, f) {
                var s = doc.createElement("script");
                s.src = u;
                _$.gTag(doc, "head")[0].appendChild(s);
                if (s.readyState) {
                    s.onreadystatechange = function() {
                        if (s.readyState == "loaded" || s.readyState == "complete") {
                            s.onreadystatechange = null;
                            f && f()
                        }
                    }
                } else {
                    s.onload = function() {
                        f && f()
                    }
                }
            },
            addOnLoad: function(f) {
                var old = win.onload;
                if (typeof win.onload != "function") {
                    win.onload = f
                } else {
                    win.onload = function() {
                        old();
                        f()
                    }
                }
            },
            addEvent: function(o, t, f) {
                if (o.attachEvent) {
                    o.attachEvent("on" + t, function() {
                        f.apply(o, arguments)
                    })
                } else {
                    o.addEventListener(t, f, false)
                }
            },
            hasFlash: function() {
                var ua = navigator.userAgent,
                    flag = 0; /*@cc_on!@*/
                0 ? new ActiveXObject('ShockwaveFlash.ShockwaveFlash') && (flag = 1) : navigator.plugins && navigator.plugins.length > 0 && navigator.plugins["Shockwave Flash"] && (flag = 1);
                return ua.indexOf("iPhone") == -1 && ua.indexOf("iPad") == -1 && flag
            },
            loadFlash: function(o, u, w, h, v) {
                if (_$.hasFlash()) {
                    _$.gId(o).innerHTML = '<object width="' + w + '" height="' + h + '" align="middle" id="' + o + '_flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=10,0,0,0"><param name="movie" value="' + u + '"><param name="wmode" value="transparent"><param name="allowscriptaccess" value="always" /><param name="quality" value="high"><param name="allowfullscreen" value="true"><param name="allownetworking" value="all"><embed width="' + w + '" height="' + h + '" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" id="' + o + '_flash" name="_playerswf" quality="high" src="' + u + '" wmode="transparent" allowscriptaccess="always"></object>'
                } else if (v) {
                    add.js("http://vv.video.qq.com/getinfo?platform=1&otype=json&vids=" + v, function() {
                        var vr = QZOutputJson["vl"]["vi"][0]["ul"]["ui"];
                        _$.gId(o).innerHTML = '<video width="' + w + '" height="' + h + '" controls="controls" autoplay="autoplay" src="' + vr[vr.length - 1]["url"] + v + '.mp4"><p class="html5video">您的浏览器不支持HTML5视频或者没有安装Flash插件~</p></video>'
                    }, "")
                }
            },
            show: function(o) {
                o.style.display = "block"
            },
            hide: function(o) {
                o.style.display = "none"
            }
        };
        win._$ = _$
    }
})();