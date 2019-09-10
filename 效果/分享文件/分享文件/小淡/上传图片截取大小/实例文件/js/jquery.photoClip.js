/**
 * jQuery photoClip v1.5.1
 * �������
 * - iscroll-zoom.js
 * - hammer.js
 *
 * @author �׿��� 625603381@qq.com 2014/07/31
 * https://github.com/baijunjie/jQuery-photoClip
 *
 * @brief	֧�����ƵĲ�ͼ���
 *			���ƶ��豸��˫ָ���Ϊ���ţ�˫ָ��ת�ɸ�����ת����ÿ����ת90��
 *			��PC�豸��������Ϊ���ţ�ÿ��˫����˳ʱ����ת90��
 * @option_param {number} width ��ȡ����Ŀ��
 * @option_param {number} height ��ȡ����ĸ߶�
 * @option_param {string} file �ϴ�ͼƬ��<input type="file">�ؼ���ѡ��������DOM����
 * @option_param {string} view ��ʾ��ȡ��ͼ���������ѡ��������DOM����
 * @option_param {string} ok ȷ�Ͻ�ͼ��ť��ѡ��������DOM����
 * @option_param {string} outputType ָ�����ͼƬ�����ͣ���ѡ "jpg" �� "png" ���������ͣ�Ĭ��Ϊ "jpg"
 * @option_param {boolean} strictSize �Ƿ��ϸ��ս�ȡ�����߲ü���Ĭ��Ϊfalse����ʾ��ȡ�����߽�����Լ����߱������������Ϊtrue�����ʾ��ȡ����ͼ�����ϸ��ս�ȡ���������
 * @option_param {function} loadStart ��ʼ���صĻص�������thisָ�� fileReader ���󣬲������ڼ��ص� file ������Ϊ��������
 * @option_param {function} loadComplete ������ɵĻص�������thisָ��ͼƬ���󣬲���ͼƬ��ַ��Ϊ��������
 * @option_param {function} loadError ����ʧ�ܵĻص�������thisָ�� fileReader ���󣬲��������¼��� event ������Ϊ��������
 * @option_param {function} clipFinish �ü���ɵĻص�������thisָ��ͼƬ���󣬻Ὣ�ü�����ͼ������DataURL��Ϊ��������
 */
var imgsource ='';
(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery", "iscroll-zoom", "hammer"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"), require("iscroll-zoom"), require("hammer"));
	} else {
		factory(root.jQuery, root.IScroll, root.Hammer);
	}

}(this, function($, IScroll, Hammer) {
	"use strict";

	$.fn.photoClip = function(option) {
		if (!window.FileReader) {
			alert("�����������֧�� HTML5 �� FileReader API�� ����޷���ʼ��ͼƬ�ü��������������µ��������");
			return;
		}

		var defaultOption = {
			width: 200,
			height: 200,
			file: "",
			view: "",
			ok: "",
			outputType: "jpg",
			strictSize: false,
			loadStart: function() {},
			loadComplete: function() {},
			loadError: function() {},
			clipFinish: function() {}
		}
		$.extend(defaultOption, option);

		this.each(function() {
			photoClip(this, defaultOption);
		});

		return this;
	}

	function photoClip(container, option) {
		var clipWidth = option.width,
			clipHeight = option.height,
			file = option.file,
			view = option.view,
			ok = option.ok,
			outputType = option.outputType || "image/jpeg",
			strictSize = option.strictSize,
			loadStart = option.loadStart,
			loadComplete = option.loadComplete,
			loadError = option.loadError,
			clipFinish = option.clipFinish;

		if (outputType === "jpg") {
			outputType = "image/jpeg";
		} else if (outputType === "png") {
			outputType = "image/png";
		}

		var $file = $(file);
		if (!$file.length) return;

		var $img,
			imgWidth, imgHeight, //ͼƬ��ǰ�Ŀ��
			imgLoaded; //ͼƬ�Ƿ��Ѿ��������

		$file.attr("accept", "image/*");
		$file.change(function() {
			if (!this.files.length) return;
			if (!/image\/\w+/.test(this.files[0].type)) {
				alert("ͼƬ��ʽ����ȷ����ѡ����ȷ��ʽ��ͼƬ�ļ���");
				return false;
			} else {
				var fileReader = new FileReader();
				fileReader.onprogress = function(e) {
					console.log((e.loaded / e.total * 100).toFixed() + "%");
				};
				fileReader.onload = function(e) {
					var kbs = e.total / 1024;
					if (kbs > 1024) {
						// ͼƬ����1M����Ҫѹ��
						var quality = 1024 / kbs;
						var $tempImg = $("<img>").hide();
						$tempImg.load(function() {
							// IOS �豸�У��������Ƭ����������ģ���Ȼʵ������ҳ����ʾ���ķ���Ҳ�Ǵ�ֱ����ͼƬ������Ȼ���Ժ�������չʾ
							var sourceWidth = this.naturalWidth; // ��û�м����ĵ�ǰ��jQuery�޷������ȷ��ߣ�������ͨ��ԭ����������ȡ
							$tempImg.appendTo(document.body);
							var realityHeight = this.naturalHeight;
							$tempImg.remove();
							delete $tempImg[0];
							$tempImg = null;
							var angleOffset = 0;
							if (sourceWidth == realityHeight) {
								angleOffset = 90;
							}
							// ��ͼƬ����ѹ��
							var newDataURL = compressImg(this, quality, angleOffset, outputType);
							createImg(newDataURL);
						});
						$tempImg.attr("src", this.result);
					} else {
						createImg(this.result);
					}
				};
				fileReader.onerror = function(e) {
					alert("ͼƬ����ʧ��");
					loadError.call(this, e);
				};
				fileReader.readAsDataURL(this.files[0]); // ��ȡ�ļ�����

				loadStart.call(fileReader, this.files[0]);
			}
		});

		$file.click(function() {
			this.value = "";
		});



		var $container, // �����������ü���ͼ������ֲ�
			$clipView, // �ü���ͼ�㣬�����ƶ���
			$moveLayer, // �ƶ��㣬������ת��
			$rotateLayer, // ��ת��
			$view, // ���ս�ͼ����ֵ���ͼ����
			canvas, // ͼƬ�ü��õ��Ļ���
			myScroll, // ͼƬ��scroll���󣬰���ͼƬ��λ����������Ϣ
			containerWidth,
			containerHeight;

		init();
		initScroll();
		initEvent();
		initClip();

		var $ok = $(ok);
		if ($ok.length) {
			$ok.click(function() {
				clipImg();
			});
		}

		var $win = $(window);
		resize();
		$win.resize(resize);

		var atRotation, // �Ƿ�������ת��
			curX, // ��ת��ĵ�ǰX����
			curY, // ��ת��ĵ�ǰY����
			curAngle; // ��ת��ĵ�ǰ�Ƕ�

		function imgLoad() {
			imgLoaded = true;

			$rotateLayer.append(this);

			hideAction.call(this, $img, function() {
				imgWidth = this.naturalWidth;
				imgHeight = this.naturalHeight;
			});

			hideAction($moveLayer, function() {
				resetScroll();
			});


			loadComplete.call(this, this.src);
		}

		function initScroll() {
			var options = {
				zoom: true,
				scrollX: true,
				scrollY: true,
				freeScroll: true,
				mouseWheel: true,
				wheelAction: "zoom"
			}
			myScroll = new IScroll($clipView[0], options);
		}
		function resetScroll() {
			curX = 0;
			curY = 0;
			curAngle = 0;

			$rotateLayer.css({
				"width": imgWidth,
				"height": imgHeight
			});
			setTransform($rotateLayer, curX, curY, curAngle);

			calculateScale(imgWidth, imgHeight);
			myScroll.zoom(myScroll.options.zoomStart);
			refreshScroll(imgWidth, imgHeight);

			var posX = (clipWidth - imgWidth * myScroll.options.zoomStart) * .5,
				posY = (clipHeight - imgHeight * myScroll.options.zoomStart) * .5;
			myScroll.scrollTo(posX, posY);
		}
		function refreshScroll(width, height) {
			$moveLayer.css({
				"width": width,
				"height": height
			});
			// ���ƶ��豸�ϣ�������Android�豸����Ϊһ��Ԫ�������˿��ʱ
			// ��Ԫ�ص�offsetWidth/offsetHeight��clientWidth/clientHeight�����Բ������������£�������ص�js������ִ���
			// iscroll ��ˢ�·���������ʹ���� offsetWidth/offsetHeight ����ȡscrollerԪ��($moveLayer)�Ŀ��
			// �����Ҫ�ֶ���Ԫ��������ӽ��ĵ�����ʹ�����ǿ�Ƹ���Ԫ�صĿ��
			$clipView.append($moveLayer);
			myScroll.refresh();
		}

		function initEvent() {
			var is_mobile = !!navigator.userAgent.match(/mobile/i);

			if (is_mobile) {
				var hammerManager = new Hammer($moveLayer[0]);
				hammerManager.add(new Hammer.Rotate());

				var rotation, rotateDirection;
				hammerManager.on("rotatemove", function(e) {
					if (atRotation) return;
					rotation = e.rotation;
					if (rotation > 180) {
						rotation -= 360;
					} else if (rotation < -180) {
						rotation += 360  ;
					}
					rotateDirection = rotation > 0 ? 1 : rotation < 0 ? -1 : 0;
				});
				hammerManager.on("rotateend", function(e) {
					if (atRotation) return;

					if (Math.abs(rotation) > 30) {
						if (rotateDirection == 1) {
							// ˳ʱ��
							rotateCW(e.center);
						} else if (rotateDirection == -1) {
							// ��ʱ��
							rotateCCW(e.center);
						}
					}
				});
			} else {
				$moveLayer.on("dblclick", function(e) {
					rotateCW({
						x: e.clientX,
						y: e.clientY
					});
				});
			}
		}
		function rotateCW(point) {
			rotateBy(90, point);
		}
		function rotateCCW(point) {
			rotateBy(-90, point);
		}
		function rotateBy(angle, point) {
			if (atRotation) return;
			atRotation = true;

			var loacl;
			if (!point) {
				loacl = loaclToLoacl($moveLayer, $clipView, clipWidth * .5, clipHeight * .5);
			} else {
				loacl = globalToLoacl($moveLayer, point.x, point.y);
			}
			var origin = calculateOrigin(curAngle, loacl), // ��ת��ʹ�õĲο�������
				originX = origin.x,
				originY = origin.y,

				// ��ת������λΪ�ο�����ת���½ǶȺ��λ�ã����Ե�ǰ����Ĳο��㡰����ȡ���ת���½ǶȺ��λ�ã�֮������Ͻ�ƫ����
				offsetX = 0, offsetY = 0,
				// �ƶ��㵱ǰ��λ�ã�����ת����תǰ��λ�ã�������ת���Ե�ǰ����Ĳο���ӵ�ǰ�Ƕ���ת���½ǶȺ��λ�ã�֮������Ͻ�ƫ����
				parentOffsetX = 0, parentOffsetY = 0,

				newAngle = curAngle + angle,

				curImgWidth, // �ƶ���ĵ�ǰ���
				curImgHeight; // �ƶ���ĵ�ǰ�߶�


			if (newAngle == 90 || newAngle == -270)
			{
				offsetX = originX + originY;
				offsetY = originY - originX;

				if (newAngle > curAngle) {
					parentOffsetX = imgHeight - originX - originY;
					parentOffsetY = originX - originY;
				} else if (newAngle < curAngle) {
					parentOffsetX = (imgHeight - originY) - (imgWidth - originX);
					parentOffsetY = originX + originY - imgHeight;
				}

				curImgWidth = imgHeight;
				curImgHeight = imgWidth;
			}
			else if (newAngle == 180 || newAngle == -180)
			{
				offsetX = originX * 2;
				offsetY = originY * 2;

				if (newAngle > curAngle) {
					parentOffsetX = (imgWidth - originX) - (imgHeight - originY);
					parentOffsetY = imgHeight - (originX + originY);
				} else if (newAngle < curAngle) {
					parentOffsetX = imgWidth - (originX + originY);
					parentOffsetY = (imgHeight - originY) - (imgWidth - originX);
				}

				curImgWidth = imgWidth;
				curImgHeight = imgHeight;
			}
			else if (newAngle == 270 || newAngle == -90)
			{
				offsetX = originX - originY;
				offsetY = originX + originY;

				if (newAngle > curAngle) {
					parentOffsetX = originX + originY - imgWidth;
					parentOffsetY = (imgWidth - originX) - (imgHeight - originY);
				} else if (newAngle < curAngle) {
					parentOffsetX = originY - originX;
					parentOffsetY = imgWidth - originX - originY;
				}

				curImgWidth = imgHeight;
				curImgHeight = imgWidth;
			}
			else if (newAngle == 0 || newAngle == 360 || newAngle == -360)
			{
				offsetX = 0;
				offsetY = 0;

				if (newAngle > curAngle) {
					parentOffsetX = originX - originY;
					parentOffsetY = originX + originY - imgWidth;
				} else if (newAngle < curAngle) {
					parentOffsetX = originX + originY - imgHeight;
					parentOffsetY = originY - originX;
				}

				curImgWidth = imgWidth;
				curImgHeight = imgHeight;
			}

			// ����������Ϊ��תʱ�Ĳο���
			// �ı�ο����ͬʱ��Ҫ���������ƫ�ƣ��Ӷ���֤ͼƬλ�ò������仯
			if (curAngle == 0) {
				curX = 0;
				curY = 0;
			} else if (curAngle == 90 || curAngle == -270) {
				curX -= originX + originY;
				curY -= originY - originX;
			} else if (curAngle == 180 || curAngle == -180) {
				curX -= originX * 2;
				curY -= originY * 2;
			} else if (curAngle == 270 || curAngle == -90) {
				curX -= originX - originY;
				curY -= originX + originY;
			}
			curX = curX.toFixed(2) - 0;
			curY = curY.toFixed(2) - 0;
			setTransform($rotateLayer, curX, curY, curAngle, originX, originY);

			// ��ʼ��ת
			setTransition($rotateLayer, curX, curY, newAngle, 200, function() {
				atRotation = false;
				curAngle = newAngle % 360;
				// ��ת��ɺ󽫲ο��������λ
				// ͬʱ����ƫ�ƣ���֤ͼƬλ�ÿ���ȥû�б仯
				// ����Ҫ����Ҫ���ϸ��������ƶ��㣩��λ������֮���ƫ����
				curX += offsetX + parentOffsetX;
				curY += offsetY + parentOffsetY;
				curX = curX.toFixed(2) - 0;
				curY = curY.toFixed(2) - 0;
				setTransform($rotateLayer, curX, curY, curAngle);
				// ��Ӧ�ĸ��������ƶ��㣩Ҫ��ȥ����ת��֮���ƫ����
				// ��������ȥ�ͺ���ͼƬû���ƶ�
				myScroll.scrollTo(
					myScroll.x - parentOffsetX * myScroll.scale,
					myScroll.y - parentOffsetY * myScroll.scale
				);
				calculateScale(curImgWidth, curImgHeight);
				if (myScroll.scale < myScroll.options.zoomMin) {
					myScroll.zoom(myScroll.options.zoomMin);
				}

				refreshScroll(curImgWidth, curImgHeight);
			});
		}

		function initClip() {

			canvas = document.createElement("canvas");
			canvas.width = clipWidth;
			canvas.height = clipHeight;
		}
		function clipImg() {
			if (!imgLoaded) {
//				alert("�ף���ǰû��ͼƬ���Բü�!");
				return;
			}
			var local = loaclToLoacl($moveLayer, $clipView);
			var scale = myScroll.scale;
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();

			if (strictSize) {
				ctx.scale(scale, scale);
			} else {
				canvas.width = clipWidth / scale;
				canvas.height = clipHeight / scale;
			}

			ctx.translate(curX - local.x / scale, curY - local.y / scale);
			ctx.rotate(curAngle * Math.PI / 180);

			ctx.drawImage($img[0], 0, 0);
			ctx.restore();

			var dataURL = canvas.toDataURL(outputType, 1);
            imgsource =dataURL;
			$view.css("background-image", "url("+ dataURL +")");
			clipFinish.call($img[0], dataURL);
		}


		function resize() {
			hideAction($container, function() {
				containerWidth = $container.width();
				containerHeight = $container.height();
			});
		}
		function loaclToLoacl($layerOne, $layerTwo, x, y) { // ����$layerTwo�ϵ�x��y������$layerOne�ϵ�����
			x = x || 0;
			y = y || 0;
			var layerOneOffset, layerTwoOffset;
			hideAction($layerOne, function() {
				layerOneOffset = $layerOne.offset();
			});
			hideAction($layerTwo, function() {
				layerTwoOffset = $layerTwo.offset();
			});
			return {
				x: layerTwoOffset.left - layerOneOffset.left + x,
				y: layerTwoOffset.top - layerOneOffset.top + y
			};
		}
		function globalToLoacl($layer, x, y) { // ��������ڴ��ڵ�x��y������$layer�ϵ�����
			x = x || 0;
			y = y || 0;
			var layerOffset;
			hideAction($layer, function() {
				layerOffset = $layer.offset();
			});
			return {
				x: x + $win.scrollLeft() - layerOffset.left,
				y: y + $win.scrollTop() - layerOffset.top
			};
		}
		function hideAction(jq, func) {
			var $hide = $();
			$.each(jq, function(i, n){
				var $n = $(n);
				var $hidden = $n.parents().andSelf().filter(":hidden");
				var $none;
				for (var i = 0; i < $hidden.length; i++) {
					if (!$n.is(":hidden")) break;
					$none = $hidden.eq(i);
					if ($none.css("display") == "none") $hide = $hide.add($none.show());
				}
			});
			if (typeof(func) == "function") func.call(this);
			$hide.hide();
		}
		function calculateOrigin(curAngle, point) {
			var scale = myScroll.scale;
			var origin = {};
			if (curAngle == 0) {
				origin.x = point.x / scale;
				origin.y = point.y / scale;
			} else if (curAngle == 90 || curAngle == -270) {
				origin.x = point.y / scale;
				origin.y = imgHeight - point.x / scale;
			} else if (curAngle == 180 || curAngle == -180) {
				origin.x = imgWidth - point.x / scale;
				origin.y = imgHeight - point.y / scale;
			} else if (curAngle == 270 || curAngle == -90) {
				origin.x = imgWidth - point.y / scale;
				origin.y = point.x / scale;
			}
			return origin;
		}
		function getScale(w1, h1, w2, h2) {
			var sx = w1 / w2;
			var sy = h1 / h2;
			return sx > sy ? sx : sy;
		}
		function calculateScale(width, height) {
			myScroll.options.zoomMin = getScale(clipWidth, clipHeight, width, height);
			myScroll.options.zoomMax = Math.max(1, myScroll.options.zoomMin);
			myScroll.options.zoomStart = Math.min(myScroll.options.zoomMax, getScale(containerWidth, containerHeight, width, height));
		}
		function compressImg(sourceImgObj, quality, angleOffset, outputFormat){
			quality = quality || .8;
			angleOffset = angleOffset || 0;
			var mimeType = outputFormat || "image/jpeg";

			var drawWidth = sourceImgObj.naturalWidth,
				drawHeight = sourceImgObj.naturalHeight;
			// IOS �豸�� canvas ����������� 1024�����п��ܵ���Ӧ�ñ�������
			// ���������Ҫ����
			var maxSide = Math.max(drawWidth, drawHeight);
			if (maxSide > 1024) {
				var minSide = Math.min(drawWidth, drawHeight);
				minSide = minSide / maxSide * 1024;
				maxSide = 1024;
				if (drawWidth > drawHeight) {
					drawWidth = maxSide;
					drawHeight = minSide;
				} else {
					drawWidth = minSide;
					drawHeight = maxSide;
				}
			}

			var cvs = document.createElement('canvas');
			var ctx = cvs.getContext("2d");
			if (angleOffset) {
				cvs.width = drawHeight;
				cvs.height = drawWidth;
				ctx.translate(drawHeight, 0);
				ctx.rotate(angleOffset * Math.PI / 180);
			} else {
				cvs.width = drawWidth;
				cvs.height = drawHeight;
			}

			ctx.drawImage(sourceImgObj, 0, 0, drawWidth, drawHeight);
			var newImageData = cvs.toDataURL(mimeType, quality || .8);
			return newImageData;
		}
		function createImg(src) {
			if ($img && $img.length) {
				// ɾ���ɵ�ͼƬ���ͷ��ڴ棬��ֹIOS�豸��webview����
				$img.remove();
				delete $img[0];
			}
			$img = $("<img>").css({
				"user-select": "none",
				"pointer-events": "none"
			});
			$img.load(imgLoad);
			$img.attr("src", src); // ����ͼƬbase64ֵ
		}

		function setTransform($obj, x, y, angle, originX, originY) {
			originX = originX || 0;
			originY = originY || 0;
			var style = {};
			style[prefix + "transform"] = "translateZ(0) translate(" + x + "px," + y + "px) rotate(" + angle + "deg)";
			style[prefix + "transform-origin"] = originX + "px " + originY + "px";
			$obj.css(style);
		}
		function setTransition($obj, x, y, angle, dur, fn) {
			// ������Ҫ�ȶ�ȡ֮ǰ���úõ�transform��ʽ��ǿ�������������ʽֵ��Ⱦ��Ԫ��
			// ������������ܳ������ܿ��ǣ����ݻ���ʽ��Ⱦ���ȵ�֮��������ʽ������ɺ���ͳһ��Ⱦ
			// �����ͻᵼ��֮ǰ���õ�λ��Ҳ��Ӧ�õ�������
			$obj.css(prefix + "transform");
			$obj.css(prefix + "transition", prefix + "transform " + dur + "ms");
			$obj.one(transitionEnd, function() {
				$obj.css(prefix + "transition", "");
				fn.call(this);
			});
			$obj.css(prefix + "transform", "translateZ(0) translate(" + x + "px," + y + "px) rotate(" + angle + "deg)");
		}

		function init() {
			// ��ʼ������
			$container = $(container).css({
				"user-select": "none",
				"overflow": "hidden"
			});
			if ($container.css("position") == "static") $container.css("position", "relative");

			// �����ü���ͼ��
			$clipView = $("<div class='photo-clip-view'>").css({
				"position": "absolute",
				"left": "50%",
				"top": "50%",
				"width": clipWidth,
				"height": clipHeight,
				"margin-left": -clipWidth/2,
				"margin-top": -clipHeight/2
			}).appendTo($container);

			$moveLayer = $("<div class='photo-clip-moveLayer'>").appendTo($clipView);

			$rotateLayer = $("<div class='photo-clip-rotateLayer'>").appendTo($moveLayer);

			// ��������
			var $mask = $("<div class='photo-clip-mask'>").css({
				"position": "absolute",
				"left": 0,
				"top": 0,
				"width": "100%",
				"height": "100%",
				"pointer-events": "none"
			}).appendTo($container);
			var $mask_left = $("<div class='photo-clip-mask-left'>").css({
				"position": "absolute",
				"left": 0,
				"right": "50%",
				"top": "50%",
				"bottom": "50%",
				"width": "auto",
				"height": clipHeight,
				"margin-right": clipWidth/2,
				"margin-top": -clipHeight/2,
				"margin-bottom": -clipHeight/2,
				"background-color": "rgba(0,0,0,.5)"
			}).appendTo($mask);
			var $mask_right = $("<div class='photo-clip-mask-right'>").css({
				"position": "absolute",
				"left": "50%",
				"right": 0,
				"top": "50%",
				"bottom": "50%",
				"margin-left": clipWidth/2,
				"margin-top": -clipHeight/2,
				"margin-bottom": -clipHeight/2,
				"background-color": "rgba(0,0,0,.5)"
			}).appendTo($mask);
			var $mask_top = $("<div class='photo-clip-mask-top'>").css({
				"position": "absolute",
				"left": 0,
				"right": 0,
				"top": 0,
				"bottom": "50%",
				"margin-bottom": clipHeight/2,
				"background-color": "rgba(0,0,0,.5)"
			}).appendTo($mask);
			var $mask_bottom = $("<div class='photo-clip-mask-bottom'>").css({
				"position": "absolute",
				"left": 0,
				"right": 0,
				"top": "50%",
				"bottom": 0,
				"margin-top": clipHeight/2,
				"background-color": "rgba(0,0,0,.5)"
			}).appendTo($mask);
			// ������ȡ����
			var $clip_area = $("<div class='photo-clip-area'>").css({
				"border": "1px dashed #ddd",
				"position": "absolute",
				"left": "50%",
				"top": "50%",
				"width": clipWidth,
				"height": clipHeight,
				"margin-left": -clipWidth/2 - 1,
				"margin-top": -clipHeight/2 - 1
			}).appendTo($mask);

			// ��ʼ����ͼ����
			$view = $(view);
			if ($view.length) {
				$view.css({
					"background-color": "#666",
					"background-repeat": "no-repeat",
					"background-position": "center",
					"background-size": "contain"
				});
			}
		}
	}

	var prefix = '',
		transitionEnd;

	(function() {

		var eventPrefix,
			vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
	    	testEl = document.documentElement,
	    	normalizeEvent = function(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() };

		for (var i in vendors) {
			if (testEl.style[i + 'TransitionProperty'] !== undefined) {
				prefix = '-' + i.toLowerCase() + '-';
				eventPrefix = vendors[i];
				break;
			}
		}

		transitionEnd = normalizeEvent('TransitionEnd');

	})();

	return $;
}));
