var winObjHeight = document.documentElement.clientHeight,
	winObjWidth = document.documentElement.clientWidth;
function translate(obj, tx, ty, rt, speed, ease) {
	var style = obj && obj.style;
	if (!style) return;
	if (ease) {
		style.webkitTransitionTimingFunction =
			style.MozTransitionTimingFunction =
			style.msTransitionTimingFunction =
			style.OTransitionTimingFunction =
			style.transitionTimingFunction = ease;
	}
	style.webkitTransitionDuration =
		style.MozTransitionDuration =
		style.msTransitionDuration =
		style.OTransitionDuration =
		style.transitionDuration = speed + 'ms';

	style.webkitTransform =
		style.msTransform =
		style.MozTransform =
		style.OTransform = 'rotateY(' + rt + 'deg) translate(' + tx + 'px, ' + ty + 'px)' + 'translateZ(0)';
}

var page2 = {
	listArr: ['pop2', 'p2bot', 'p2con', 'p2top', 'p2title', 'p2dot1', 'p2c1', 'p2dot2', 'p2c2', 'p2dot3', 'p2c3', 'p2top1', 'p2top2', 'p2top3'],
	objArr: [],
	delta: {},
	// isOut: false,
	nowPos1: 0,
	nowPos2: 0,
	nowPos3: 0,
	maxH: 3100,
	handleEvent: function(e) {
		switch (e.type) {
			case 'resize':
				this.resize();
				break;
			case 'touchstart':
				this.touchstart(e);
				break;
			case 'touchmove':
				this.touchmove(e);
				break;
			case 'touchend':
				this.touchend(e);
				break;
		}
	},
	touchstart: function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		this.delta.x = touch.pageX;
		this.delta.y = touch.pageY;
		this.delta.difx = 0;
		this.delta.dify = 0;
		this.delta.time = +new Date;
	},
	touchmove: function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		var nx = touch.pageX;
		var ny = touch.pageY;
		var difx = nx - this.delta.x;
		var dify = (ny - this.delta.y) * 0.8;
		this.delta.difx = difx;
		this.delta.dify = dify;
		if (Math.abs(difx) < Math.abs(dify)) {
			translate(this.objArr['p2bot'][0], 0, this.nowPos1 + dify * 0.5, 0, 0);
			translate(this.objArr['p2con'][0], 0, this.nowPos2 + dify, 0, 0);
			translate(this.objArr['p2top'][0], 0, this.nowPos3 + dify * 1.3, 0, 0);
		} else {
			return;
			// if (difx > 0) {
			// 	var rt = difx * 0.1;
			// 	translate(this.objArr['pop2'].get(0), 0, 0, rt, 0);
			// }
		}
	},
	touchend: function(e) {
		e.preventDefault();
		// if (this.isOut) {
		// 	return;
		// }
		// if (e.target.id == 'maskbg') {
		// 	$('#maskbg').hide();
		// 	$('#wxtips').hide();
		// 	if (this.isVideo) {
		// 		this.isVideo = false;
		// 		$('#videoCon').empty().hide();
		// 	}
		// 	translate(this.objArr['pop2'].get(0), 0, 0, 0, 0);
		// 	return;
		// }
		// if (e.target.id == 'shareBtn') {
		// 	this.showShare();
		// 	translate(this.objArr['pop2'].get(0), 0, 0, 0, 0);
		// 	return;
		// }
		var difx = this.delta.difx;
		var dify = this.delta.dify;
		// var duration = +new Date - this.delta.time;
		// var isChg;
		if (Math.abs(difx) < Math.abs(dify)) {
			dify *= 1.5;
			this.nowPos1 = this.nowPos1 + dify * 0.5;
			this.nowPos2 = this.nowPos2 + dify;
			this.nowPos3 = this.nowPos3 + dify * 1.3;
			if (this.nowPos2 > 0) {
				this.nowPos1 = 0;
				this.nowPos2 = 0;
				this.nowPos3 = 0;
			} else if (Math.abs(this.nowPos2) > this.maxH - winObjHeight) {
				this.nowPos2 = winObjHeight - this.maxH;
				this.nowPos1 = this.nowPos2 * 0.5;
				this.nowPos3 = this.nowPos2 * 1.3;
			}
			translate(this.objArr['p2bot'][0], 0, this.nowPos1, 0, 300, 'ease-out');
			translate(this.objArr['p2con'][0], 0, this.nowPos2, 0, 300, 'ease-out');
			translate(this.objArr['p2top'][0], 0, this.nowPos3, 0, 300, 'ease-out');
			translate(this.objArr['pop2'][0], 0, 0, 0, 0);
		} else {
			return;
			// isChg = duration < 250 && Math.abs(difx) > 20 || Math.abs(difx) > winObj.width() * 0.3;
			// if (isChg) {
			// 	if (difx > 0) {
			// 		translate(this.objArr['pop2'].get(0), 0, 0, 90, 300, 'ease-out');
			// 		this.isOut = true;
			// 		setTimeout(function() {
			// 			page2.hide();
			// 			// page3.show('back');
			// 		}, 300);
			// 	}
			// } else {
			// 	translate(this.objArr['pop2'].get(0), 0, 0, 0, 300);
			// }
		}
	},
	addEvent: function() {
		window.addEventListener('touchstart', this, false);
		window.addEventListener('touchmove', this, false);
		window.addEventListener('touchend', this, false);
	},
	removeEvent: function() {
		window.removeEventListener('touchstart', this, false);
		window.removeEventListener('touchmove', this, false);
		window.removeEventListener('touchend', this, false);
	},
	init: function() {
		var len = this.listArr.length;
		for (var i = 0; i < len; i++) {
			this.objArr[this.listArr[i]] = document.querySelectorAll('#' + this.listArr[i]);
		}
		this.addEvent();
	}
}
page2.init();

