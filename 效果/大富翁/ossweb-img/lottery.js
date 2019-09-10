//ʱ��
function timer(){
	function getNow(s) {
	    return s < 10 ? '0' + s: s;
	}
	var myDate = new Date();
	//��ȡ��ǰ��
	var year=myDate.getFullYear();
	//��ȡ��ǰ��
	var month=myDate.getMonth()+1;
	//��ȡ��ǰ��
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //��ȡ��ǰСʱ��(0-23)
	var m=myDate.getMinutes();     //��ȡ��ǰ������(0-59)
	var s=myDate.getSeconds();  
	var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m);
	return now;
}
setInterval(function(){
	timer()
},1000)
//�齱
var arr=[[0.3,0.24],[1.46,0.25],[2.62,0.25],[3.77,0.25],[4.92,0.25],[6.07,0.25],[6.07,1.48],[6.07,2.67],[6.08,3.86],[6.08,5.05],[6.08,6.24],[6.08,7.43],[6.08,8.62],[6.08,9.82],[6.08,11.01],[4.93,11.01],[3.78,11.01],[2.62,11.01],[1.46,11.01],[1.46,9.82],[0.3,9.82],[0.3,8.62],[0.3,7.43],[0.3,6.24],[1.46,6.24],[1.45,5.05],[1.46,3.86],[1.46,2.67],[0.3,2.67],[0.3,1.48]];
 var stepList=arr,
        currentStep=0,//��Ȧλ�ã����������Ҫ����������
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
            'curstep': 0,//Ĭ����0����1��
            'hongbaoId':'',
            'maxstep':29//��߲���
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
        //��������
        play:function(rollstep){
            console.log('������'+rollstep);
            var me = this;
            var dice = $(me.domId+" .dice");
            $(me.domId+" .dice-mask").show();
            dice.attr("class","dice");//����ϴζ�����ĵ���
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
                            //���������
		                    if(currentStep>=28){
		                    	setTimeout(function(){
		                    		$(".bx_con").fadeIn(650)
		                    		$(".btn_bx em").addClass("btn_ani")//���½Ǳ��䶯Ч
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
//      	console.log('��'+data.curstep+'����Ʒ');
        	$(".gift_li").remove()
        	$(".dj_box img").attr("src",$("#gamesteps li").eq(data.curstep).find("img").attr("src"))
        	$(".dj_name").text($("#gamesteps li").eq(data.curstep).find("span").text())
        	$(".gift_list").prepend("<li>"+timer()+"<span>�û���</span>�����"+$("#gamesteps li").eq(data.curstep).find("span").text()+"</li>")
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
	    		var num = Math.floor(Math.random()*6+1);//���������1-6,��������ɿ�������
	        	gamedfw.play(num);
	        	$(".dice_nomal").css("display","none")
	        	$(".mod-gamedfw .dicewrap").css("display","block")
	    	}
	    });
    }
    //���½Ǳ��䶯Ч
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
    
