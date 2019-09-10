var Swipe = function(a, h) {
	function q() {
		n = l.children;
		e = n.length;
		2 > n.length && (h.continuous = !1);
		s.transitions && (h.continuous && 3 > n.length) && (l.appendChild(n[0].cloneNode(!0)), l.appendChild(l.children[1].cloneNode(!0)), n = l.children);
		v = Array(n.length);
		m = a.getBoundingClientRect().width || a.offsetWidth;
		l.style.width = n.length * m + "px";
		for (var c = n.length; c--;) {
			var d = n[c];
			d.style.width = m + "px";
			d.setAttribute("data-index", c);
			s.transitions && (d.style.left = c * -m + "px", g(c, b > c ? -m : b < c ? m : 0, 0))
		}
		h.continuous && s.transitions &&
			(g(f(b - 1), -m, 0), g(f(b + 1), m, 0));
		s.transitions || (l.style.left = b * -m + "px");
		a.style.visibility = "visible"
	}

	function d() {
		h.continuous ? k(b + 1) : b < n.length - 1 && k(b + 1)
	}

	function f(a) {
		return (n.length + a % n.length) % n.length
	}

	function k(a, d) {
		if (b != a) {
			if (s.transitions) {
				var e = Math.abs(b - a) / (b - a);
				if (h.continuous) {
					var k = e,
						e = -v[f(a)] / m;
					e !== k && (a = -e * n.length + a)
				}
				for (k = Math.abs(b - a) - 1; k--;) g(f((a > b ? a : b) - k - 1), m * e, 0);
				a = f(a);
				g(b, m * e, d || c);
				g(a, 0, d || c);
				h.continuous && g(f(a - e), -(m * e), 0)
			} else a = f(a), y(b * -m, a * -m, d || c);
			b = a;
			z(h.callback &&
				h.callback(b, n[b]))
		}
	}

	function g(a, b, c) {
		w(a, b, c);
		v[a] = b
	}

	function w(a, b, c) {
		if (a = (a = n[a]) && a.style) a.webkitTransitionDuration = a.MozTransitionDuration = a.msTransitionDuration = a.OTransitionDuration = a.transitionDuration = c + "ms", a.webkitTransform = "translate(" + b + "px,0) translateZ(0)", a.msTransform = a.MozTransform = a.OTransform = "translateX(" + b + "px)"
	}

	function y(a, c, d) {
		if (d) var e = +new Date,
			f = setInterval(function() {
				var g = +new Date - e;
				g > d ? (l.style.left = c + "px", r && C(), h.transitionEnd && h.transitionEnd.call(event, b, n[b]),
					clearInterval(f)) : l.style.left = (c - a) * (Math.floor(100 * (g / d)) / 100) + a + "px"
			}, 4);
		else l.style.left = c + "px"
	}

	function C() {
		r = h.auto || 0;
		t = setTimeout(d, r)
	}

	function A(a) {
		a || (r = 0);
		clearTimeout(t);
		t = null
	}
	var B = function() {},
		z = function(a) {
			setTimeout(a || B, 0)
		},
		s = {
			addEventListener: !!window.addEventListener,
			touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
			transitions: function(a) {
				var b = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"],
					c;
				for (c in b)
					if (void 0 !==
						a.style[b[c]]) return !0;
				return !1
			}(document.createElement("swipe"))
		};
	if (a) {
		var l = a.children[0],
			n, v, m, e;
		h = h || {};
		var b = parseInt(h.startSlide, 10) || 0,
			c = h.speed || 300;
		h.continuous = void 0 !== h.continuous ? h.continuous : !0;
		var r = h.auto || 0,
			t, I, J, H, u, G, D, x = {
				handleEvent: function(a) {
					switch (a.type) {
						case "touchstart":
							this.start(a);
							break;
						case "touchmove":
							this.move(a);
							break;
						case "touchend":
							z(this.end(a));
							break;
						case "touchcancel":
							z(this.end(a));
							break;
						case "webkitTransitionEnd":
						case "msTransitionEnd":
						case "oTransitionEnd":
						case "otransitionend":
						case "transitionend":
							z(this.transitionEnd(a));
							break;
						case "resize":
							z(q.call())
					}
					h.stopPropagation && a.stopPropagation()
				},
				start: function(a) {
					a = a.touches[0];
					I = a.pageX;
					J = a.pageY;
					H = +new Date;
					G = u = D = void 0;
					l.addEventListener("touchmove", this, !1);
					l.addEventListener("touchend", this, !1);
					l.addEventListener("touchcancel", this, !1);
				},
				move: function(a) {
					if (!(1 < a.touches.length || a.scale && 1 !== a.scale)) {
						h.disableScroll && a.preventDefault();
						var c = a.touches[0];
						u = c.pageX - I;
						G = c.pageY - J;
						"undefined" == typeof D && (D = !!(D || Math.abs(u) < Math.abs(G)));
						D || (a.preventDefault(), A(!0), h.continuous ? (w(f(b - 1), u + v[f(b - 1)], 0), w(b,
							u + v[b], 0), w(f(b + 1), u + v[f(b + 1)], 0)) : (u /= !b && 0 < u || b == n.length - 1 && 0 > u ? Math.abs(u) / m + 1 : 1, w(b - 1, u + v[b - 1], 0), w(b, u + v[b], 0), w(b + 1, u + v[b + 1], 0)))
					}
				},
				end: function(a) {
					a = 250 > Number(+new Date - H) && 20 < Math.abs(u) || Math.abs(u) > m / 2;
					var d = !b && 0 < u || b == n.length - 1 && 0 > u;
					h.continuous && (d = !1);
					var e = 0 > u;
					D || (a && !d ? (e ? (h.continuous ? (g(f(b - 1), -m, 0), g(f(b + 2), m, 0)) : g(b - 1, -m, 0), g(b, v[b] - m, c), g(f(b + 1), v[f(b + 1)] - m, c), b = f(b + 1)) : (h.continuous ? (g(f(b + 1), m, 0), g(f(b - 2), -m, 0)) : g(b + 1, m, 0), g(b, v[b] + m, c), g(f(b - 1), v[f(b - 1)] + m, c), b = f(b - 1)),
						h.callback && h.callback(b, n[b])) : h.continuous ? (g(f(b - 1), -m, c), g(b, 0, c), g(f(b + 1), m, c)) : (g(b - 1, -m, c), g(b, 0, c), g(b + 1, m, c)));
					l.removeEventListener("touchmove", x, !1);
					l.removeEventListener("touchend", x, !1);
					l.removeEventListener("touchcancel", x, !1)
				},
				transitionEnd: function(a) {
					parseInt(a.target.getAttribute("data-index"), 10) == b && (r && C(), h.transitionEnd && h.transitionEnd.call(a, b, n[b]))
				}
			};
		q();
		r && C();
		s.addEventListener ? (s.touch && l.addEventListener("touchstart", x, !1), s.transitions && (l.addEventListener("webkitTransitionEnd", x, !1), l.addEventListener("msTransitionEnd",
			x, !1), l.addEventListener("oTransitionEnd", x, !1), l.addEventListener("otransitionend", x, !1), l.addEventListener("transitionend", x, !1)), window.addEventListener("resize", x, !1)) : window.onresize = function() {
			q()
		};
		z(h.oninit && h.oninit(b, n[b]));
		return {
			setup: function() {
				q()
			},
			stop: A,
			resume: function() {
				A();
				C(!0)
			},
			slide: function(a, b) {
				A();
				k(a, b)
			},
			prev: function() {
				A();
				h.continuous ? k(b - 1) : b && k(b - 1)
			},
			next: function() {
				A();
				d()
			},
			getPos: function() {
				return b
			},
			getNumSlides: function() {
				return e
			},
			kill: function() {
				A();
				l.style.width =
					"auto";
				l.style.left = 0;
				for (var a = n.length; a--;) {
					var b = n[a];
					b.style.width = "100%";
					b.style.left = 0;
					s.transitions && w(a, 0, 0)
				}
				s.addEventListener ? (l.removeEventListener("touchstart", x, !1), l.removeEventListener("webkitTransitionEnd", x, !1), l.removeEventListener("msTransitionEnd", x, !1), l.removeEventListener("oTransitionEnd", x, !1), l.removeEventListener("otransitionend", x, !1), l.removeEventListener("transitionend", x, !1), window.removeEventListener("resize", x, !1)) : window.onresize = null
			}
		}
	}
};