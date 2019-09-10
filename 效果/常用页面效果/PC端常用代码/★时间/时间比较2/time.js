Date.prototype.compare = function(a) {
    	if (typeof(a) != "object" && a.constructor != Date) {
    		return -2
    	}
    	var d = this.getTime() - a.getTime();
    	if (d > 0) {
    		return 1
    	} else {
    		if (d == 0) {
    			return 0
    		} else {
    			return -1
    		}
    	}
    }
    Date.getDateFromDateStr = function(a, b) {
    	a = a + '';
    	if (typeof(b) != 'string') {
    		b = 'yyyy-MM-dd hh:mm:ss'
    	}
    	var c = {
    		yearStr: '',
    		monthStr: '',
    		dateStr: '',
    		hourStr: '00',
    		minuteStr: '00',
    		secondStr: '00'
    	}; {
    		var d = /(y{2,4})|(d{1,2})|(h{1,2})|(s{1,2})/ig;
    		var e = b.match(d);
    		for (var i = 0; i < e.length; i++) {
    			e[i] = e[i].toLowerCase();
    			var f = a.substr(b.indexOf(e[i]), e[i].length);
    			if (f && !isNaN(f) && f * 1 == parseInt(f * 1, 10)) {
    				if (/y+/.test(e[i])) {
    					c.yearStr = f
    				}
    				if (/d+/.test(e[i])) {
    					c.dateStr = f
    				}
    				if (/h+/.test(e[i])) {
    					c.hourStr = f
    				}
    				if (/s+/.test(e[i])) {
    					c.secondStr = f
    				}
    			}
    		}
    	} {
    		var d = /M{1,2}/g;
    		var e = b.match(d);
    		if (e && e.length == 1) {
    			var f = a.substr(b.indexOf(e[0]), e[0].length);
    			if (f && !isNaN(f) && f * 1 == parseInt(f * 1, 10)) {
    				c.monthStr = f
    			}
    		}
    		d = /m{1,2}/g;
    		e = b.match(d);
    		if (e && e.length == 1) {
    			var f = a.substr(b.indexOf(e[0]), e[0].length);
    			if (f && !isNaN(f) && f * 1 == parseInt(f * 1, 10)) {
    				c.minuteStr = f
    			}
    		}
    	} {
    		var g = new Date();
    		if (!c.dateStr) {
    			c.dateStr = String(g.getDate())
    		}
    		if (!c.monthStr) {
    			c.monthStr = String(g.getMonth() + 1)
    		}
    		if (!c.yearStr) {
    			c.yearStr = String(g.getFullYear())
    		}
    		var h = c.yearStr + '-' + c.monthStr + '-' + c.dateStr + ' ' + c.hourStr + ':' + c.minuteStr + ':' + c.secondStr
    	}
    	return new Date(c.yearStr * 1, (c.monthStr * 1 - 1), c.dateStr * 1, c.hourStr * 1, c.minuteStr * 1, c.secondStr * 1)
    };