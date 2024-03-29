/*! motion v0.0.0 | (c) 2016, 2016/06/27 | lottery | motion Foundation, Inc. */
!
function() { !
    function() { !
        function() {
            if (!window.Motion) {
                var a = {
                    version: "1.1",
                    add: function(a, b) {
                        for (var c = window,
                        d = arguments.callee,
                        e = null,
                        f = (/^([\w\.]+)(?:\:([\w\.]+))?\s*$/.test(a), RegExp.$1.split(".")), g = RegExp.$2.split("."), a = f.pop(), h = /[A-Z]/.test(a.substr(0, 1)), i = function() {
                            var a = arguments.callee.prototype.init;
                            "function" == typeof a && arguments.callee.caller != d && a && a.apply(this, arguments)
                        },
                        j = 0; j < f.length; j++) {
                            var k = f[j];
                            c = c[k] || (c[k] = {})
                        }
                        if ("" != g[0]) {
                            e = window;
                            for (var j = 0; j < g.length; j++) if (e = e[g[j]], !e) {
                                e = null;
                                break
                            }
                        }
                        h && "function" == typeof b ? (e && (i.prototype = new e, i.prototype.superClass = e), c[a] = i, i.prototype.constructor = i, b.call(c[a].prototype)) : c[a] = b
                    }
                };
                window.Motion = window.mo = a
            }
        } ()
    } (),
    function() {
        Motion.add("mo.Base",
        function() {
            {
                var a = this;
                this.constructor
            }
            a.constructor = function() {},
            a.on = function() {
                return box = Zepto(this),
                box.on.apply(box, arguments)
            },
            a.off = function() {
                return box = Zepto(this),
                box.off.apply(box, arguments)
            },
            a.trigger = function() {
                var a = Zepto(this);
                return a.triggerHandler.apply(a, arguments)
            }
        })
    } (),
    function() {
        Motion.add("mo.Lottery:mo.Base",
        function() {
            var a = this,
            b = {
                addRule: function(a, b, c) {
                    var d = "",
                    e = document.getElementsByTagName("style")[0];
                    e || (e = document.createElement("style"), e.type = "text/css", document.getElementsByTagName("head")[0].appendChild(e));
                    var f = e.sheet || e.styleSheet;
                    if ("string" == typeof b) d = b;
                    else for (var g in b) d += g + ":" + b[g] + ";";
                    c = c || 0,
                    "insertRule" in f ? f.insertRule(a + "{" + d + "}", c) : f.addRule(a, d, c)
                },
                detectCSSPrefix: function() {
                    var a, b = window.getComputedStyle,
                    c = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/,
                    d = {
                        js: "",
                        css: ""
                    };
                    if (!b) return d;
                    var e = b(document.createElement("div"), null);
                    for (var f in e) if (a = f.match(c) || +f == f && e[f].match(c)) break;
                    return a ? (a = a[0], "-" === a.slice(0, 1) ? (d.css = a, d.js = {
                        "-webkit-": "webkit",
                        "-moz-": "Moz",
                        "-ms-": "ms",
                        "-o-": "O"
                    } [a]) : (d.css = "-" + a.toLowerCase() + "-", d.js = a), d) : d
                },
                random: function(a, b) {
                    return Math.floor(a + Math.random() * (b - a))
                },
                findKeyframesRule: function(a) {
                    for (var b = document.styleSheets,
                    c = 0; c < b.length; ++c) if (b[c].cssRules) for (var d = 0; d < b[c].cssRules.length; ++d) if (b[c].cssRules[d].type == (window.CSSRule.WEBKIT_KEYFRAMES_RULE || window.CSSRule.MOZ_KEYFRAMES_RULE || window.CSSRule.O_KEYFRAMES_RULE || window.CSSRule.KEYFRAMES_RULE) && b[c].cssRules[d].name == a) return b[c].cssRules[d];
                    return null
                },
                change: function(a, c, d, e) {
                    var f = b.findKeyframesRule(a);
                    if (f) {
                        f.deleteRule("from"),
                        f.deleteRule("to");
                        var g = function(a) {
                            return f.appendRule && f.appendRule(a) || f.insertRule && f.insertRule(a)
                        };
                        g("from { " + c + ": rotateZ(" + d + "deg); }"),
                        g("to { " + c + ": rotateZ(" + e + "deg); }")
                    } else b.addRule("@" + b.prefix + "keyframes " + a, "from { " + c + ": rotateZ(" + d + "deg); } to { " + c + ": rotateZ(" + e + "deg); }")
                }
            },
            c = this.constructor;
            b.prefix = b.detectCSSPrefix().css;
            var d = function(a) {
                var d = this;
                d.config = Zepto.extend(!0, {},
                c.config, a);
                var e = d.config,
                f = e.contentId,
                g = {
                    container: f + "_container",
                    start: f + "_start",
                    disable: f + "_disable",
                    slight: f + "_slight",
                    hover: f + "_hover",
                    speed_up: f + "_speed_up",
                    uniform: f + "_uniform",
                    slow_down: f + "_slow_down",
                    bgLight: f + "_bgLight",
                    borderLight: f + "_borderLight"
                },
                h = null,
                i = null,
                j = Zepto("#" + e.contentId)[0],
                k = (function() {
                    if (b.addRule("." + g.container, {
                        position: "relative",
                        width: e.width + "rem",
                        height: e.height + "rem"
                    }), e.r) {
                        var a = {
                            display: "block",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            cursor: "pointer"
                        };
                        a[b.prefix + "transition"] = "transform .2s ease-in",
                        b.addRule("." + g.start, a);
                        var c = Zepto.extend(a, {
                            cursor: "normal"
                        });
                        b.addRule("." + g.disable, c),
                        b.addRule("." + g.start + ":hover", {
                            transform: "scale(1.2)"
                        }),
                        b.addRule("." + g.hover, {
                            position: "absolute",
                            left: "0",
                            top: "0",
                            width: e.width + "rem",
                            height: e.height + "rem",
                            background: "url(" + e.b + ") no-repeat"
                        });
                        var d = {};
                        d[b.prefix + "animation"] = g.speed_up + " 1s ease-in forwards";
                        var f = {};
                        f[b.prefix + "animation"] = g.uniform + " 1s linear forwards";
                        var h = {};
                        h[b.prefix + "animation"] = g.slow_down + " 1s ease-out forwards",
                        b.addRule("." + g.speed_up, d),
                        b.addRule("." + g.uniform, f),
                        b.addRule("." + g.slow_down, h)
                    } else {
                        b.addRule("@" + b.prefix + "keyframes " + g.bgLight, "0% {background-position: -500rem 0}100% {background-position: 500rem 0}"),
                        b.addRule("@" + b.prefix + "keyframes " + g.borderLight, "0% {box-shadow:0rem 0rem 10rem 10rem rgba(255,255,255,.3) inset}100% {box-shadow:0rem 0rem 20rem 20rem rgba(255,255,255,.6) inset}");
                        var a = {
                            position: "absolute",
                            width: e.sbtnw + "rem",
                            height: e.sbtnh + "rem",
                            left: e.sbtnx + "rem",
                            top: e.sbtny + "rem",
                            display: "block",
                            outline: "none"
                        },
                        i = Zepto.extend(a, {
                            cursor: "pointer",
                            background: "url(" + e.starturl + ") no-repeat"
                        });
                        i[b.prefix + "backface-visibility"] = "hidden",
                        i[b.prefix + "animation"] = g.borderLight + " 1s infinite alternate",
                        b.addRule("." + g.start, i);
                        var c = Zepto.extend(a, {
                            cursor: "normal",
                            background: "rgba(0,0,0,.3)"
                        });
                        b.addRule("." + g.disable, c),
                        b.addRule("." + g.disable + " ." + g.slight, {
                            display: "none"
                        });
                        var j = {
                            width: "100%",
                            height: "100%"
                        };
                        j[b.prefix + "backface-visibility"] = "hidden",
                        j[b.prefix + "animation"] = g.bgLight + " 3s infinite",
                        b.addRule("." + g.slight, j);
                        var k = {
                            position: "absolute",
                            left: "0",
                            top: "0",
                            width: e.boxw + "rem",
                            height: e.boxh + "rem",
                            display: "none"
                        };
                        e.lighturl ? k.background = "url(" + e.lighturl + ") no-repeat": k["box-shadow"] = "0rem 0rem 10rem 10rem rgba(255,255,255,.8) inset",
                        b.addRule("." + g.hover, k)
                    }
                } (),
                function() {
                    var a;
                    a = e.r ? '<div class="' + g.container + '"><div id="' + g.hover + '" class="' + g.hover + '"></div><img src="' + e.s + '" id="' + g.start + '" class="' + g.start + '"></div>': '<div class="' + g.container + '"><a hidefocus="true" id="' + g.start + '" href="javascript:;" class="' + g.start + '"><div class="' + g.slight + '"></div></a><div id="' + g.hover + '" class="' + g.hover + '"></div></div>',
                    j.innerHTML = a,
                    h = Zepto("#" + g.start)[0],
                    i = Zepto("#" + g.hover)[0],
                    e.r && (h.onload = function() {
                        h.style.cssText = "margin-left:" + -(h.width / 2 + e.sx) + "rem; margin-top:" + -(h.height / 2 + e.sy) + "rem",
                        h.onload = null
                    })
                } (), {
                    disable: function() {
                        return h.className == g.disable ? !1 : (h.className = g.disable, !0)
                    },
                    enable: function() {
                        h.className = g.start
                    }
                }),
                l = (function() {
                    Zepto(h).bind("touchend",
                    function() {
                        k.disable() && e.onClickRollEvent()
                    });
                    var a = ["animationend", "webkitAnimationEnd", "MozAnimationEnd", "oAnimationEnd"],
                    b = function(b, c) {
                        for (var d = function(d) {
                            if (a) {
                                var e = d.type;
                                transitionend = function(a, b) {
                                    Zepto(a).bind(e, b)
                                },
                                a = null
                            }
                            return c.call(b, d)
                        },
                        e = 0, f = a.length; f > e; e++) Zepto(b).bind(a[e], d)
                    };
                    e.r && b(i,
                    function() {
                        Zepto(i).hasClass(g.speed_up) ? (Zepto(i).removeClass(g.speed_up), setTimeout(function() {
                            Zepto(i).addClass(g.uniform)
                        },
                        0)) : Zepto(i).hasClass(g.uniform) ? (Zepto(i).removeClass(g.uniform), setTimeout(function() {
                            Zepto(i).addClass(g.slow_down)
                        },
                        0)) : (k.enable(), e.onCompleteRollEvent())
                    })
                } (), []),
                m = (function() {
                    if (e.r) for (var a = 360 / e.r,
                    b = 0; b < e.r; b++) l.push(b * a);
                    else {
                        var c = e.position.split(",");
                        Zepto.each(c,
                        function(a, b) {
                            var c = b.split("_");
                            l.push({
                                left: c[0],
                                top: c[1]
                            })
                        })
                    }
                } (), 0),
                n = function() {++m >= e.total && (m = 0);
                    var a = l[m];
                    i.style.cssText = "display:block;left:" + a.left + "rem;top:" + a.top + "rem;"
                },
                o = 30,
                p = 300,
                q = 8;
                this.reset = function() {
                    k.enable()
                },
                this.stopRoll = function(a) {
                    if (e.r) b.change(g.speed_up, b.prefix + "transform", 360 - l[m], l[m] + 720),
                    b.change(g.uniform, b.prefix + "transform", 360 - l[m] - q, 1080 + l[a]),
                    b.change(g.slow_down, b.prefix + "transform", l[a] + q, 720 - l[a]),
                    Zepto(i).addClass(g.speed_up),
                    m = a;
                    else {
                        var c, d, f, h = function(a, b, c, d) {
                            return c * a / d + b
                        },
                        j = a - m,
                        r = j + e.total * b.random(3, 7) - 1;
                        d = 2 * e.total,
                        c = Math.floor((r - d) / 3),
                        d += c,
                        f = r;
                        var s = 0,
                        t = 0,
                        u = function() {
                            if (n(), ++s > r) return k.enable(),
                            void e.onCompleteRollEvent();
                            var a, b = s,
                            g = p,
                            i = o - p,
                            j = c;
                            c >= s && (a = h(b, g, i, j)),
                            s > c && (a = o),
                            s > d && (b = t++, g = o, i = p - o, j = f - d, a = h(b, g, i, j)),
                            setTimeout(u, a)
                        };
                        setTimeout(u, p)
                    }
                }
            };
            c.config = {
                lighturl: "",
                starturl: "",
                width: 800,
                height: 660,
                total: 18,
                sbtnx: 239,
                sbtny: 130,
                sbtnw: 320,
                sbtnh: 100,
                boxw: 100,
                boxh: 100,
                position: "19_20,128_20,238_20,348_19,459_19,568_19,679_19,19_129,128.8_129,568_129,678_129,19_240,128_240,238_240,349_240,459_239,569_239,679_239",
                contentId: "swfcontent",
                onClickRollEvent: function() {},
                onCompleteRollEvent: function() {},
                r: null,
                b: "http://ossweb-img.qq.com/images/flash/lottery/circle/g.png",
                s: "http://ossweb-img.qq.com/images/flash/lottery/circle/z.png",
                bx: 0,
                by: 0,
                sx: 0,
                sy: 0
            },
            a.init = d
        })
    } ()
} ();
/*  |xGv00|18549bc489b202d7a7209bbcdf4e12e2 */
