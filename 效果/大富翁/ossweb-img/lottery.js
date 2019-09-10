//时间
function timer(){
	function getNow(s) {
	    return s < 10 ? '0' + s: s;
	}
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();  
	var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m);
	return now;
}
setInterval(function(){
	timer()
},1000)
//抽奖
var arr=[[0.3,0.24],[1.46,0.25],[2.62,0.25],[3.77,0.25],[4.92,0.25],[6.07,0.25],[6.07,1.48],[6.07,2.67],[6.08,3.86],[6.08,5.05],[6.08,6.24],[6.08,7.43],[6.08,8.62],[6.08,9.82],[6.08,11.01],[4.93,11.01],[3.78,11.01],[2.62,11.01],[1.46,11.01],[1.46,9.82],[0.3,9.82],[0.3,8.62],[0.3,7.43],[0.3,6.24],[1.46,6.24],[1.45,5.05],[1.46,3.86],[1.46,2.67],[0.3,2.67],[0.3,1.48]];
 var stepList=arr,
        currentStep=0,//光圈位置，这个参数需要开发传进来
        isGameOver=0;
    function renderSteps(){
        $("#gamesteps .step-item").each(function(i){
            $(this).css({"top":stepList[i][1]+"rem","left":stepList[i][0]+"rem"});
        });
    }
    renderSteps();
    var gameDFW=function(options){
        var defaults = {
            'domId':'',
            'curstep': 0,//默认是0，第1个
            'hongbaoId':'',
            'maxstep':29//最高步数
        };
        $.extend(this, defaults, options || {});
        var me = this;
        //me.create();
        me.init();
    };
    gameDFW.prototype={
        init:function(){
            var me = this;
            $(me.domId+' .step').animate({"left":(stepList[me.curstep][0])+"rem","top":(stepList[me.curstep][1])+"rem"},100);
        },
        renderStep:function(opt){           
            var me = this;
            me.curstep=opt.curstep;
            me.init();
        },
        //播放骰子
        play:function(rollstep){
            console.log('步数：'+rollstep);
            var me = this;
            var dice = $(me.domId+" .dice");
            $(me.domId+" .dice-mask").show();
            dice.attr("class","dice");//清除上次动画后的点数
            dice.animate({left: '+2px'},0,function(){
                dice.addClass("dice_t");
            }).delay(200).animate({top:'-2px'},100,function(){
                dice.removeClass("dice_t").addClass("dice_s");
            }).delay(200).animate({opacity: 'show'},600,function(){
                dice.removeClass("dice_s").addClass("dice_e");
            }).delay(100).animate({left:'-2px',top:'2px'},100,function(){
                dice.removeClass("dice_e").addClass("dice_"+rollstep);
                $(me.domId+" .dice-mask").hide();
                me.roll(rollstep);
            });
            
        },
        roll:function(rollstep){
            var me = this;
            var i=0;
            function rollAnimate(){   
                i++;
                if(me.curstep<me.maxstep){
                    if(i<=rollstep){
                        setTimeout(function(){
                            me.curstep++;
                            console.log(i);
                            $(me.domId+' .step').animate({"left":(stepList[me.curstep][0])+"rem","top":(stepList[me.curstep][1])+"rem"},100,function(){
                                //me.curstep++;
                                currentStep++;
                            });
                            rollAnimate();
                            if(i==0){
                            setTimeout(function(){
		                        me.curstep++;
		                        console.log(i);
		                        $(me.domId+' .step').animate({"left":(stepList[me.curstep][0])+"rem","top":(stepList[me.curstep][1])+"rem"},100,function(){
		                            //me.curstep++;
		                            currentStep++;
		                        });
		                        rollAnimate();
		                    },200);
                            }
                            //到达结束点
		                    if(currentStep>=28){
		                    	setTimeout(function(){
		                    		$(".bx_con").fadeIn(650)
		                    		$(".btn_bx em").addClass("btn_ani")//左下角宝箱动效
		                    		$(".btn_start").click(function(){
								    	TGDialogS('pop3')
								    });
		                    	},350)
		                    	setTimeout(function(){
		                    		TGDialogS('pop2')
		                    	},2200)
		                    	setTimeout(function(){
		                    		$(".bx_con").hide()
		                    	},2400)
		                    }
                        },200);
                    }else{
                        var _stepCallback = me.stepCallback || function () {};
                        _stepCallback({"isOver":0,'curstep':me.curstep});
                        
                    }
                }
            }
            rollAnimate();
        }
    };
    var gamedfw = new gameDFW({
        'maxstep':(stepList.length-1),
        'domId':'#gameDFW',
        'curstep':currentStep,
        'stepCallback':function(data){
//      	console.log('第'+data.curstep+'个奖品');
        	$(".gift_li").remove()
        	$(".dj_box img").attr("src",$("#gamesteps li").eq(data.curstep).find("img").attr("src"))
        	$(".dj_name").text($("#gamesteps li").eq(data.curstep).find("span").text())
        	$(".gift_list").prepend("<li>"+timer()+"<span>用户名</span>获得了"+$("#gamesteps li").eq(data.curstep).find("span").text()+"</li>")
        	setTimeout(function(){
        		TGDialogS('pop1')
        		start()
        	},500)
        }
    });
    start()
    function start(){
    	$(".btn_start").one("click",function(){
	    	if(currentStep>=29){
	    		TGDialogS('pop3')
	    	}else{
	    		var num = Math.floor(Math.random()*6+1);//产生随机数1-6,这个可以由开发传入
	        	gamedfw.play(num);
	        	$(".dice_nomal").css("display","none")
	        	$(".mod-gamedfw .dicewrap").css("display","block")
	    	}
	    });
    }
    //左下角宝箱动效
    if(currentStep>=29){
		$(".btn_bx em").addClass("btn_ani")
	}
    $(".btn_bx").click(function(){
    	$(".bx_con").fadeIn(650)
    	setTimeout(function(){
    		TGDialogS('pop2')
    	},1100)
    	setTimeout(function(){
    		$(".bx_con").hide()
    	},1200)
    })
    
