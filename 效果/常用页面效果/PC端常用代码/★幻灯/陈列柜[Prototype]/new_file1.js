!
function(e) {
    var t = function(e, t) {
        var a = this;
        s();
        function r(t) {
            var a = {};
            a.total = e.contents.length;
            a.curIndex = t.curIndex || -1;
            a.css = t.css;
            a.eventName = t.eventName || "mouseover";
            a.interval = t.interval;
            a.delay = t.delay;
            a._ctrlTimmer = null;
            a._replayTimmer = null;
            a.mobileSupport = t.mobileSupport || false;
            return a
        }
        function s() {
            a.elems = {};
            a.param = {};
            e.ctrls && (a.elems.ctrls = n(e.ctrls));
            e.contents && (a.elems.contents = n(e.contents));
            a.param = r(t);
            a.addEvents();
            a.trans(a.param.curIndex);
            a.replayBind();
            a.param.mobileSupport && a.mobileExtend()
        }
    };
    t.prototype = {
        constructor: t,
        prev: function() {
            var e = this;
            var t = e.param.curIndex - 1 < 0 ? e.param.total - 1 : e.param.curIndex - 1;
            e.trans(t)
        },
        next: function() {
            var e = this;
            var t = e.param.curIndex + 1 == e.param.total ? 0 : e.param.curIndex + 1;
            e.trans(t)
        },
        clearTimeoutTimmer: function(e) {
            if (e != null) {
                clearTimeout(e);
                e = null
            }
        },
        clearIntervalTimmer: function(e) {
            if (e != null) {
                clearInterval(e);
                e = null
            }
        },
        bindEvent: function(e, t, a, n) {
            var r = this;
            if (window.attachEvent) {
                e.attachEvent("on" + t,
                function(e) {
                    a(e, n)
                })
            } else {
                e.addEventListener(t,
                function(e) {
                    a(e, n)
                },
                false)
            }
        },
        addEvents: function() {
            var e = this;
            if (e.elems.ctrls && e.elems.ctrls.length && e.param.eventName) {
                var t;
                if (typeof e.param.delay != "undefined") {
                    e.param._ctrlTimmer = null;
                    t = function(t, a) {
                        e.clearTimeoutTimmer(e.param._ctrlTimmer);
                        e.param._ctrlTimmer = setTimeout(function() {
                            e.trans(a)
                        },
                        e.param.delay)
                    }
                } else {
                    t = function(t, a) {
                        e.trans(a)
                    }
                }
                for (var a = e.param.total - 1; a >= 0; a--) {
                    e.bindEvent(e.elems.ctrls[a], e.param.eventName, t, new Number(a))
                }
            }
        },
        trans: function(e) {
            var t = this;
            e = e < 0 ? 0 : e >= t.param.total ? t.param.total - 1 : e;
            var a = t.elems.ctrls ? t.elems.ctrls[e] : null,
            n = t.elems.contents ? t.elems.contents[e] : null;
            if ( - 1 === t.param.curIndex) {
                t.param.curIndex = 0
            }
            t.hide(t.elems.ctrls, t.elems.contents);
            t.show(a, n);
            t.onHandle && t.onHandle(e, a, n);
            t.param.curIndex = e
        },
        show: function(e, t) {
            var a = this;
            e && a.addClass(e, a.param.css);
            t && a.addClass(t, a.param.css)
        },
        hide: function(e, t) {
            var a = this;
            e && a.removeNodsClass(e, a.param.css);
            t && a.removeNodsClass(t, a.param.css)
        },
        replayBind: function() {
            var e = this;
            var t = [];
            if (e.param.interval) {
                e.initReplay();
                e.elems.contents && (t = t.concat(e.elems.contents));
                e.elems.ctrls && (t = t.concat(e.elems.ctrls));
                for (var a = 0; a < t.length; a++) {
                    e.bindEvent(t[a], "mouseover",
                    function() {
                        e.stopReplay()
                    });
                    e.bindEvent(t[a], "mouseout",
                    function() {
                        e.initReplay()
                    })
                }
            }
        },
        initReplay: function() {
            var e = this;
            if (e.param._replayTimmer != null) {
                e.stopReplay()
            }
            e.param._replayTimmer = setInterval(function() {
                e.next()
            },
            e.param.interval)
        },
        stopReplay: function() {
            var e = this;
            e.clearIntervalTimmer(e.param._replayTimmer)
        },
        mobileExtend: function() {
            var e = this;
            var t = "ontouchstart" in window;
            var n = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
            var r = t && window.navigator.userAgent.match(n);
            if (!r) {
                return
            }
            if (typeof Hammer != "undefined") {
                for (var s = 0; s < e.elems.contents.length; s++) {
                    Hammer(e.elems.contents[s]).on("swipeleft",
                    function(t) {
                        t.stopPropagation();
                        e.next()
                    });
                    Hammer(e.elems.contents[s]).on("swiperight",
                    function(t) {
                        t.stopPropagation();
                        e.prev()
                    })
                }
                return
            }
            a("http://img1.cache.netease.com/f2e/component/switch/hammer.685421.min.js",
            function() {
                for (var t = 0; t < e.elems.contents.length; t++) {
                    Hammer(e.elems.contents[t]).on("swipeleft",
                    function(t) {
                        t.stopPropagation();
                        e.next()
                    });
                    Hammer(e.elems.contents[t]).on("swiperight",
                    function(t) {
                        t.stopPropagation();
                        e.prev()
                    })
                }
            },
            "utf-8")
        },
        hasclassName: function(e, t) {
            var a = " " + e.className + " ";
            if ( - 1 === a.indexOf(" " + t + " ")) {
                return false
            }
            return true
        },
        addClass: function(e, t) {
            var a = this;
            if (!a.hasclassName(e, t)) {
                e.className += " " + t
            }
        },
        trimstr: function(e) {
            return e.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
        },
        removeClass: function(e, t) {
            var a = this;
            if (a.hasclassName(e, t)) {
                e.className = a.trimstr((" " + e.className + " ").replace(" " + t + " ", " "))
            }
        },
        removeNodsClass: function(e, t) {
            var a = this;
            for (var n = 0; n < e.length; n++) {
                a.removeClass(e[n], t)
            }
        }
    };
    function a(e, t, a) {
        var n = document.createElement("script");
        n.type = "text/javascript";
        a && (n.charset = a);
        n.onload = n.onreadystatechange = function() {
            if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                t && t();
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this)
            }
        };
        n.src = e;
        document.getElementsByTagName("head")[0].appendChild(n)
    }
    function n(e) {
        var t = [];
        for (var a = 0; a < e.length; a++) {
            t.push(e[a])
        }
        return t
    }
    e.switchable = t
} (window); (function(e) {
    function b(l, m) {
        for (var k in m) {
            l[k] = m[k]
        }
        return l
    }
    function a(l, k, n, m) {
        return n * Math.sqrt(1 - (l = l / m - 1) * l) + k
    }
    function j() {
        var m, o, q = navigator.userAgent;
        var n = function(s) {
            s = s.toLowerCase();
            var r = /(chrome)[ \/]([\w.]+)/.exec(s) || /(webkit)[ \/]([\w.]+)/.exec(s) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(s) || /(msie) ([\w.]+)/.exec(s) || s.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(s) || [];
            return {
                browser: r[1] || "",
                version: r[2] || "0"
            }
        };
        m = n(q);
        o = {};
        var l = "chrome webkit opera msie".split(" ");
        for (var p = 0,
        k = l.length; p < k; p++) {
            o[l[p]] = false
        }
        if (m.browser) {
            o[m.browser] = true;
            o.version = m.version
        }
        if (o.webkit) {
            o.safari = true
        } else {
            o.safari = false
        }
        o.webkit = o.chrome || o.webkit;
        return o
    }
    var g = j();
    function c(r, m, p, k, n) {
        var o = (new Date()).getTime();
        var q = 0;
        var l;
        if (!c.s_timmer || c.s_timmer === null) {
            c.s_timmer = setInterval(function() {
                q = (new Date()).getTime() - o;
                l = a(q, m, p, k);
                if (q > k) {
                    r.scrollLeft = p + m;
                    clearInterval(c.s_timmer);
                    c.s_timmer = null;
                    n && n();
                    return
                }
                r.scrollLeft = l
            },
            13)
        }
    }
    function f(l, y, p) {
        var o = {};
        var m = b(o, l);
        var x = {
            curClass: "current",
            triggerEvent: "mouseover",
            scrollUnit: m.sBody[0].offsetWidth,
            direc: "x",
            interval: 0,
            delay: 600
        };
        var k = b(x, y);
        var s = null;
        var w = m.contents.length;
        var v = 0;
        var r = m.ctrls ? m.ctrls: "";
        var l = {
            ctrls: r,
            contents: m.contents
        },
        q = {
            css: k.curClass,
            eventName: k.triggerEvent,
            delay: 100,
            interval: k.interval
        };
        var n = new switchable(l, q);
        if (k.direc == "x") {
            n.onHandle = function(z, B, A) {
                u(z, k.scrollUnit, m.sBody[0], k.delay);
                p && p(z, B, A)
            };
            m.sItemsWrap.css({
                width: w * k.scrollUnit + "px"
            });
            m.sBody[0].scrollLeft = n.param.curIndex * k.scrollUnit
        } else {
            if (k.direc == "y") {
                n.onHandle = function(z, B, A) {
                    t(z, k.scrollUnit, m.sBody[0], k.delay);
                    p && p(z, B, A)
                };
                m.sItemsWrap.css({
                    height: w * k.scrollUnit + "px"
                });
                m.sBody[0].scrollTop = n.param.curIndex * k.scrollUnit
            }
        }
        function u(B, E, D, z) {
            if (s != null) {
                clearInterval(s);
                s = null
            }
            var F = B * E,
            G = D.scrollLeft,
            H = 0;
            var A = (new Date()).getTime();
            var C = 0;
            s = setInterval(function() {
                C = (new Date()).getTime() - A;
                H = a(C, G, F - G, z);
                if (C > z) {
                    D.scrollLeft = F;
                    clearInterval(s);
                    s = null;
                    return
                }
                D.scrollLeft = H
            },
            13)
        }
        function t(B, E, D, z) {
            if (s != null) {
                clearInterval(s);
                s = null
            }
            var F = B * E,
            G = D.scrollTop,
            H = 0;
            var A = (new Date()).getTime();
            var C = 0;
            s = setInterval(function() {
                C = (new Date()).getTime() - A;
                H = a(C, G, F - G, z);
                if (C > z) {
                    D.scrollTop = F;
                    clearInterval(s);
                    s = null;
                    return
                }
                D.scrollTop = H
            },
            13)
        }
        return n
    }
    function d(l, m) {
        var n = this;
        var o = {};
        var k = {
            initDist: 0,
            scrollUnit: 500,
            delay: 600,
            cellFill: 0,
            allFill: 0,
            sItemsWrap_W: 0,
            disabledClass: "matchnav_ctrl_disabled",
            fillClass: "matchnav_fill"
        };
        n.nodes = b(o, l);
        n.options = b(k, m)
    }
    d.prototype = {
        init: function() {
            var k = this;
            k.nodes.sBody[0].scrollLeft = k.options.initDist;
            k.options.sBody_W = k.nodes.sBody[0].offsetWidth;
            k.options.sItemsWrap_W = (k.options.sItemsWrap_W != 0) ? k.options.sItemsWrap_W: (k.nodes.sItems[k.nodes.sItems.length - 1].offsetWidth + k.options.cellFill) * k.nodes.sItems.length + k.options.allFill;
            if (k.nodes.sBody[0].scrollLeft == 0) {
                k.nodes.sPrev.addClass(k.options.disabledClass)
            }
            if (k.options.sItemsWrap_W > k.options.sBody_W) {
                k.nodes.sItemsWrap.css({
                    width: k.options.sItemsWrap_W + "px"
                });
                if (k.options.sItemsWrap_W - k.options.initDist < k.options.sBody_W) {
                    k.nodes.sNext.addClass(k.options.disabledClass)
                } else {
                    k.nodes.sNext.removeClass(k.options.disabledClass)
                }
            } else {
                k.fill();
                k.nodes.sItemsWrap.css({
                    width: k.options.sBody_W + "px"
                });
                k.nodes.sNext.addClass(k.options.disabledClass)
            }
            k.eventHandle()
        },
        eventHandle: function() {
            var k = this;
            k.nodes.sPrev.bind("click",
            function(l) {
                l.preventDefault();
                k.prev()
            });
            k.nodes.sNext.bind("click",
            function(l) {
                l.preventDefault();
                k.next()
            })
        },
        prev: function() {
            var k = this;
            var l = k.nodes.sBody[0].scrollLeft;
            var n = 0;
            var m = null;
            if (k.options.sItemsWrap_W > k.options.sBody_W) {
                if (l > k.options.scrollUnit) {
                    n = -k.options.scrollUnit;
                    m = function() {
                        k.nodes.sNext.removeClass(k.options.disabledClass)
                    }
                } else {
                    n = -l;
                    m = function() {
                        k.nodes.sNext.removeClass(k.options.disabledClass);
                        k.nodes.sPrev.addClass(k.options.disabledClass)
                    }
                }
                if (n == 0) {
                    return
                }
                c(k.nodes.sBody[0], l, n, k.options.delay, m)
            } else {
                return
            }
        },
        next: function() {
            var k = this;
            var l = k.nodes.sBody[0].scrollLeft;
            var n = 0;
            var m = null;
            if (k.options.sItemsWrap_W > k.options.sBody_W) {
                if ((k.options.sItemsWrap_W - k.options.sBody_W - l) > k.options.scrollUnit) {
                    n = k.options.scrollUnit;
                    m = function() {
                        k.nodes.sPrev.removeClass(k.options.disabledClass)
                    }
                } else {
                    n = k.options.sItemsWrap_W - k.options.sBody_W - l;
                    m = function() {
                        k.nodes.sPrev.removeClass(k.options.disabledClass);
                        k.nodes.sNext.addClass(k.options.disabledClass)
                    }
                }
                if (n == 0) {
                    return
                }
                c(k.nodes.sBody[0], l, n, k.options.delay, m)
            } else {
                return
            }
        },
        fill: function() {
            var l = this;
            if (e("." + l.options.fillClass, l.nodes.sWrap)[0]) {
                return
            }
            var k = document.createElement("div");
            k.className = l.options.fillClass;
            if (l.options.sItemsWrap_W < l.options.sBody_W) {
                e(k).css({
                    width: l.options.sBody_W - l.options.sItemsWrap_W + "px"
                });
                e(l.nodes.sItems[l.nodes.sItems.length - 1]).after(k)
            }
        }
    };
    function i(m) {
        var k = {
            ctrls: e(".tabs li", m),
            contents: e(".panels .panel", m)
        };
        var n = {
            css: "on",
            eventName: "mouseover",
            delay: 100
        };
        var l = new switchable(k, n)
    }
    function h(o) {
        var k = e(".scroll_prev", o),
        n = e(".scroll_next", o);
        var l = {
            sWrap: e(o),
            sBody: e(".scroll_body", o),
            sItemsWrap: e(".scroll_items", o),
            ctrls: e(".scroll_ctrls span", o),
            contents: e(".scroll_item", o)
        };
        var m = {
            curClass: "current",
            triggerEvent: "mouseover",
            direc: "x",
            delay: 500,
            scrollUnit: o.offsetWidth
        };
        var p = new f(l, m);
        p.trans(0);
        k.bind("click",
        function(q) {
            q.preventDefault();
            p.prev()
        });
        n.bind("click",
        function(q) {
            q.preventDefault();
            p.next()
        })
    }
    window.T = {
        browser: g
    };
    window.F = {
        FocusScroll: f,
        Slider: d,
        tabSwitch: i,
        sliderCall: h
    };
    e(".js_switch").each(function() {
        i(this)
    })
})(jQuery); (function(j) {
    var m = false;
    var c = 313;
    var e = 368 / 313;
    var p = 433 / 313;
    var k = 38;
    var f = 0;
    var l;
    var d;
    j("#partRecBtn").mouseenter(function(q) {
        j("#partRecList").show()
    }).mouseleave(function(q) {
        j("#partRecList").hide()
    });
    j("#partRecList a").click(function() {
        m = false;
        var q = j(this).index() + 1;
        o(q)
    });
    j("#partRecList a.unopen").mouseenter(function(r) {
        var q = j(this).attr("data-tips");
        j(this).siblings("." + q).show()
    }).mouseleave(function(r) {
        var q = j(this).attr("data-tips");
        j(this).siblings("." + q).hide()
    });
    window.anList = [];
    window.initArtistInfo = function(q) {
        if (!q) {
            j.ajax({
                url: "http://m.yy.com/act/ceremony2014/timing.json",
                type: "get",
                dataType: "json",
                success: function(r) {
                    if (r) {
                        window.anList = r.anList;
                        g()
                    }
                }
            })
        } else {
            window.anList = q;
            g()
        }
    };
    var b = [],
    i = {},
    a = {
        "1": "bj",
        "2": "gj",
        "3": "bo",
        "4": "jo",
        "5": "nrl",
        "6": "nxr",
        "7": "nxr"
    };
    var n = {
        "1": "年度最佳YY男偶像",
        "2": "年度最佳YY女偶像",
        "3": "年度最佳男金牌艺人",
        "4": "年度最佳女金牌艺人",
        "5": "年度最佳组合",
        "6": "年度最佳男新人",
        "7": "年度最佳女新人"
    };
    var g = function() {
        var s = window.anList;
        for (var q = 0; q < s.length; q++) {
            var r = Number(s[q].type);
            if (j.inArray(r, b) == -1) {
                b.push(r);
                i[r] = {};
                i[r].anType = r;
                i[r].anchors = {};
                i[r].anchors.uids = []
            }
            i[r].anchors.uids.push(s[q].uid);
            i[r].anchors[s[q].uid + ""] = s[q]
        }
        o(b[0])
    };
    var h = function(q) {
        return "http://m.yy.com/act/images/ceremony2014/anchors/" + q + ".jpg?v=" + servTime.getTime()
    };
    var o = function(t) {
        j("#partRecList").hide();
        if (j.inArray(t, b) == -1) {
            return
        }
        var r = j("#partRecBtn");
        var A = r.attr("anType");
        if (A == t) {
            return
        }
        r.attr("anType", t);
        j("#partRecBtn span").removeClass().addClass(a[t]);
        r.find("#gr-name-p").html(n[t]);
        var B = j("#anchor_show_content");
        B.html("");
        var L = [];
        L.push(['<div class="rec_bg">', '<div class="scroll_body">', '<div class="cells_wrap">', "</div>", "</div>", "</div>", '<div class="rec_switch js_rec_switch">', '<div class="panels">', "</div>", '<div class="tabs rec_scroll js_scrolla">', '<div class="scroll_in">', '<a href="" class="scroll_prev js_opacity"></a>', '<div class="scroll_body">', '<div class="scroll_items">', "<ul></ul>", "</div>", "</div>", '<a href="" class="scroll_next js_opacity"></a>', "</div>", "</div>", "</div>"].join(""));
        B.html(L.join(""));
        var s = i[t].anchors.uids;
        var E = [],
        J = [];
        for (var K in s) {
            var v = s[K];
            var O = i[t].anchors[v];
            var P = O.imUrl;
            E.push(['<div class="panel" _bgurl="' + P + '" uid="' + v + '" anType="' + t + '">', "</div>"].join(""));
            J.push(['<li uid="' + v + '">', '<img src="' + P + '" width="75" height="75" alt="">', '<div class="tx">', '<span class="bg_opacity60_black"></span>', '<span class="tx_in"><h3>' + O.nick + "</h3></span>", "</div>", "</li>"].join(""))
        }
        j("#section2 .panels").html(E.join(""));
        j("#section2 .scroll_items ul").html(J.join(""));
        var w = j("#section2");
        var I = j(".tabs li", w);
        var N = j(".panels .panel", w);
        var M = I.length;
        var D = 0;
        var R = 0;
        f = 0;
        var C = j(".rec_bg", w);
        var S = j(".scroll_body", C);
        var x = j(".cells_wrap", C);
        c = j(window).height() - 580;
        if (c > 313) {
            c = 313
        }
        if (c < 180) {
            c = 180
        }
        j(".content .rec_bg").width(c * (2 + e));
        j(".content .rec_bg").height(e * c * p);
        k = (e - 1) * c * p * 0.5;
        var y = "";
        y += '<ul><li><div class="normal-box"><img src="' + j(N[0]).attr("_bgurl") + '" width="100%" height="100%"></div></li></ul>';
        y += '<ul class="bg_cells">';
        for (var K = 0; K < M; K++) {
            var v = j(N[K]).attr("uid");
            if (v == "-1") {
                y += '<li _index="' + K + '"><div class="normal-box"><img src="' + j(N[K]).attr("_bgurl") + '" width="100%" height="100%"></div></li>';
                break
            }
            var t = j(N[K]).attr("anType");
            var O = i[t].anchors[v];
            y += '<li _index="' + K + '"><div class="normal-box"><img src="' + j(N[K]).attr("_bgurl") + '" width="100%" height="100%"><i></i><div class="kuang-box"><div class="info"><p class="name">' + O.nick + '</p><div class="line"><p class="timing">' + n[t] + '提名</p><p class="sid">签约频道：' + O.chAid + '</p></div></div></div></div><div class="hover-box"><img src="' + j(N[K]).attr("_bgurl") + '" width="25%"><div class="box-mask"><div class="channel"><p class="timing">' + n[t] + '提名</p><p class="name">' + O.nick + '</p><p class="cid">签约频道：' + O.chAid + '</p><p class="sid">直播间ID：' + O.roomid + '</p></div><textarea class="info" readonly="readonly" rows="4">' + O.content + '</textarea></div><a href="http://m.yy.com/ents/' + O.yyNum + '" target="_blank"></a></div></li>'
        }
        y += "</ul>";
        y += '<ul><li><div class="normal-box"><img src="' + j(N[M - 1]).attr("_bgurl") + '" alt=""></div></li></ul>';
        x.html(y);
        var q = j("li", C);
        var H = j(".bg_cells li", C);
        q.find("img").css({
            opacity: "0.2"
        });
        q.find("img").find(".kuang-box").hide();
        q.eq(1).find("img").css({
            opacity: "1"
        });
        q.eq(1).find(".kuang-box").show();
        q.css({
            "margin-top": k + "px",
            height: c * p + "px",
            width: c + "px"
        });
        q.eq(1).css({
            "margin-top": "0px",
            height: e * c * p + "px",
            width: e * c + "px"
        });
        q.eq(1).addClass("on");
        if (c < 190) {
            q.find(".hover-box .info").hide()
        } else {
            if (c < 200) {
                q.find(".hover-box .info").attr("rows", 1)
            } else {
                if (c < 230) {
                    q.find(".hover-box .info").attr("rows", 2)
                } else {
                    if (c < 260) {
                        q.find(".hover-box .info").attr("rows", 3)
                    } else {
                        q.find(".hover-box .info").attr("rows", 4)
                    }
                }
            }
        }
        var G = {
            ctrls: I,
            contents: N
        };
        var Q = {
            css: "on",
            eventName: "mouseover",
            delay: 100
        };
        d = new switchable(G, Q);
        d.trans(0);
        d.onHandle = function(T, V, U) {
            if (T == f) {
                return
            }
            D = ((T - 1) < 0) ? M - 1 : (T - 1);
            R = ((T + 1) > M - 1) ? 0 : (T + 1);
            S.animate({
                scrollLeft: T * c
            },
            500);
            q.eq(f + 1).removeClass("on");
            q.eq(f + 1).find("img").animate({
                opacity: "0.2"
            },
            500);
            q.eq(f + 1).find(".kuang-box").hide();
            q.eq(f + 1).find(".hover-box").hide();
            q.eq(T + 1).addClass("on");
            q.eq(T + 1).find("img").animate({
                opacity: "1"
            },
            500);
            q.eq(T + 1).find(".kuang-box").show();
            q.eq(T + 1).find(".hover-box").hide();
            q.eq(f + 1).animate({
                "margin-top": k + "px",
                height: c * p + "px",
                width: c + "px"
            },
            500);
            q.eq(T + 1).animate({
                "margin-top": "0px",
                height: e * c * p + "px",
                width: e * c + "px"
            },
            500);
            f = T
        };
        j(".panels").hide();
        var z = j(".js_scrolla");
        var G = {
            sWrap: j(z),
            sBody: j(".scroll_body", z),
            sItemsWrap: j(".scroll_items", z),
            sItems: j(".scroll_items li", z),
            sPrev: j(".scroll_prev", z),
            sNext: j(".scroll_next", z)
        };
        var u = {
            scrollUnit: 840,
            delay: 600,
            cellFill: 2,
            allFill: 45
        };
        l = new F.Slider(G, u);
        l.init();
        m = true
    };
    j(window).unbind().bind("resize",
    function() {
        if (!m) {
            return
        }
        c = j(window).height() - 580;
        if (c > 313) {
            c = 313
        }
        if (c < 180) {
            c = 180
        }
        j(".content .rec_bg").width(c * (2 + e));
        j(".content .rec_bg").height(e * c * p);
        var s = j("#section2");
        var t = j(".rec_bg", s);
        var r = j("li", t);
        var q = j(".scroll_body", t);
        k = (e - 1) * c * p * 0.5;
        r.css({
            height: c * p + "px",
            width: c + "px",
            "margin-top": k + "px"
        });
        r.eq(f + 1).css({
            "margin-top": "0px",
            height: e * c * p + "px",
            width: e * c + "px"
        });
        r.find(".hover-box .info").show();
        if (c < 190) {
            r.find(".hover-box .info").hide()
        } else {
            if (c < 200) {
                r.find(".hover-box .info").attr("rows", 1)
            } else {
                if (c < 230) {
                    r.find(".hover-box .info").attr("rows", 2)
                } else {
                    if (c < 260) {
                        r.find(".hover-box .info").attr("rows", 3)
                    } else {
                        r.find(".hover-box .info").attr("rows", 4)
                    }
                }
            }
        }
        q.scrollLeft(f * c)
    });
    j("#section2").delegate(".bg_cells li i", "click",
    function(q) {
        var r = j(this).parent().parent().attr("_index");
        if (r == f && d) {
            return
        }
        console.log(r + "==" + f + "==" + l);
        if (r > f) {
            d.next()
        } else {
            if (r < f) {
                d.prev()
            }
        }
        q.preventDefault()
    });
    j("#section2").delegate(".bg_cells li", "mouseleave",
    function() {
        var q = j(this);
        q.find(".hover-box").hide()
    });
    j("#section2").delegate(".bg_cells li", "mouseenter",
    function() {
        if (j(this).attr("_index") != f) {
            return
        }
        var q = j(this);
        q.find(".hover-box").show()
    })
})(jQuery);