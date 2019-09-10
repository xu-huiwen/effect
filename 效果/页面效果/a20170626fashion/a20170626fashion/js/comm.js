var Stage = function() {
	function t(t, n, i) {
		var e = this;
		this.canvas = document.getElementById(t), this.ctx = this.canvas.getContext("2d"), this.renderList = [], this.needClear = !0, this.canvas.width = n || $(window).width(), this.canvas.height = i || $(window).height(), $(window).on("resize", function() {
			e.canvas.width = n || $(window).width(), e.canvas.height = i || $(window).height()
		})
	}
	return window.requestAnimationFrame = function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
			window.setTimeout(t, 1e3 / 60)
		}
	}(), t.prototype.update = function() {
		var t = this;
		t.needClear && t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height), t.renderList.forEach(function(n) {
			n(t.ctx, t.canvas)
		}), requestAnimationFrame(function() {
			t.update()
		})
	}, t.prototype.onUpdate = function(t) {
		this.renderList.push(t)
	}, t
}();;
var Twinkle = function() {
	function t(t, e, a) {
		this.initSymbols(t, e, a), this.particles = [], this._pool = [], this.mouse = new s
	}

	function s(t, s) {
		this.x = t || 0, this.y = s || 0
	}

	function e(t, s, e) {
		this.color = n(t), this.size = 2 * (s + e);
		for(var a = 0, i = o.length; i > a; a++) this.push(this._createSymbol(o[a], s, e))
	}

	function a(t, s, e, a, i, o) {
		this.init(t, s, e, a, i, o)
	}

	function i(t, s, e, a, i) {
		return "rgba" === t ? "rgba(" + s + "," + e + "," + a + "," + i + ")" : "hsla" === t ? "hsla(" + s + "," + e + "%," + a + "%," + i + ")" : ""
	}
	if(!document.createElement("canvas").getContext) return $.noop;
	var o = [4, 6, 8, 10, 12],
		h = 2500;
	t.prototype = {
		mouse: null,
		gravity: .035,
		initSymbols: function(t, s, a) {
			this._symbols = new e(t, s, a)
		},
		render: function(t) {
			var s, e, a, i, o, n, r, l, p, c, d, m, u, y, g, f = this.particles,
				v = this.mouse,
				b = this.gravity,
				M = this._symbols,
				x = this._symbols.length,
				_ = this._symbols.size,
				w = .5 * this._symbols.size,
				I = t.canvas.width,
				$ = t.canvas.height;
			if(s = Math.min(.005 * (v.speedX * v.speedX + v.speedY * v.speedY), 1), f.length < h)
				for(e = .5 + 4.5 * s, a = .1 + .5 * s, i = .5 + .5 * s, y = (3 * Math.random() | 0) + (20 * s | 0), u = 0; y > u; u++) this._createParticle(a, e, i);
			for(p = .5 * -I, c = 1.5 * I, d = .5 * -$, m = 1.5 * $, u = 0, y = f.length; y > u; u++) g = f[u], g.vx += .03 * v.speedX * s, g.vy += .03 * v.speedY * s + b, g.x += g.vx + v.speedX, g.y += g.vy + v.speedY, g.scale -= .005, g.angle += Math.random(), g.x + w < p || g.x - w > c || g.y + w < d || g.y - w > m || g.scale <= 0 ? (this._pool.push(g), f.splice(u, 1), y--, u--) : (l = g.scale, o = M[x * Math.random() | 0], Math.random() < .7 && (l *= .2), n = _ * l, r = .5 * n, t.save(), t.globalCompositeOperation = "lighter", t.translate(g.x, g.y), t.rotate(g.angle), t.drawImage(o, 0, 0, _, _, -r, -r, n, n), t.restore());
			t.fill(), v.speedX = v.speedY = 0
		},
		_createParticle: function(t, s, e) {
			var i = t + (s - t) * Math.random(),
				o = 2 * Math.PI * Math.random(),
				h = this._pool.length ? this._pool.shift() : new a;
			h.init(this.mouse.x, this.mouse.y, i * Math.cos(o), i * Math.sin(o), e * Math.random(), 2 * Math.PI * Math.random()), this.particles.push(h)
		}
	}, s.prototype = {
		x: 0,
		y: 0,
		speedX: 0,
		speedY: 0,
		update: function(t, s) {
			this.speedX = .7 * (this.x - t), this.speedY = .7 * (this.y - s), this.x = t, this.y = s
		}
	}, e.prototype = [], e.prototype._createSymbol = function(t, s, e) {
		var a, o, h = this.size,
			n = this.size / 2,
			r = this.color;
		a = document.createElement("canvas"), a.width = a.height = h, o = a.getContext("2d"), o.fillStyle = i(r[0], r[1], r[2], r[3], r[4]), o.shadowBlur = e, o.shadowColor = i(r[0], r[1], r[2], r[3], .75 * r[4]);
		var l, p, c, d;
		for(o.beginPath(), l = 1, p = 2 * t; p >= l; l++) c = l % 2 ? .1 * s : s, d = 2 * Math.PI * l / p, o[1 === l ? "moveTo" : "lineTo"](n + c * Math.cos(d), n + c * Math.sin(d));
		return o.fill(), a
	}, a.prototype.init = function(t, s, e, a, i, o) {
		this.x = t || 0, this.y = s || 0, this.vx = e || 0, this.vy = a || 0, this.scale = i || 0, this.angle = o || 0
	};
	var n = function() {
		var t = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
			s = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)$/,
			e = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)$/,
			a = /^hsla\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)\s*\)$/,
			i = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
		return function(o) {
			o = o.replace(/^\s*#|\s*$/g, ""), o = o.toLowerCase();
			var h;
			return(h = o.match(t) || o.match(s)) ? ["rgba", parseInt(h[1], 10), parseInt(h[2], 10), parseInt(h[3], 10), parseFloat(4 === h.length ? 1 : h[4])] : (h = o.match(e) || o.match(a)) ? ["hsla", parseFloat(h[1]), parseFloat(h[2]), parseFloat(h[3]), parseFloat(4 === h.length ? 1 : h[4])] : (3 === o.length && (o = o.replace(/(.)/g, "$1$1")), (h = o.match(i)) ? ["rgba", parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16), 1] : null)
		}
	}();
	return t
}();;
var Fireworks = function() {
	function t(t) {
		this.dt = 0, this.oldTime = Date.now(), this.canvas = t, this.canvasContainer = $("#canvas-container");
		document.getElementById("canvas-container");
		this.canvas.onselectstart = function() {
			return !1
		}, this.cw = this.canvas.width, this.ch = this.canvas.height, this.particles = [], this.partCount = 30, this.fireworks = [], this.currentHue = 170, this.partSpeed = 8, this.partSpeedVariance = 17, this.partWind = 32, this.partFriction = 6, this.partGravity = 2, this.hueMin = 20, this.hueMax = 20, this.fworkSpeed = 2, this.fworkAccel = 6, this.hueVariance = 180, this.flickerDensity = 22, this.showShockwave = !0, this.showTarget = !1, this.clearAlpha = 25, this.ctx = this.canvas.getContext("2d"), this.ctx.lineCap = "round", this.ctx.lineJoin = "round", this.lineWidth = 1, this.scrollTop = 0, this.scrollLeft = 0
	}

	function i(t, i, s, e) {
		this.group = e, this.x = t, this.y = i, this.coordLast = [{
			x: t,
			y: i
		}, {
			x: t,
			y: i
		}, {
			x: t,
			y: i
		}], this.angle = h(0, 360), this.speed = h(e.partSpeed - e.partSpeedVariance <= 0 ? 1 : e.partSpeed - e.partSpeedVariance, e.partSpeed + e.partSpeedVariance), this.friction = 1 - e.partFriction / 100, this.gravity = e.partGravity / 2, this.hue = h(s - e.hueVariance, s + e.hueVariance), this.brightness = h(50, 80), this.alpha = h(40, 100) / 100, this.decay = h(10, 50) / 1e3, this.wind = (h(0, e.partWind) - e.partWind / 2) / 25, this.lineWidth = e.lineWidth
	}

	function s(t, i, s, e, r) {
		this.group = r, this.x = t, this.y = i, this.startX = t, this.startY = i, this.hitX = !1, this.hitY = !1, this.coordLast = [{
			x: t,
			y: i
		}, {
			x: t,
			y: i
		}, {
			x: t,
			y: i
		}], this.targetX = s, this.targetY = e, this.speed = r.fworkSpeed, this.angle = Math.atan2(e - i, s - t), this.shockwaveAngle = Math.atan2(e - i, s - t) + 90 * (Math.PI / 180), this.acceleration = r.fworkAccel / 100, this.hue = r.currentHue, this.brightness = h(50, 80), this.alpha = h(50, 100) / 100, this.lineWidth = r.lineWidth, this.targetRadius = 1
	}
	if(!document.createElement("canvas").getContext) return $.noop;
	var h = function(t, i) {
			return ~~(Math.random() * (i - t + 1) + t)
		},
		e = function(t, i, s, h, e, r, a, o) {
			return !(e > t + s || t > e + a || r > i + h || i > r + o)
		};
	return t.prototype.createParticles = function(t, s, h) {
		for(var e = this.partCount; e--;) this.particles.push(new i(t, s, h, this))
	}, t.prototype.updateParticles = function() {
		for(var t = this.particles.length; t--;) {
			var i = this.particles[t];
			i.update(t, this.ctx)
		}
	}, t.prototype.drawParticles = function() {
		for(var t = this.particles.length; t--;) {
			var i = this.particles[t];
			i.draw(this.ctx)
		}
	}, t.prototype.createFireworks = function(t, i, h, e) {
		this.fireworks.push(new s(t, i, h, e, this))
	}, t.prototype.updateFireworks = function() {
		for(var t = this.fireworks.length; t--;) {
			var i = this.fireworks[t];
			i.update(t, this.ctx)
		}
	}, t.prototype.drawFireworks = function() {
		for(var t = this.fireworks.length; t--;) {
			var i = this.fireworks[t];
			i.draw(this.ctx)
		}
	}, t.prototype.clear = function() {
		this.particles = [], this.fireworks = []
	}, t.prototype.updateDelta = function() {
		var t = Date.now();
		this.dt = (t - this.oldTime) / 16, this.dt = this.dt > 5 ? 5 : this.dt, this.oldTime = t
	}, t.prototype.render = function() {
		this.updateDelta(), this.ctx.save(), this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillStyle = "rgba(0,0,0," + this.clearAlpha / 100 + ")", this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.globalCompositeOperation = "lighter", this.updateFireworks(), this.updateParticles(), this.drawFireworks(), this.drawParticles(), this.ctx.restore()
	}, i.prototype.update = function(t) {
		var i = this.group,
			s = this.angle * Math.PI / 180,
			h = Math.cos(s) * this.speed,
			r = Math.sin(s) * this.speed + this.gravity;
		this.speed *= this.friction, this.coordLast[2].x = this.coordLast[1].x, this.coordLast[2].y = this.coordLast[1].y, this.coordLast[1].x = this.coordLast[0].x, this.coordLast[1].y = this.coordLast[0].y, this.coordLast[0].x = this.x, this.coordLast[0].y = this.y, this.x += h * i.dt, this.y += r * i.dt, this.angle += this.wind, this.alpha -= this.decay, (!e(0, 0, i.cw, i.ch, this.x - i.scrollLeft - this.radius, this.y - i.scrollTop - this.radius, 2 * this.radius, 2 * this.radius) || this.alpha < .05) && (i.particles.splice(t, 1), this.group = null)
	}, i.prototype.draw = function(t) {
		var i = this.group,
			s = h(1, 3) - 1;
		if(t.beginPath(), t.moveTo(Math.round(this.coordLast[s].x - i.scrollLeft), Math.round(this.coordLast[s].y - i.scrollTop)), t.lineTo(Math.round(this.x - i.scrollLeft), Math.round(this.y - i.scrollTop)), t.closePath(), t.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")", t.stroke(), this.group.flickerDensity > 0) {
			var e = 50 - this.group.flickerDensity;
			if(h(0, e) === e) {
				t.beginPath(), t.arc(Math.round(this.x - i.scrollLeft), Math.round(this.y - i.scrollTop), h(this.lineWidth, this.lineWidth + 3) / 2, 0, 2 * Math.PI, !1), t.closePath();
				var r = h(50, 100) / 100;
				t.fillStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + r + ")", t.fill()
			}
		}
	}, s.prototype.update = function(t, i) {
		i.lineWidth = this.lineWidth;
		var s = this.group,
			e = Math.cos(this.angle) * this.speed,
			r = Math.sin(this.angle) * this.speed;
		if(this.speed *= 1 + this.acceleration, this.coordLast[2].x = this.coordLast[1].x, this.coordLast[2].y = this.coordLast[1].y, this.coordLast[1].x = this.coordLast[0].x, this.coordLast[1].y = this.coordLast[0].y, this.coordLast[0].x = this.x, this.coordLast[0].y = this.y, s.showTarget && (this.targetRadius < 8 ? this.targetRadius += .25 * s.dt : this.targetRadius = 1 * s.dt), this.startX >= this.targetX ? this.x + e <= this.targetX ? (this.x = this.targetX, this.hitX = !0) : this.x += e * s.dt : this.x + e >= this.targetX ? (this.x = this.targetX, this.hitX = !0) : this.x += e * s.dt, this.startY >= this.targetY ? this.y + r <= this.targetY ? (this.y = this.targetY, this.hitY = !0) : this.y += r * s.dt : this.y + r >= this.targetY ? (this.y = this.targetY, this.hitY = !0) : this.y += r * s.dt, this.hitX && this.hitY) {
			{
				h(0, 9)
			}
			s.createParticles(this.targetX, this.targetY, this.hue), s.fireworks.splice(t, 1), this.group = null
		}
	}, s.prototype.draw = function(t) {
		t.lineWidth = this.lineWidth;
		var i = h(1, 3) - 1,
			s = this.group;
		t.beginPath(), t.moveTo(Math.round(this.coordLast[i].x - s.scrollLeft), Math.round(this.coordLast[i].y - s.scrollTop)), t.lineTo(Math.round(this.x - s.scrollLeft), Math.round(this.y - s.scrollTop)), t.closePath(), t.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")", t.stroke(), s.showTarget && (t.save(), t.beginPath(), t.arc(Math.round(this.targetX - s.scrollLeft), Math.round(this.targetY - s.scrollTop), this.targetRadius, 0, 2 * Math.PI, !1), t.closePath(), t.lineWidth = 1, t.stroke(), t.restore()), s.showShockwave && (t.save(), t.translate(Math.round(this.x - s.scrollLeft), Math.round(this.y - s.scrollTop)), t.rotate(this.shockwaveAngle), t.beginPath(), t.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, !0), t.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + h(25, 60) / 100 + ")", t.lineWidth = this.lineWidth, t.stroke(), t.restore())
	}, t.Particle = i, t.Firework = s, t.rand = h, t
}();;
var Index = function() {
	function e() {
		var e = 360 * c / d;
		s.each(function(t, n) {
			var i = l * c + (t - 2) * e;
			$(n).css({
				marginTop: 100 * Math.sin(i) - w / 2,
				marginLeft: 100 * Math.cos(i) - w / 2
			})
		})
	}

	function t() {
		return F.map(function() {
			var e = $(this).data(),
				t = $(this).offset();
			return {
				top: t.top - e.t,
				left: t.left - e.l,
				angle: +e.angle
			}
		})
	}
	var n = $(".js-item").map(function(e, t) {
			var n = $(t);
			return {
				$item: n,
				top: n.offset().top
			}
		}),
		i = $(window).height(),
		o = $(window).scrollTop(),
		r = $(window).scrollLeft(),
		a = 0;
	$(window).on("resize", function() {
		i = $(window).height()
	}), $(window).on("scroll", function() {
		o = $(this).scrollTop(), r = $(window).scrollLeft(), n.length && (a && clearTimeout(a), a = setTimeout(function() {
			if(o > 0) {
				$(".js-cloud").addClass("active");
				for(var e = 0; e < n.length; e++) n[e].top < o + i + 100 && (n[e].$item.addClass("active"), n.splice(e, 1), e--)
			}
		}, 100))
	}), $(window).trigger("scroll"), $(".js-active").hover(function() {
		$(this).addClass("active")
	}, function() {
		$(this).removeClass("active")
	});
	var s = $(".js-lottery-icon"),
		l = 0,
		c = Math.PI / 180,
		d = s.length,
		u = $(".js-lottery-btn"),
		w = s.width(),
		f = $(".js-lottery-higtlight");
	u.click(function() {
		if(!u.hasClass("disabled")) {
			var t = (new Date).getTime(),
				n = Math.floor(8 * Math.random()),
				i = function o() {
					return(new Date).getTime() - t > 6e3 && l % 360 === Math.floor(360 * n / d) ? (u.removeClass("disabled"), void f.show()) : (l++, e(), void requestAnimationFrame(o))
				};
			u.addClass("disabled"), f.hide(), i()
		}
	});
	var h = function() {
		return /(msie|trident)/.test(navigator.userAgent.toLowerCase())
	};
	if(!document.createElement("canvas").getContext || h()) return void $("canvas").remove();
	var v = new Stage("stage1"),
		m = new Twinkle("#fce486", 14, 1);
	m.mouse.update(0, 0), $(window).on("mousemove", function(e) {
		m.mouse.update(e.clientX, e.clientY)
	}), v.onUpdate(function(e) {
		m.render(e)
	}), v.update();
	var p = new Stage("stage3", $(".js-twinkle1").parent().width(), $(".js-twinkle1").parent().height()),
		g = new Twinkle("#fce486", 14, 1),
		k = new Twinkle("#fce486", 14, 1),
		M = $(".js-twinkle1").position(),
		j = $(".js-twinkle2").position();
	g.mouse.update(M.left, M.top), k.mouse.update(j.left, j.top), p.onUpdate(function(e) {
		g.render(e), k.render(e)
	}), p.update();
	var C = new Stage("stage2"),
		T = new Fireworks(C.canvas),
		F = $(".js-fireworks"),
		I = t();
	$(window).on("resize", function() {
		I = t()
	}), T.partCount = 50, T.lineWidth = 1, C.needClear = !1, C.onUpdate(function() {
		T.scrollTop = o, T.scrollLeft = r, T.render()
	}), F.on("mouseenter", function() {
		var e = $(this),
			t = I[F.index(e)],
			n = 0;
		t.timer && clearInterval(t.timer), t.timer = setInterval(function() {
			if(++n > 3) return void clearInterval(t.timer);
			var e = Fireworks.rand(300, T.ch),
				i = Fireworks.rand(t.angle - 30, +t.angle + 10) * Math.PI / 180;
			T.hueVariance = Fireworks.rand(T.hueMin, T.hueMax), T.currentHue = Fireworks.rand(T.hueMin, T.hueMax), T.createFireworks(t.left, t.top, e * Math.cos(i) + t.left, e * Math.sin(i) + t.top)
		}, 800)
	}), C.update()
}();