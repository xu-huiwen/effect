(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 945,
	height: 891,
	fps: 18,
	color: "#FFFFFF",
	manifest: [
		{src:"ossweb-img/_01_00000.png?1515056676445", id:"_01_00000"},
		{src:"ossweb-img/_01_00001.png?1515056676445", id:"_01_00001"},
		{src:"ossweb-img/_01_00002.png?1515056676445", id:"_01_00002"},
		{src:"ossweb-img/_01_00003.png?1515056676445", id:"_01_00003"},
		{src:"ossweb-img/_01_00004.png?1515056676445", id:"_01_00004"},
		{src:"ossweb-img/_01_00005.png?1515056676445", id:"_01_00005"},
		{src:"ossweb-img/_01_00006.png?1515056676445", id:"_01_00006"},
		{src:"ossweb-img/_01_00007.png?1515056676445", id:"_01_00007"},
		{src:"ossweb-img/_01_00008.png?1515056676445", id:"_01_00008"}
	]
};



// symbols:



(lib._01_00000 = function() {
	this.initialize(img._01_00000);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00001 = function() {
	this.initialize(img._01_00001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00002 = function() {
	this.initialize(img._01_00002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00003 = function() {
	this.initialize(img._01_00003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00004 = function() {
	this.initialize(img._01_00004);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00005 = function() {
	this.initialize(img._01_00005);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00006 = function() {
	this.initialize(img._01_00006);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00007 = function() {
	this.initialize(img._01_00007);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


(lib._01_00008 = function() {
	this.initialize(img._01_00008);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,891);


// stage content:
(lib._02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_11 = function() {
		this.stop();
		$('#canvas').css('opacity',0);
		$('.wrap').css('opacity',1)
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(11).call(this.frame_11).wait(1));

	// 图层 1
	this.instance = new lib._01_00000();
	this.instance.setTransform(48.9,44.6,0.9,0.9);

	this.instance_1 = new lib._01_00001();
	this.instance_1.setTransform(48.9,44.6,0.9,0.9);

	this.instance_2 = new lib._01_00002();
	this.instance_2.setTransform(48.9,44.6,0.9,0.9);

	this.instance_3 = new lib._01_00003();
	this.instance_3.setTransform(48.9,44.6,0.9,0.9);

	this.instance_4 = new lib._01_00004();
	this.instance_4.setTransform(48.9,44.6,0.9,0.9);

	this.instance_5 = new lib._01_00005();
	this.instance_5.setTransform(48.9,44.6,0.9,0.9);

	this.instance_6 = new lib._01_00006();
	this.instance_6.setTransform(48.9,44.6,0.9,0.9);

	this.instance_7 = new lib._01_00007();
	this.instance_7.setTransform(48.9,44.6,0.9,0.9);

	this.instance_8 = new lib._01_00008();
	this.instance_8.setTransform(48.9,44.6,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(521.4,490.1,850.5,801.9);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;