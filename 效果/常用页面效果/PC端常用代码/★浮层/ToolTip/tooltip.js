(function() {


	function ToolTip(node, title, className) {
		title = title || node.getAttribute("title");
		this.title = title;
		var div = document.createElement("div");
		div.className = ["tooltip", className].join(" ");
		div.innerHTML = title.replace(/\n\r|\r\n|\r|\n/g, "<br />");
		this.tip = div;
		this.node = node;
		var _this = this;
		node.removeAttribute("title");

		this.showAt(-1000, -1000);

		this.tipSize = [this.tip.clientWidth, this.tip.clientHeight];
		this.hide();

		addEvent(node, "mouseover", function(evt) {
			_this.show(evt);
		});

		addEvent(node, "mouseout", function() {
			_this.hide();
		});
	}
	ToolTip.offset = 20;
	ToolTip.prototype = {
		show: function(evt) {
			var dw = document.documentElement.clientWidth,
				dh = document.documentElement.clientHeight;


			var w = this.tipSize[0],
				h = this.tipSize[1],
				x, y;

			if (evt.clientX + ToolTip.offset + w > dw && evt.clientX > dw / 2) {
				x = evt.pageX - w - ToolTip.offset;
			} else {
				x = evt.pageX + ToolTip.offset;
			}

			if (evt.clientY + ToolTip.offset + h > dh && evt.clientY > dh / 2) {
				y = evt.pageY - h - ToolTip.offset;
			} else {
				y = evt.pageY + ToolTip.offset;
			}
			this.showAt(x, y);
		},
		showAt: function(x, y) {
			this.tip.style.left = x + "px";
			this.tip.style.top = y + "px";
			document.body.appendChild(this.tip);
		},
		hide: function() {
			if (this.tip.parentNode) {
				this.tip.parentNode.removeChild(this.tip);
			}
		}
	};


	addEvent(window, "load", function() {
		new ToolTip($("tipLink"), "\
		很多的提示信息<br />\
		并且包含HTML,\
		很多很多的提示信息！！！！<br />\
		更多的更多的内容\
		在这里放一张图片也行啊!\
		<img src='images/mj.jpg' style='display:block;width:230px;\
		margin:10px auto;' />");
		var tips = getElementsByClassName("useTooltips");
		for (var i = 0; i < tips.length; i++) {
			new ToolTip(tips[i]);
		}
	});

	function $(id) {
		return document.getElementById(id);
	}

	function getElementsByClassName(name, context) {
		context = context || document;
		if (context.getElementsByClassName) {
			return context.getElementsByClassName(name);
		} else {
			var nodes = context.getElementsByTagName("*"),
				ret = [];
			for (var i = 0; i < nodes.length; i++) {
				if (hasClass(nodes[i], name)) ret.push(nodes[i]);
			}
			return ret;
		}
	}

	function hasClass(node, name) {
		var names = node.className.split(/\s+/);
		for (var i = 0; i < names.length; i++) {
			if (names[i] == name) return true;
		}
		return false;
	}

	function addClass(node, name) {
		if (!hasClass(node, name)) node.className += " " + name;
	}

	function delClass(node, name) {
		var names = node.className.split(/\s+/);
		for (var i = 0; i < names.length; i++) {
			if (names[i] == name) delete names[i];
		}
		node.className = names.join(" ");
	}

	function addEvent(o, evtype, fn) {
		if (o.addEventListener) {
			o.addEventListener(evtype, fn, false);
		} else if (o.attachEvent) {
			o.attachEvent("on" + evtype, function() {
				fn.call(o, fixEvent(window.event));
			});
		} else {
			throw new Error("No event bind method can be used!!!");
		}
	}

	function fixEvent(evt) {
		evt.layerX = evt.offsetX;
		evt.layerY = evt.offsetY;
		evt.target = evt.srcElement;
		evt.pageX = evt.clientX + document.documentElement.scrollLeft;
		evt.pageY = evt.clientY + document.documentElement.scrollTop;
		if (evt.type == "mouseout")
			evt.relatedTarget = evt.toElement;
		else if (evt.type == "mouseover")
			evt.relatedTarget = evt.fromElement;
		else
			evt.relatedTarget = evt.target;

		evt.stopPropagation = function() {
			this.cancelBubble = true;
		};
		evt.preventDefault = function() {
			this.returnValue = false;
		};
		return evt;
	}

	function extend(dest, src) {
		for (var i in src) {
			dest[i] = src[i];
		}
	}
})();